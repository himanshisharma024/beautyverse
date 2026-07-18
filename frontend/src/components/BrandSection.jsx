import React from "react";

const brands = [
  {
    name: "Minimalist",
    color: "#f5f0eb",
    textColor: "#2d2d2d",
    image: "/images/brands/minimalist.png",
  },
  {
    name: "Mamaearth",
    color: "#e8f5e9",
    textColor: "#2e7d32",
    image: "/images/brands/mamaearth.png",
  },
  {
    name: "Dot & Key",
    color: "#e3f2fd",
    textColor: "#1565c0",
    image: "/images/brands/dot-key.png",
  },
  {
    name: "Plum",
    color: "#f3e5f5",
    textColor: "#6a1b9a",
    image: "/images/brands/plum.png",
  },
  {
    name: "The Ordinary",
    color: "#fafafa",
    textColor: "#212121",
    image: "/images/brands/the-ordinary.png",
  },
  {
    name: "Laneige",
    color: "#e8eaf6",
    textColor: "#283593",
    image: "/images/brands/laneige.png",
  },
  {
    name: "Olay",
    color: "#fff8e1",
    textColor: "#f57f17",
    image: "/images/brands/olay.png",
  },
  {
    name: "WOW",
    color: "#fce4ec",
    textColor: "#c62828",
    image: "/images/brands/wow.png",
  },
  {
    name: "Cetaphil",
    color: "#e0f7fa",
    textColor: "#00695c",
    image: "/images/brands/cetaphil.png",
  },
  {
    name: "Biotique",
    color: "#f1f8e9",
    textColor: "#558b2f",
    image: "/images/brands/biotique.png",
  },
];

const BrandSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          🏆 Shop by Brand
        </h2>

        <span className="text-nykaa text-sm font-semibold cursor-pointer hover:underline">
          View All Brands →
        </span>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.name}
            style={{ backgroundColor: brand.color }}
            className="rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-32"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
            />

            <span
              style={{ color: brand.textColor }}
              className="text-xs font-bold text-center"
            >
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;