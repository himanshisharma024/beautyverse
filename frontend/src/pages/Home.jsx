import React from "react";
import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import SkinTestBanner from "../components/SkinTestBanner";
import BrandSection from "../components/BrandSection";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Middle Section with Background Image */}
      <div
        className="bg-cover bg-center bg-no-repeat py-8"
        style={{
          backgroundImage: "url('/images/backgrounds/home-bg.jpeg')",
        }}
      >
        <CategorySection />
        <SkinTestBanner />
        <FeaturedProducts />
        <BrandSection />
      </div>
    </div>
  );
};

export default Home;