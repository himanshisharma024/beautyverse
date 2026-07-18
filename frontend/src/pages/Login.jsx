import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
 const InputField = ({ label, type, placeholder, value, onChange, error }) => (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition
          ${error ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-primary"}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot Password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Google Mock states
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleData, setGoogleData] = useState({ name: "", email: "" });
  const [googleErrors, setGoogleErrors] = useState({});

  // ----------------------------------------
  // Validation
  // ----------------------------------------
  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = "Enter valid email";
    if (!loginData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name) newErrors.name = "Name is required";
    if (!signupData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.email = "Enter valid email";
    if (!signupData.password) newErrors.password = "Password is required";
    else if (signupData.password.length < 6) newErrors.password = "Min 6 characters required";
    if (!signupData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
    else if (signupData.password !== signupData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  // ----------------------------------------
  // Login Submit — Real Backend
  // ----------------------------------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateLogin();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    setErrors({});

    try {
      const response = await API.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      const { token, user } = response.data;

      // Save to localStorage with token
      localStorage.setItem("user", JSON.stringify({ ...user, token }));

      setSuccessMsg("Login successful! 🎉");
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      const message = error.response?.data?.error || "Login failed. Please try again.";
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------
  // Signup Submit — Real Backend
  // ----------------------------------------
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateSignup();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    setErrors({});

    try {
      const response = await API.post("/auth/signup", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });

      const { token, user } = response.data;

      // Save to localStorage with token
      localStorage.setItem("user", JSON.stringify({ ...user, token }));

      setSuccessMsg("Account created successfully! 🎉");
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      const message = error.response?.data?.error || "Signup failed. Please try again.";
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------
  // Forgot Password Flow
  // ----------------------------------------
  const handleForgotEmailSubmit = () => {
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setErrors({ forgotEmail: "Enter valid email" });
      return;
    }
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setErrors({});
    setForgotStep(2);
    alert(`Demo OTP (in real app this comes via email): ${mockOtp}`);
  };

  const handleOtpSubmit = () => {
    if (otp !== generatedOtp) { setErrors({ otp: "Wrong OTP" }); return; }
    setErrors({});
    setForgotStep(3);
  };

  const handlePasswordReset = () => {
    if (!newPassword || newPassword.length < 6) { setErrors({ newPassword: "Min 6 characters" }); return; }
    if (newPassword !== confirmNewPassword) { setErrors({ confirmNewPassword: "Passwords do not match" }); return; }
    setErrors({});
    setShowForgotPassword(false);
    setForgotStep(1);
    setSuccessMsg("Password reset successful! Please login 🎉");
  };

  // ----------------------------------------
  // Google Mock Login
  // ----------------------------------------
  const handleGoogleLogin = async () => {
    const newErrors = {};
    if (!googleData.name) newErrors.name = "Name is required";
    if (!googleData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(googleData.email)) newErrors.email = "Enter valid email";
    if (Object.keys(newErrors).length > 0) { setGoogleErrors(newErrors); return; }

    setLoading(true);

    try {
      // Try signup first — if already exists, login
      let response;
      try {
        response = await API.post("/auth/signup", {
          name: googleData.name,
          email: googleData.email,
          password: `google_${googleData.email}_secure`,
        });
      } catch {
        response = await API.post("/auth/login", {
          email: googleData.email,
          password: `google_${googleData.email}_secure`,
        });
      }

      const { token, user } = response.data;
      localStorage.setItem("user", JSON.stringify({
        ...user,
        token,
        avatar: `https://ui-avatars.com/api/?name=${googleData.name}&background=B76E79&color=fff`,
        loginType: "google"
      }));

      setShowGoogleModal(false);
      setSuccessMsg(`Welcome, ${googleData.name}! 🎉`);
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      setGoogleErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------
  // Reusable Input Field
  // ----------------------------------------
 

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="brand-font text-2xl font-bold text-primary">BeautyVerse</span>
        </div>
        <p className="text-center text-gray-500 text-sm mb-6">Your AI-powered beauty destination ✨</p>

        {/* Success Message */}
        {successMsg && (
          <div className="bg-green-50 text-green-600 text-sm text-center py-2 px-4 rounded-lg mb-4">
            {successMsg}
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 text-red-600 text-sm text-center py-2 px-4 rounded-lg mb-4">
            {errors.general}
          </div>
        )}

        {/* Forgot Password Flow */}
        {showForgotPassword ? (
          <div>
            <button
              onClick={() => { setShowForgotPassword(false); setForgotStep(1); setErrors({}); }}
              className="text-xs text-gray-400 hover:text-primary mb-4 flex items-center gap-1"
            >
              ← Back to Login
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Reset Password</h2>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-6">
              {["Email", "OTP", "New Password"].map((step, i) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center gap-1 text-xs font-medium ${forgotStep >= i + 1 ? "text-primary" : "text-gray-300"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs
                      ${forgotStep > i + 1 ? "bg-primary text-white" : forgotStep === i + 1 ? "bg-pink-100 text-primary border border-primary" : "bg-gray-100 text-gray-300"}`}>
                      {forgotStep > i + 1 ? "✓" : i + 1}
                    </span>
                    {step}
                  </div>
                  {i < 2 && <div className={`flex-1 h-0.5 ${forgotStep > i + 1 ? "bg-primary" : "bg-gray-200"}`} />}
                </React.Fragment>
              ))}
            </div>

            {forgotStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Enter your registered email</p>
                <InputField label="Email" type="email" placeholder="your@email.com"
                  value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} error={errors.forgotEmail} />
                <button onClick={handleForgotEmailSubmit}
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primaryDark transition">
                  Send OTP →
                </button>
              </div>
            )}

            {forgotStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Enter OTP sent to <strong>{forgotEmail}</strong></p>
                <InputField label="OTP" type="text" placeholder="6-digit OTP"
                  value={otp} onChange={(e) => setOtp(e.target.value)} error={errors.otp} />
                <button onClick={handleOtpSubmit}
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primaryDark transition">
                  Verify OTP →
                </button>
                <button onClick={handleForgotEmailSubmit}
                  className="w-full text-xs text-primary hover:underline text-center">
                  Resend OTP
                </button>
              </div>
            )}

            {forgotStep === 3 && (
              <div className="space-y-4">
                <InputField label="New Password" type="password" placeholder="••••••••"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} error={errors.newPassword} />
                <InputField label="Confirm Password" type="password" placeholder="••••••••"
                  value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} error={errors.confirmNewPassword} />
                <button onClick={handlePasswordReset}
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primaryDark transition">
                  Reset Password ✓
                </button>
              </div>
            )}
          </div>

        ) : (
          <>
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-full p-1 mb-6">
              {["login", "signup"].map((tab) => (
                <button key={tab}
                  onClick={() => { setActiveTab(tab); setErrors({}); setSuccessMsg(""); }}
                  className={`flex-1 py-2 rounded-full text-sm font-semibold transition capitalize
                    ${activeTab === tab ? "bg-primary text-white shadow" : "text-gray-500 hover:text-primary"}`}>
                  {tab === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <InputField label="Email" type="email" placeholder="your@email.com"
                  value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} error={errors.email} />
                <InputField label="Password" type="password" placeholder="••••••••"
                  value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} error={errors.password} />

                <div className="text-right">
                  <button type="button" onClick={() => { setShowForgotPassword(true); setErrors({}); }}
                    className="text-xs text-primary hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" disabled={loading}
                  className={`w-full py-3 rounded-full font-semibold transition ${loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white hover:bg-primaryDark"}`}>
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="flex items-center gap-3">
                  <hr className="flex-1 border-gray-200" />
                  <span className="text-xs text-gray-400">OR</span>
                  <hr className="flex-1 border-gray-200" />
                </div>

                <button type="button" onClick={() => { setShowGoogleModal(true); setGoogleErrors({}); }}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <InputField label="Full Name" type="text" placeholder="Your name"
                  value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} error={errors.name} />
                <InputField label="Email" type="email" placeholder="your@email.com"
                  value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} error={errors.email} />
                <InputField label="Password" type="password" placeholder="••••••••"
                  value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} error={errors.password} />
                <InputField label="Confirm Password" type="password" placeholder="••••••••"
                  value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} error={errors.confirmPassword} />

                <button type="submit" disabled={loading}
                  className={`w-full py-3 rounded-full font-semibold transition ${loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white hover:bg-primaryDark"}`}>
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <div className="flex items-center gap-3">
                  <hr className="flex-1 border-gray-200" />
                  <span className="text-xs text-gray-400">OR</span>
                  <hr className="flex-1 border-gray-200" />
                </div>

                <button type="button" onClick={() => { setShowGoogleModal(true); setGoogleErrors({}); }}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}
          </>
        )}
      </div>

      {/* Google Mock Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex flex-col items-center mb-6">
              <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Sign in with Google</h2>
              <p className="text-xs text-gray-400 mt-1">to continue to BeautyVerse</p>
            </div>

            {googleErrors.general && (
              <div className="bg-red-50 text-red-600 text-xs text-center py-2 px-3 rounded-lg mb-3">
                {googleErrors.general}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <input type="text" placeholder="Your full name"
                  value={googleData.name}
                  onChange={(e) => setGoogleData({ ...googleData, name: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition
                    ${googleErrors.name ? "border-red-400" : "border-gray-300 focus:border-blue-400"}`}
                />
                {googleErrors.name && <p className="text-red-500 text-xs mt-1">{googleErrors.name}</p>}
              </div>
              <div>
                <input type="email" placeholder="Your Gmail address"
                  value={googleData.email}
                  onChange={(e) => setGoogleData({ ...googleData, email: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition
                    ${googleErrors.email ? "border-red-400" : "border-gray-300 focus:border-blue-400"}`}
                />
                {googleErrors.email && <p className="text-red-500 text-xs mt-1">{googleErrors.email}</p>}
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowGoogleModal(false)}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-full text-sm hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={handleGoogleLogin} disabled={loading}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition
                  ${loading ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;