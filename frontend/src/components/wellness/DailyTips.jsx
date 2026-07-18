import React from "react";

const tips = [
  {
    icon: "💧",
    title: "Stay Hydrated",
    description:
      "Drink at least 2–3 liters of water daily to keep your skin healthy and glowing.",
  },
  {
    icon: "☀️",
    title: "Never Skip Sunscreen",
    description:
      "Apply SPF 30+ every morning to protect your skin from harmful UV rays.",
  },
  {
    icon: "🍊",
    title: "Eat Vitamin C",
    description:
      "Include oranges, kiwi, and berries in your diet to boost collagen production.",
  },
  {
    icon: "😴",
    title: "Get Enough Sleep",
    description:
      "Aim for 7–8 hours of quality sleep every night for naturally radiant skin.",
  },
  {
    icon: "🧴",
    title: "Cleanse Twice Daily",
    description:
      "Wash your face every morning and night to remove dirt, oil, and makeup.",
  },
  {
    icon: "🥗",
    title: "Eat Healthy Fats",
    description:
      "Add nuts, seeds, avocado, and olive oil to nourish your skin from within.",
  },
];

const DailyTips = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      {/* Section Heading */}
      <div className="text-center mb-12">
        <span className="text-pink-600 font-semibold uppercase tracking-wider">
          Wellness Tips
        </span>

        <h2 className="text-4xl font-bold text-gray-800 mt-2">
          Daily Beauty & Wellness Tips ✨
        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Small daily habits make a big difference. Follow these expert
          wellness tips to achieve naturally healthy skin and hair.
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-md p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-pink-100"
          >
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl mb-6">
              {tip.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {tip.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {tip.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default DailyTips;