import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Full products database
const allProducts = [
  {
    id: 1,
    name: "Vitamin C Brightening Serum",
    brand: "Minimalist",
    price: 599,
    originalPrice: 799,
    discount: 25,
    image: "/images/products/vitamin-c-serum.png",
    category: "Skincare",
    skinType: ["dry", "combination"],
    concern: "Pigmentation",
    rating: 4.8,
    reviews: 1456,
    description: "A potent 16% Vitamin C serum that brightens skin tone, reduces dark spots and gives a natural glow. Lightweight formula absorbs quickly without leaving any greasy residue.",
    ingredients: ["Ethyl Ascorbic Acid 16%", "Hyaluronic Acid", "Niacinamide", "Aloe Vera"],
    howToUse: "Apply 2-3 drops on clean face. Use in AM routine before moisturizer and SPF.",
    size: "30ml",
  },
  {
    id: 2,
    name: "Hydrating Sunscreen SPF 50",
    brand: "Dot & Key",
    price: 449,
    originalPrice: 549,
    discount: 18,
    image: "/images/products/sunscreen-spf50.png",
    category: "Skincare",
    skinType: ["oily", "combination"],
    concern: "Sun Protection",
    rating: 4.5,
    reviews: 890,
    description: "Lightweight, non-greasy sunscreen with SPF 50 PA+++ that protects against UVA and UVB rays. Perfect for daily use under makeup.",
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Hyaluronic Acid", "Niacinamide"],
    howToUse: "Apply generously 15 minutes before sun exposure. Reapply every 2-3 hours.",
    size: "50g",
  },
  {
    id: 3,
    name: "Niacinamide 10% Face Serum",
    brand: "The Ordinary",
    price: 699,
    originalPrice: 899,
    discount: 22,
    image: "/images/products/niacinamide-serum.png",
    category: "Skincare",
    skinType: ["oily", "sensitive"],
    concern: "Acne",
    rating: 4.6,
    reviews: 1203,
    description: "High-strength 10% Niacinamide serum that minimizes pores, controls oil, reduces blemishes and evens out skin tone.",
    ingredients: ["Niacinamide 10%", "Zinc PCA 1%", "Aqua", "Glycerin"],
    howToUse: "Apply a few drops to face morning and evening before moisturizer.",
    size: "30ml",
  },
  {
    id: 4,
    name: "Rose Water Toner",
    brand: "Plum",
    price: 299,
    originalPrice: 350,
    discount: 15,
    image: "/images/products/rose-water-toner.png",
    category: "Skincare",
    skinType: ["sensitive", "dry"],
    concern: "Hydration",
    rating: 4.4,
    reviews: 567,
    description: "100% natural rose water toner that hydrates, soothes and refreshes skin.",
    ingredients: ["Rosa Damascena Water", "Glycerin", "Allantoin", "Panthenol"],
    howToUse: "Apply on clean face with cotton pad or spray directly.",
    size: "200ml",
  },
  {
    id: 5,
    name: "Retinol Night Cream",
    brand: "Olay",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    image: "/images/products/retinol-night-cream.png",
    category: "Skincare",
    skinType: ["dry", "combination"],
    concern: "Aging",
    rating: 4.6,
    reviews: 445,
    description: "Advanced anti-aging night cream with Retinol.",
    ingredients: ["Retinol", "Niacinamide", "Peptides", "Shea Butter"],
    howToUse: "Apply pea-sized amount on clean face every night.",
    size: "50ml",
  },
  {
    id: 6,
    name: "Lip Butter Balm",
    brand: "Laneige",
    price: 1850,
    originalPrice: 2100,
    discount: 12,
    image: "/images/products/lip-butter-balm.png",
    category: "Makeup",
    skinType: ["all"],
    concern: "Hydration",
    rating: 4.8,
    reviews: 678,
    description: "Overnight lip sleeping mask for soft, hydrated lips.",
    ingredients: ["Shea Butter", "Vitamin C", "Hyaluronic Acid"],
    howToUse: "Apply before bedtime.",
    size: "20g",
  },
  {
    id: 7,
    name: "Aloe Vera Gel",
    brand: "Mamaearth",
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: "/images/products/aloe-vera-gel.png",
    category: "Skincare",
    skinType: ["all"],
    concern: "Soothing",
    rating: 4.4,
    reviews: 789,
    description: "Pure Aloe Vera Gel that hydrates and calms irritated skin.",
    ingredients: ["Aloe Vera", "Vitamin E", "Tea Tree Oil"],
    howToUse: "Apply on face or body as needed.",
    size: "150ml",
  },
  {
    id: 8,
    name: "Sheet Mask Combo",
    brand: "WOW",
    price: 399,
    originalPrice: 499,
    discount: 20,
    image: "/images/products/sheet-mask-combo.png",
    category: "Skincare",
    skinType: ["all"],
    concern: "Glow",
    rating: 4.5,
    reviews: 345,
    description: "Pack of 5 premium sheet masks for glowing skin.",
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Charcoal"],
    howToUse: "Apply for 15-20 minutes.",
    size: "5 Masks",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);

  // Find product by id
  const product = allProducts.find((p) => p.id === parseInt(id));

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">😕</span>
        <h2 className="text-xl font-bold text-gray-800">Product not found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-nykaa text-white px-6 py-2.5 rounded-full font-semibold"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  // Related products — same category, different id
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-nykaa transition"
          >
            Home
          </span>
          <span>›</span>
          <span
            className="cursor-pointer hover:text-nykaa transition"
          >
            {product.category}
          </span>
          <span>›</span>
          <span className="text-gray-600 line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Left — Product Image */}
            <div className="md:w-2/5">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl h-72 md:h-96 flex items-center justify-center relative">
               <img
  src={product.image}
  alt={product.name}
  className="w-full h-full object-contain"
/>

                {/* Discount badge */}
                <span className="absolute top-4 left-4 bg-nykaa text-white text-sm font-bold px-3 py-1 rounded-full">
                  {discount}% OFF
                </span>

                {/* Wishlist */}
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-xl hover:scale-110 transition"
                >
                  {wishlist ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Thumbnail row (decorative) */}
              <div className="flex gap-2 mt-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-pink-50 rounded-xl flex items-center justify-center text-2xl border-2 border-transparent hover:border-nykaa cursor-pointer transition"
                  >
                   <img
        src={product.image}
        alt={product.name}
        className="w-12 h-12 object-contain"
      />
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Product Info */}
            <div className="md:w-3/5 flex flex-col gap-4">

              {/* Brand + Name */}
              <div>
                <p className="text-sm text-nykaa font-semibold uppercase tracking-wide">
                  {product.brand}
                </p>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-green-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-full">
                  <span>★</span>
                  <span>{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.reviews.toLocaleString()} reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-green-600 font-semibold text-sm">
                  Save ₹{product.originalPrice - product.price}
                </span>
              </div>

              {/* Size + Skin Type */}
              <div className="flex gap-3 flex-wrap">
                <div className="bg-gray-100 rounded-full px-4 py-1.5 text-xs font-medium text-gray-600">
                  📦 {product.size}
                </div>
                <div className="bg-pink-50 rounded-full px-4 py-1.5 text-xs font-medium text-nykaa">
                  🎯 {product.concern}
                </div>
                {product.skinType.map((type) => (
                  <div
                    key={type}
                    className="bg-purple-50 rounded-full px-4 py-1.5 text-xs font-medium text-purple-600 capitalize"
                  >
                    {type} skin
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500 hover:text-nykaa font-bold text-lg transition"
                  >
                    −
                  </button>
                  <span className="font-semibold text-gray-800 w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-500 hover:text-nykaa font-bold text-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 rounded-full font-bold transition ${
                    addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-nykaa text-white hover:bg-nykaaDark"
                  }`}
                >
                  {addedToCart ? "✅ Added to Bag!" : "Add to Bag 🛍️"}
                </button>
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className="px-5 py-3 rounded-full border border-gray-200 hover:border-nykaa transition text-xl"
                >
                  {wishlist ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>🚚</span>
                  <span>Free delivery on orders above ₹499</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>↩️</span>
                  <span>Easy 7-day returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>✅</span>
                  <span>100% authentic products</span>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs — Description / Ingredients / How to Use */}
          <div className="mt-8">
            <div className="flex gap-1 border-b border-gray-100 mb-4">
              {["description", "ingredients", "howToUse"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-sm font-semibold capitalize transition border-b-2 -mb-px
                    ${activeTab === tab
                      ? "border-nykaa text-nykaa"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab === "howToUse" ? "How to Use" : tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="text-sm text-gray-600 leading-relaxed">
              {activeTab === "description" && <p>{product.description}</p>}

              {activeTab === "ingredients" && (
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              )}

              {activeTab === "howToUse" && (
                <div className="flex gap-3">
                  <span className="text-2xl">💆</span>
                  <p>{product.howToUse}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              You Might Also Like 💕
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100"
                >
                  <div className="bg-pink-50 rounded-t-2xl h-32 flex items-center justify-center text-5xl">
<img
  src={p.image}
  alt={p.name}
  className="w-full h-full object-contain"
/>                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-400">{p.brand}</p>
                    <p className="text-sm font-medium text-gray-800 line-clamp-1 mt-0.5">
                      {p.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-gray-900 text-sm">
                        ₹{p.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{p.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;