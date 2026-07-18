const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    loginType: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
    avatar: {
      type: String,
      default: "",
    },
    skinProfile: {
      skinType: String,
      concern: String,
      budget: String,
      toneCategory: String,
      undertone: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);