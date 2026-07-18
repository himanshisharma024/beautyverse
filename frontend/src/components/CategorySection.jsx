import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Skincare",
    image: "/images/categories/skincare.png",
  },
  {
    name: "Makeup",
    image: "/images/categories/makeup.png",
  },
  {
    name: "Haircare",
    image: "/images/categories/haircare.png",
  },
  {
    name: "Fragrance",
    image: "/images/categories/fragrance.png",
  },
  {
    name: "Wellness",
    image: "/images/categories/wellness.png",
  },
  {
    name: "Bath & Body",
    image: "/images/categories/bath-body.png",
  },

];

const CategorySection = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {categories.map((cat) => (
         <div
  key={cat.name}
  onClick={() => {
    if (cat.name === "Wellness") {
      navigate("/wellness");
    }
  }}
className={`flex flex-col items-center cursor-pointer group transition-transform duration-300 ${
  cat.name === "Wellness"
    ? "hover:scale-105"
    : ""
}`}>
            <div className="w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center shadow-md group-hover:bg-pink-100 transition-all duration-300">
  <img
    src={cat.image}
    alt={cat.name}
    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
  />
</div>

            <span className="mt-3 text-sm font-semibold text-gray-700 text-center group-hover:text-pink-600 transition">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;