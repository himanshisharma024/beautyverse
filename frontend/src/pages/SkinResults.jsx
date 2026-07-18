import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../components/ProtectedAction";
// Products database
const allProducts = [
  // Dry skin
  { id: 1, name: "Gentle Hydrating Cleanser", brand: "Cetaphil", price: 399, originalPrice: 499, skinType: "dry", concern: ["dullness", "aging"], budget: ["low", "medium"], emoji: "🧴", rating: 4.5, reviews: 234 },
  { id: 2, name: "Hyaluronic Acid Serum", brand: "Minimalist", price: 599, originalPrice: 799, skinType: "dry", concern: ["aging", "dullness"], budget: ["low", "medium"], emoji: "💧", rating: 4.7, reviews: 892 },
  { id: 3, name: "Luxury Moisture Cream", brand: "Olay", price: 1299, originalPrice: 1599, skinType: "dry", concern: ["aging"], budget: ["high", "luxury"], emoji: "✨", rating: 4.6, reviews: 445 },
  { id: 4, name: "Overnight Repair Mask", brand: "Laneige", price: 1850, originalPrice: 2200, skinType: "dry", concern: ["aging", "dullness"], budget: ["high", "luxury"], emoji: "🌙", rating: 4.8, reviews: 567 },

  // Oily skin
  { id: 5, name: "Oil Control Face Wash", brand: "Plum", price: 299, originalPrice: 349, skinType: "oily", concern: ["acne"], budget: ["low", "medium"], emoji: "🫧", rating: 4.4, reviews: 678 },
  { id: 6, name: "Niacinamide 10% Serum", brand: "The Ordinary", price: 699, originalPrice: 899, skinType: "oily", concern: ["acne", "pigmentation"], budget: ["low", "medium"], emoji: "⚗️", rating: 4.6, reviews: 1203 },
  { id: 7, name: "Mattifying Sunscreen SPF50", brand: "Dot & Key", price: 449, originalPrice: 549, skinType: "oily", concern: ["acne", "pigmentation"], budget: ["low", "medium"], emoji: "☀️", rating: 4.5, reviews: 890 },
  { id: 8, name: "BHA Exfoliant", brand: "Minimalist", price: 549, originalPrice: 699, skinType: "oily", concern: ["acne"], budget: ["low", "medium"], emoji: "🔬", rating: 4.7, reviews: 543 },

  // Combination
  { id: 9, name: "Balancing Gel Cleanser", brand: "Mamaearth", price: 249, originalPrice: 299, skinType: "combination", concern: ["acne", "dullness"], budget: ["low"], emoji: "🌿", rating: 4.3, reviews: 456 },
  { id: 10, name: "Vitamin C Brightening Serum", brand: "Minimalist", price: 599, originalPrice: 749, skinType: "combination", concern: ["pigmentation", "dullness"], budget: ["low", "medium"], emoji: "🍊", rating: 4.8, reviews: 1456 },
  { id: 11, name: "Lightweight Moisturizer", brand: "Dot & Key", price: 649, originalPrice: 799, skinType: "combination", concern: ["dullness"], budget: ["medium"], emoji: "💦", rating: 4.5, reviews: 321 },

  // Sensitive
  { id: 12, name: "Sensitive Skin Cream", brand: "Cetaphil", price: 499, originalPrice: 599, skinType: "sensitive", concern: ["acne", "dullness"], budget: ["low", "medium"], emoji: "🌸", rating: 4.7, reviews: 789 },
  { id: 13, name: "Calming Rose Serum", brand: "Plum", price: 799, originalPrice: 999, skinType: "sensitive", concern: ["pigmentation", "dullness"], budget: ["medium"], emoji: "🌹", rating: 4.6, reviews: 234 },
  { id: 14, name: "Aloe Vera Soothing Gel", brand: "WOW", price: 199, originalPrice: 249, skinType: "sensitive", concern: ["acne"], budget: ["low"], emoji: "🌱", rating: 4.4, reviews: 567 },
  { id: 15, name: "Luxury Calming Moisturizer", brand: "Laneige", price: 2100, originalPrice: 2500, skinType: "sensitive", concern: ["aging", "dullness"], budget: ["luxury"], emoji: "👑", rating: 4.9, reviews: 189 },
];

// Get recommendations based on answers
const getRecommendations = (answers, skinTone) => {
  const skinType = answers[1] || "combination";
  const concern = answers[2] || "dullness";
  const budget = answers[3] || "medium";

  let filtered = allProducts.filter(
    (p) =>
      p.skinType === skinType &&
      p.concern.includes(concern) &&
      p.budget.includes(budget)
  );

  // If no exact match — relax filters
  if (filtered.length === 0) {
    filtered = allProducts.filter((p) => p.skinType === skinType);
  }

  // If still nothing — return top rated
  if (filtered.length === 0) {
    filtered = allProducts.sort((a, b) => b.rating - a.rating).slice(0, 4);
  }

  return filtered.slice(0, 6);
};

const SkinResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || {};
  const skinTone = location.state?.skinTone || null;
  const [wishlist, setWishlist] = useState([]);

  const recommendations = getRecommendations(answers, skinTone);

  const skinTypeLabels = {
    dry: "Dry Skin 🏜️",
    oily: "Oily Skin 💦",
    combination: "Combination Skin ☯️",
    sensitive: "Sensitive Skin 🌸",
  };

  const concernLabels = {
    acne: "Acne & Breakouts 😤",
    pigmentation: "Pigmentation 🎭",
    aging: "Anti-Aging ⏳",
    dullness: "Glow & Brightness 😴",
  };

  const budgetLabels = {
    low: "Budget Friendly 🪙",
    medium: "Mid Range 💳",
    high: "Premium 💎",
    luxury: "Luxury 👑",
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const discount = (original, price) =>
    Math.round(((original - price) / original) * 100);

  return (
    <div className="min-h-screen bg-pink-50 pb-16">

      {/* Hero Result Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-10 text-center">
        <div className="text-5xl mb-3">✨</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Your Personalized Skincare Routine
        </h1>
        <p className="text-white/80 text-sm">
          Based on your skin scan and quiz results
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">

        {/* Skin Profile Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 -mt-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
            Your Skin Profile 🔍
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {/* Skin Type */}
            <div className="bg-pink-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Skin Type</p>
              <p className="font-semibold text-gray-800 text-sm">
                {skinTypeLabels[answers[1]] || "Normal"}
              </p>
            </div>

            {/* Concern */}
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Main Concern</p>
              <p className="font-semibold text-gray-800 text-sm">
                {concernLabels[answers[2]] || "General Care"}
              </p>
            </div>

            {/* Budget */}
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Budget</p>
              <p className="font-semibold text-gray-800 text-sm">
                {budgetLabels[answers[3]] || "Mid Range"}
              </p>
            </div>

            {/* Skin Tone (from scan) */}
            <div className="bg-rose-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Skin Tone</p>
              {skinTone ? (
                <div className="flex items-center justify-center gap-1">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: skinTone.rgb }}
                  />
                  <p className="font-semibold text-gray-800 text-sm">
                    {skinTone.toneCategory}
                  </p>
                </div>
              ) : (
                <p className="font-semibold text-gray-800 text-sm">Not scanned</p>
              )}
            </div>

          </div>
        </div>

        {/* Recommended Products */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          🎯 Recommended For You ({recommendations.length} products)
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {recommendations.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative bg-gray-50 rounded-t-2xl h-36 flex items-center justify-center">
                <span className="text-5xl">{product.emoji}</span>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 text-lg"
                >
                  {wishlist.includes(product.id) ? "❤️" : "🤍"}
                </button>

                {/* Discount badge */}
                <span className="absolute top-2 left-2 bg-nykaa text-white text-xs px-2 py-0.5 rounded-full">
                  {discount(product.originalPrice, product.price)}% OFF
                </span>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <p className="text-xs text-gray-400 uppercase">{product.brand}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5 line-clamp-2">
                  {product.name}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                </div>

                <button
  onClick={() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    // TODO: Add your cart logic here
    alert(`${product.name} added to your bag!`);
  }}
  className="w-full mt-2 border border-nykaa text-nykaa text-xs py-2 rounded-full font-semibold hover:bg-nykaa hover:text-white transition"
>
  Add to Bag
</button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/skin-test")}
            className="flex-1 border border-nykaa text-nykaa py-3 rounded-full font-semibold hover:bg-pink-50 transition text-center"
          >
            🔄 Retake Skin Test
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-nykaa text-white py-3 rounded-full font-semibold hover:bg-nykaaDark transition text-center"
          >
            🛍️ Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default SkinResults;