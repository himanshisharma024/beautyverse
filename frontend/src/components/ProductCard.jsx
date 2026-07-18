import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { isLoggedIn } from "./ProtectedAction";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    setWishlist(!wishlist);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl bg-gray-50 h-52 flex items-center justify-center">
        <div className="text-6xl">{product.emoji || "🧴"}</div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 text-xl"
        >
          {wishlist ? "❤️" : "🤍"}
        </button>

        {/* Discount badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <p className="text-xs text-gray-400 uppercase">{product.brand}</p>
        <p className="text-sm font-medium text-gray-800 mt-1 line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400 text-xs">★★★★☆</span>
          <span className="text-xs text-gray-400">(128)</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Bag button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 border border-primary text-primary text-sm py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;