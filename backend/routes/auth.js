const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ----------------------------------------
// @route  POST /api/auth/signup
// @desc   Register a new user
// @access Public
// ----------------------------------------
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      loginType: "email",
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Account created successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        loginType: user.loginType,
        avatar: `https://ui-avatars.com/api/?name=${user.name}&background=B76E79&color=fff`,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error, please try again" });
  }
});

// ----------------------------------------
// @route  POST /api/auth/login
// @desc   Login user
// @access Public
// ----------------------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        loginType: user.loginType,
        avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=B76E79&color=fff`,
        skinProfile: user.skinProfile,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error, please try again" });
  }
});

// ----------------------------------------
// @route  GET /api/auth/profile
// @desc   Get logged in user profile
// @access Private
// ----------------------------------------
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      skinProfile: user.skinProfile,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ----------------------------------------
// @route  PUT /api/auth/skin-profile
// @desc   Save user skin profile after quiz
// @access Private
// ----------------------------------------
router.put("/skin-profile", protect, async (req, res) => {
  const { skinType, concern, budget, toneCategory, undertone } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        skinProfile: {
          skinType,
          concern,
          budget,
          toneCategory,
          undertone,
        },
      },
      { new: true }
    );

    res.json({
      message: "Skin profile saved!",
      skinProfile: user.skinProfile,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;