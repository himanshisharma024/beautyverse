import React, { useState, useEffect } from "react";

const slides = [
  {
    image: "/images/banners/banner1.jpeg",
    title: "Summer Glow Edit",
    subtitle: "Skincare made for you ✨",
    cta: "Shop Now",
  },
  {
    image: "/images/banners/banner2.jpeg",
    title: "New Launches 🌸",
    subtitle: "Fresh arrivals every week",
    cta: "Explore",
  },
  {
    image: "/images/banners/banner3.jpeg",
    title: "Up to 50% OFF",
    subtitle: "Limited Time Sale",
    cta: "Grab Deal",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full h-[250px] md:h-[280px] bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{
        backgroundImage: `url(${slides[current].image})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-6">

        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          {slides[current].title}
        </h1>

        <p className="mt-2 text-sm md:text-lg text-white/95 max-w-xl">
          {slides[current].subtitle}
        </p>

        <button className="mt-5 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-full font-semibold transition duration-300 shadow-lg">
          {slides[current].cta}
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-4 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "bg-white w-7 h-2.5"
                  : "bg-white/60 w-2.5 h-2.5"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;