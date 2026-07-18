import React from "react";
import ProductCard from "./ProductCard";

const sampleProducts = [
  { id: 1, name: "Vitamin C Brightening Serum", brand: "Minimalist", price: 599, originalPrice: 799, discount: 25, emoji: "✨" },
  { id: 2, name: "Hydrating Sunscreen SPF 50", brand: "Dot & Key", price: 449, originalPrice: 549, discount: 18, emoji: "☀️" },
  { id: 3, name: "Niacinamide 10% Face Serum", brand: "The Ordinary", price: 699, originalPrice: 899, discount: 22, emoji: "💧" },
  { id: 4, name: "Rose Water Toner", brand: "Plum", price: 299, originalPrice: 350, discount: 15, emoji: "🌹" },
  { id: 5, name: "Retinol Night Cream", brand: "Olay", price: 999, originalPrice: 1299, discount: 23, emoji: "🌙" },
  { id: 6, name: "Lip Butter Balm", brand: "Laneige", price: 1850, originalPrice: 2100, discount: 12, emoji: "💄" },
  { id: 7, name: "Aloe Vera Gel", brand: "Mamaearth", price: 199, originalPrice: 249, discount: 20, emoji: "🌿" },
  { id: 8, name: "Sheet Mask Combo", brand: "WOW", price: 399, originalPrice: 499, discount: 20, emoji: "🎭" },
];

const FeaturedProducts = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🔥 Trending Now</h2>
        <span className="text-nykaa text-sm font-semibold cursor-pointer hover:underline">View All →</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sampleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;