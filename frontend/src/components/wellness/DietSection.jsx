import React from "react";

const foods = [
  {
    name: "Avocado",
    image: "/images/diet/avocado.jpeg",
    benefit: "Healthy Fats",
    description:
      "Rich in Vitamin E and healthy fats that deeply nourish your skin and keep it moisturized.",
  },
  {
    name: "Orange",
    image: "/images/diet/orange.jpeg",
    benefit: "Vitamin C",
    description:
      "Boosts collagen production, brightens skin naturally and helps reduce pigmentation.",
  },
  {
    name: "Almonds",
    image: "/images/diet/almonds.jpeg",
    benefit: "Vitamin E",
    description:
      "Protects skin from damage, improves elasticity and supports healthy hair growth.",
  },
  {
    name: "Spinach",
    image: "/images/diet/spinach.jpeg",
    benefit: "Iron & Folate",
    description:
      "Improves blood circulation for naturally glowing skin and stronger hair.",
  },
  {
    name: "Berries",
    image: "/images/diet/berries.jpeg",
    benefit: "Antioxidants",
    description:
      "Fight free radicals, slow ageing and help maintain youthful skin.",
  },
  {
    name: "Carrot",
    image: "/images/diet/carrot.jpeg",
    benefit: "Vitamin A",
    description:
      "Supports skin repair, improves complexion and promotes a healthy glow.",
  },
];

const DietSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      {/* Heading */}
      <div className="text-center mb-12">
        <span className="text-pink-600 font-semibold uppercase tracking-wider">
          Beauty Nutrition
        </span>

        <h2 className="text-4xl font-bold text-gray-800 mt-2">
          Eat Your Way to Healthy Skin & Hair 🥗
        </h2>

        <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
          Beauty starts from within. Include these nutrient-rich foods in your
          daily diet to naturally improve your skin, hair, and overall wellness.
        </p>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {foods.map((food) => (
          <div
            key={food.name}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-pink-100"
          >
            <div className="bg-pink-50 flex justify-center items-center h-56">
              <img
                src={food.image}
                alt={food.name}
                className="w-36 h-36 object-contain hover:scale-110 transition duration-300"
              />
            </div>

            <div className="p-6">
              <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {food.benefit}
              </span>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {food.name}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {food.description}
              </p>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
};

export default DietSection;