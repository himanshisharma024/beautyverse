import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsCartOpen } = useCart();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary to-primaryDark text-white text-xs text-center py-1.5 tracking-wide">
        ✨ FREE delivery on orders above ₹499 | Use code: BEAUTYVERSE10
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="brand-font text-xl font-bold text-primary">BeautyVerse</span>
            <span className="text-xs text-gold tracking-widest font-medium">GLOW YOUR WAY</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 focus-within:border-primary bg-cream">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="w-full text-sm outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-sm text-gray-700">

          {/* Skin Test Button */}
          <button
            onClick={() => navigate("/skin-test")}
            className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-primary to-gold text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition shadow-sm"
          >
            ✨ Skin Test
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex items-center gap-2 cursor-pointer">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-primary" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold text-white flex items-center justify-center text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  Hi, {user.name?.split(" ")[0]}!
                </span>
              </div>

              {/* Wishlist */}
              <button className="flex flex-col items-center hover:text-primary transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
                <span className="text-xs">Wishlist</span>
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center hover:text-primary transition relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-2">
                    {totalItems}
                  </span>
                )}
                <span className="text-xs">Bag</span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-xs text-red-400 hover:text-red-600 font-medium transition border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className="flex flex-col items-center hover:text-primary transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs">Login</span>
              </button>

              {/* Wishlist */}
              <button className="flex flex-col items-center hover:text-primary transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
                <span className="text-xs">Wishlist</span>
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center hover:text-primary transition relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-2">
                    {totalItems}
                  </span>
                )}
                <span className="text-xs">Bag</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Links */}
      <div className="border-t border-gray-100 bg-cream">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 py-2 text-sm font-medium text-gray-600 overflow-x-auto">
          {["Makeup", "Skincare", "Haircare", "Fragrances", "Bath & Body", "Wellness"].map((cat) => (
            <span
              key={cat}
              onClick={() => navigate(`/products?category=${cat}`)}
              className="cursor-pointer whitespace-nowrap hover:text-primary transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;