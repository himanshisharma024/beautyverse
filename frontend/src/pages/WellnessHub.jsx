import React from "react";
import WellnessHero from "../components/wellness/WellnessHero";
import DailyTips from "../components/wellness/DailyTips";
import DietSection from "../components/wellness/DietSection";

const WellnessHub = () => {
  return (
    <div className="bg-[#fffaf8] min-h-screen">
      <WellnessHero />

      <DailyTips />

      <DietSection />
    </div>
  );
};

export default WellnessHub;