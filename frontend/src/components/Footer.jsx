import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="brand-font text-xl font-bold text-primaryLight">
              BeautyVerse
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Your AI-powered beauty destination. Discover skincare tailored just for you. ✨
          </p>
          <p className="text-xs text-gold italic">Glow Your Way</p>

          {/* Social icons */}
          <div className="flex gap-3 mt-4">
            {["📸", "🐦", "📘", "▶️"].map((icon, i) => (
              <button
                key={i}
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm hover:bg-primary transition"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            {["About Us", "Careers", "Press", "Blog", "Sustainability"].map((l) => (
              <li
                key={l}
                className="text-sm hover:text-primaryLight cursor-pointer transition"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-white font-semibold mb-4">Help</h4>
          <ul className="space-y-2">
            {["FAQ", "Shipping Policy", "Returns", "Track Order", "Contact Us"].map((l) => (
              <li
                key={l}
                className="text-sm hover:text-primaryLight cursor-pointer transition"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-4">Categories</h4>
          <ul className="space-y-2">
            {["Skincare", "Makeup", "Haircare", "Wellness"].map((l) => (
              <li
                key={l}
                className="text-sm hover:text-primaryLight cursor-pointer transition"
              >
                {l}
              </li>
            ))}
          </ul>

          {/* Skin Test CTA */}
          <button
            onClick={() => navigate("/skin-test")}
            className="mt-4 bg-gradient-to-r from-primary to-gold text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            ✨ Take Free Skin Test
          </button>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-500">
            © 2025 BeautyVerse. All rights reserved. Built with ❤️
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="hover:text-primaryLight cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-primaryLight cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-primaryLight cursor-pointer transition">Cookie Policy</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;