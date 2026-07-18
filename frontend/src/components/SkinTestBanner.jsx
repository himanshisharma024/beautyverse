import React from "react";
import { useNavigate } from "react-router-dom";

const SkinTestBanner = () => {
  const navigate = useNavigate();

  const steps = [
    { icon: "📷", text: "Face Scan" },
    { icon: "📝", text: "Quick Quiz" },
    { icon: "✨", text: "Get Products" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 rounded-3xl p-8 md:p-10 relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left Content */}
          <div className="text-white text-center md:text-left">
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
              ✨ NEW FEATURE
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Find Your Perfect<br />Skincare Routine
            </h2>
            <p className="text-white/80 text-sm max-w-sm mb-6">
              Take our 2-minute skin scan + quiz and get products
              picked just for you — no more guessing!
            </p>

            {/* Steps */}
            <div className="flex items-center gap-4 justify-center md:justify-start mb-6">
              {steps.map((step, index) => (
                <React.Fragment key={step.text}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                      {step.icon}
                    </div>
                    <span className="text-white/80 text-xs">{step.text}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="text-white/40 text-lg mb-4">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => navigate("/skin-test")}
              className="bg-white text-nykaa font-bold px-8 py-3 rounded-full hover:bg-pink-50 transition shadow-lg"
            >
              Take Free Skin Test →
            </button>
          </div>

          {/* Right — Visual */}
          <div className="flex gap-3">
            {[
              { emoji: "🧴", label: "Cleanser", bg: "bg-pink-100" },
              { emoji: "💧", label: "Serum", bg: "bg-purple-100" },
              { emoji: "☀️", label: "SPF", bg: "bg-yellow-100" },
            ].map((item) => (
              <div
                key={item.label}
                className={`${item.bg} rounded-2xl w-20 h-24 flex flex-col items-center justify-center gap-1 shadow-md`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xs font-semibold text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkinTestBanner;