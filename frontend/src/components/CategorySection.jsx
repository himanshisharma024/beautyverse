import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Skincare",
    image: "/images/categories/skincare.png",
    route: "/guide/skincare",   // ← opens guide page
  },
  {
    name: "Makeup",
    image: "/images/categories/makeup.png",
    route: "/guide/makeup",     // ← opens guide page
  },
  {
    name: "Haircare",
    image: "/images/categories/haircare.png",
    route: "/guide/haircare",   // ← opens guide page
  },
  {
    name: "Wellness",
    image: "/images/categories/wellness.png",
    route: "/guide/wellness",   // ← opens guide page (adds sparkle + View Guide label)
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Check It Before Buy It
      </h2>

      {/* Centered category items container */}
      <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(cat.route)}
            className="flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-105"
          >
            {/* Circle Image */}
            <div className="relative w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center shadow-md group-hover:bg-pink-100 transition-all duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
              />

              {/* Guide badge — for all guide pages including Wellness */}
              {cat.route.startsWith("/guide") && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold shadow-sm">
                  ✨
                </span>
              )}
            </div>

            {/* Category Name */}
            <span className="mt-3 text-sm font-semibold text-gray-700 text-center group-hover:text-pink-600 transition">
              {cat.name}
            </span>

            {/* Guide label */}
            {cat.route.startsWith("/guide") && (
              <span className="text-xs text-primary font-medium mt-0.5">
                View Guide
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;