import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "What is your skin type?",
    emoji: "🧴",
    options: [
      { label: "Dry", value: "dry", emoji: "🏜️", desc: "Feels tight, flaky" },
      { label: "Oily", value: "oily", emoji: "💦", desc: "Shiny, greasy by noon" },
      {
        label: "Combination",
        value: "combination",
        emoji: "☯️",
        desc: "Oily T-zone, dry cheeks",
      },
      {
        label: "Sensitive",
        value: "sensitive",
        emoji: "🌸",
        desc: "Easily irritated, red",
      },
    ],
  },
  {
    id: 2,
    question: "What is your main skin concern?",
    emoji: "🔍",
    options: [
      { label: "Acne", value: "acne", emoji: "😤", desc: "Breakouts, pimples" },
      {
        label: "Pigmentation",
        value: "pigmentation",
        emoji: "🎭",
        desc: "Dark spots, uneven tone",
      },
      {
        label: "Aging",
        value: "aging",
        emoji: "⏳",
        desc: "Fine lines, wrinkles",
      },
      {
        label: "Dullness",
        value: "dullness",
        emoji: "😴",
        desc: "Lack of glow, tired skin",
      },
    ],
  },
  {
    id: 3,
    question: "What's your budget range?",
    emoji: "💰",
    options: [
      { label: "Budget", value: "low", emoji: "🪙", desc: "Under ₹500" },
      {
        label: "Mid Range",
        value: "medium",
        emoji: "💳",
        desc: "₹500 - ₹1500",
      },
      {
        label: "Premium",
        value: "high",
        emoji: "💎",
        desc: "Above ₹1500",
      },
      {
        label: "No Limit",
        value: "luxury",
        emoji: "👑",
        desc: "Only the best!",
      },
    ],
  },
  {
    id: 4,
    question: "How old are you?",
    emoji: "🎂",
    options: [
      { label: "Teens", value: "teens", emoji: "🧑", desc: "13 - 19 years" },
      { label: "20s", value: "twenties", emoji: "👩", desc: "20 - 29 years" },
      {
        label: "30s",
        value: "thirties",
        emoji: "👩‍💼",
        desc: "30 - 39 years",
      },
      {
        label: "40+",
        value: "fortyplus",
        emoji: "👸",
        desc: "40 years and above",
      },
    ],
  },
  {
    id: 5,
    question: "How much time do you spend on skincare daily?",
    emoji: "⏰",
    options: [
      {
        label: "Minimal",
        value: "minimal",
        emoji: "⚡",
        desc: "Under 5 minutes",
      },
      {
        label: "Basic",
        value: "basic",
        emoji: "🌅",
        desc: "5 - 10 minutes",
      },
      {
        label: "Dedicated",
        value: "dedicated",
        emoji: "🧖",
        desc: "10 - 20 minutes",
      },
      {
        label: "Full Routine",
        value: "full",
        emoji: "💆",
        desc: "20+ minutes",
      },
    ],
  },
];

const SkinQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const skinTone = location.state?.skinTone || null;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const progress = (currentQ / questions.length) * 100;
  const question = questions[currentQ];

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;

    const newAnswers = {
      ...answers,
      [question.id]: selected,
    };

    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      navigate("/skin-results", {
        state: {
          answers: newAnswers,
          skinTone,
        },
      });
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelected(answers[questions[currentQ - 1].id] || null);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex justify-center py-10 px-4"
      style={{
        backgroundImage: "url('/images/backgrounds/home-bg.jpg')",
      }}
    >
      {/* NEW WRAPPER */}
      <div className="w-full max-w-4xl flex flex-col items-center">

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-pink-600 text-center mb-2">
          BeautyVerse Skin Quiz ✨
        </h1>

        {/* NEW TAGLINE */}
        <p className="text-pink-600 font-medium text-center mb-6">
          Personalized skincare recommendations powered by BeautyVerse
        </p>

        <p className="text-gray-700 text-lg text-center mb-8 max-w-xl">
          Answer {questions.length} quick questions to get your personalized
          skincare routine.
        </p>

        {/* Progress */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>
              Question {currentQ + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-100 w-full max-w-2xl p-8">

          <div className="text-center mb-6">
            <span className="text-6xl">{question.emoji}</span>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col gap-2 shadow-sm hover:shadow-lg cursor-pointer
                ${
                  selected === option.value
                    ? "border-pink-600 bg-pink-100 scale-105"
                    : "border-gray-200 hover:border-pink-500 hover:bg-pink-50"
                }`}
              >
                <span className="text-4xl">{option.emoji}</span>

                <span className="font-semibold text-gray-800">
                  {option.label}
                </span>

                <span className="text-gray-500 text-sm">
                  {option.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">

            {currentQ > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 border-2 border-pink-300 text-pink-600 py-3 rounded-full font-semibold hover:bg-pink-50 transition"
              >
                ← Back
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!selected}
              className={`flex-1 py-3 rounded-full font-semibold transition-all duration-300
                ${
                  selected
                    ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:scale-105 shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {currentQ === questions.length - 1
                ? "Get My Results ✨"
                : "Next →"}
            </button>

          </div>
        </div>

        {/* Skin Tone */}
        {skinTone && (
          <div className="mt-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 flex items-center gap-4 shadow-lg border border-pink-100">
            <div
              className="w-8 h-8 rounded-full border-2 border-white shadow"
              style={{
                backgroundColor: skinTone.rgb,
              }}
            />

            <span className="text-sm text-gray-600">
              Skin scan detected{" "}
              <strong>{skinTone.toneCategory}</strong> skin with{" "}
              <strong>{skinTone.undertone}</strong> undertones.
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default SkinQuiz;