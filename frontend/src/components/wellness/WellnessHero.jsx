import React from "react";
import { useNavigate } from "react-router-dom";

const WellnessHero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[85vh] w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('/images/wellness/wellness-hero.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-pink-900/50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">

        <span className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wide mb-6">
          ✨ BEAUTYVERSE WELLNESS HUB
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
          Glow From
          <span className="block bg-gradient-to-r from-pink-300 via-rose-200 to-yellow-200 bg-clip-text text-transparent">
            Within
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-gray-200 leading-8 max-w-3xl mx-auto">
          Beauty is more than skincare.
          Discover healthy habits, balanced nutrition,
          expert routines and self-care rituals designed
          to help your skin, hair and body thrive.
        </p>

        <div className="flex flex-wrap justify-center gap-5 mt-10">

          <button
            onClick={() => navigate("/skin-test")}
            className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition duration-300"
          >
            ✨ Take Skin Test
          </button>

          <button
            onClick={() =>
              document
                .getElementById("daily-tips")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold backdrop-blur-md hover:bg-white hover:text-pink-600 transition duration-300"
          >
            🌿 Explore Wellness
          </button>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-6 mt-16">

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">

            <h2 className="text-3xl font-bold text-white">
              100+
            </h2>

            <p className="text-white/80 text-sm mt-2">
              Wellness Tips
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">

            <h2 className="text-3xl font-bold text-white">
              50+
            </h2>

            <p className="text-white/80 text-sm mt-2">
              Healthy Recipes
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">

            <h2 className="text-3xl font-bold text-white">
              24/7
            </h2>

            <p className="text-white/80 text-sm mt-2">
              Self Care
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WellnessHero;