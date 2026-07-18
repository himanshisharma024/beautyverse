import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalSavings, totalItems, setIsCartOpen } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryCharge = totalPrice >= 499 ? 0 : 49;
  const finalTotal = totalPrice + deliveryCharge;

  // ----------------------------------------
  // Handle input change
  // ----------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ----------------------------------------
  // Validate form
  // ----------------------------------------
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit phone number";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter valid email";

    if (!formData.address.trim())
      newErrors.address = "Address is required";

    if (!formData.city.trim())
      newErrors.city = "City is required";

    if (!formData.state.trim())
      newErrors.state = "State is required";

    if (!formData.pincode.trim())
      newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter valid 6-digit pincode";

    return newErrors;
  };

  // ----------------------------------------
  // Place Order
  // ----------------------------------------
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      navigate("/products");
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Generate random order number
    const orderId = "BV" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderNumber(orderId);
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ----------------------------------------
  // Input Field Component
  // ----------------------------------------
  const InputField = ({ label, name, type = "text", placeholder, required }) => (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition
          ${errors[name]
            ? "border-red-400 bg-red-50"
            : "border-gray-200 focus:border-primary bg-cream"
          }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  // ----------------------------------------
  // Order Success Screen
  // ----------------------------------------
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center">

          {/* Success animation */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed! 🎉
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            Thank you for shopping with BeautyVerse!
          </p>

          {/* Order details */}
          <div className="bg-cream rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order Number</span>
              <span className="font-bold text-primary">#{orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Items</span>
              <span className="font-semibold text-gray-800">{totalItems} products</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-bold text-gray-900">₹{finalTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment</span>
              <span className="font-semibold text-gray-800">Cash on Delivery</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery To</span>
              <span className="font-semibold text-gray-800">{formData.city}, {formData.state}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Expected Delivery</span>
              <span className="font-semibold text-green-600">3-5 Business Days</span>
            </div>
          </div>

          {/* Savings badge */}
          {totalSavings > 0 && (
            <div className="bg-green-50 text-green-700 text-sm py-2 px-4 rounded-xl mb-6 font-medium">
              🎉 You saved ₹{totalSavings} on this order!
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primaryDark transition"
            >
              Continue Shopping 🛍️
            </button>
            <button
              onClick={() => navigate("/products")}
              className="w-full border border-primary text-primary py-3 rounded-full font-semibold hover:bg-pink-50 transition"
            >
              Browse More Products
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------
  // Empty Cart
  // ----------------------------------------
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center">
          <span className="text-6xl">🛍️</span>
          <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
            Your bag is empty!
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Add some products before checking out
          </p>
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primaryDark transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-16">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primaryDark text-white px-4 py-6 text-center">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-white/80 text-sm mt-1">Almost there! Complete your order</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left — Form */}
          <div className="flex-1 space-y-4">

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Delivery Address
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Full Name" name="fullName" placeholder="Your full name" required />
                  <InputField label="Phone Number" name="phone" type="tel" placeholder="10-digit phone number" required />
                </div>

                <InputField label="Email Address" name="email" type="email" placeholder="your@email.com" required />

                <InputField label="Full Address" name="address" placeholder="House no, Street, Area" required />

                <InputField label="Landmark" name="landmark" placeholder="Near hospital, school etc (optional)" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField label="City" name="city" placeholder="City" required />
                  <InputField label="State" name="state" placeholder="State" required />
                  <InputField label="Pincode" name="pincode" placeholder="6-digit pincode" required />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Payment Method
              </h2>

              {/* COD Option */}
              <div className="border-2 border-primary bg-pink-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💵</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when your order arrives</p>
                  </div>
                </div>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  Available
                </span>
              </div>

              {/* Coming Soon options */}
              <div className="mt-3 space-y-2">
                {[
                  { icon: "📱", label: "UPI Payment", sub: "GPay, PhonePe, Paytm" },
                  { icon: "💳", label: "Credit / Debit Card", sub: "Visa, Mastercard, Rupay" },
                  { icon: "🏦", label: "Net Banking", sub: "All major banks" },
                ].map((option) => (
                  <div
                    key={option.label}
                    className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 opacity-50 cursor-not-allowed"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    <span className="text-xl">{option.icon}</span>
                    <div>
                      <p className="font-medium text-gray-700 text-sm">{option.label}</p>
                      <p className="text-xs text-gray-400">{option.sub}</p>
                    </div>
                    <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Order Items ({totalItems})
              </h2>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-cream rounded-xl p-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400">{item.brand}</p>
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-900 text-sm">₹{item.price * item.quantity}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-400">₹{item.price} each</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right — Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

              {/* Price breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice + totalSavings}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>− ₹{totalSavings}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Payment Method</span>
                  <span className="font-medium">Cash on Delivery</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 mb-4">
                <div className="flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
                {totalSavings > 0 && (
                  <p className="text-green-600 text-xs mt-1">
                    You save ₹{totalSavings} on this order! 🎉
                  </p>
                )}
              </div>

              {/* Free delivery info */}
              {deliveryCharge > 0 && (
                <div className="bg-pink-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-600">
                    Add <span className="font-bold text-primary">₹{499 - totalPrice}</span> more for FREE delivery 🚚
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${Math.min((totalPrice / 499) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-primary text-white py-3.5 rounded-full font-bold hover:bg-primaryDark transition text-center"
              >
                Place Order 🎉
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                By placing order you agree to our Terms & Conditions
              </p>

              {/* Trust badges */}
              <div className="flex justify-center gap-4 mt-4">
                {[
                  { icon: "🔒", text: "Secure" },
                  { icon: "✅", text: "Authentic" },
                  { icon: "↩️", text: "Easy Returns" },
                ].map((badge) => (
                  <div key={badge.text} className="flex flex-col items-center gap-0.5">
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-xs text-gray-400">{badge.text}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;