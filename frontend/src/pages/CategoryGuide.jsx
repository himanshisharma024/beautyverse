import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ─── All Category Data ───────────────────────────────────────
const categoryData = {
  skincare: {
    name: "Skincare",
    emoji: "🧴",
    tagline: "Your skin is your largest organ. Treat it right.",
    headerImage: "/images/guides/skincare-hero.png",
    bgImage: "/images/guides/skincare-bg.jpeg",
    color: "from-rose-100 to-pink-200",
    headerColor: "from-rose-400 to-pink-500",
    intro: "Skincare is the practice of supporting skin integrity, enhancing its appearance, and relieving skin conditions. A consistent skincare routine protects your skin from environmental damage, slows ageing, and keeps your complexion healthy and glowing. It is not about vanity — it is about health.",
    whyItMatters: [
      "Your skin is exposed to pollution, UV rays, and stress every single day",
      "Without care, skin loses moisture, elasticity, and natural glow over time",
      "The right routine prevents acne, pigmentation, and premature ageing",
      "Healthy skin boosts confidence and reflects overall body health",
    ],
    routine: [
      {
        step: "01",
        title: "Cleanser",
        time: "AM + PM",
        description: "Always start with a cleanser. It removes dirt, excess oil, makeup residue, and pollutants accumulated on the skin. Use a gentle, sulfate-free cleanser that does not strip natural oils. Wet your face, apply a coin-sized amount, massage in circular motions for 60 seconds, then rinse with lukewarm water.",
        tip: "Never use hot water — it strips the skin's natural moisture barrier.",
        product: "Charcoal Face Wash / Gentle Hydrating Cleanser",
      },
      {
        step: "02",
        title: "Toner",
        time: "AM + PM",
        description: "Toner balances the skin's pH after cleansing and prepares it to absorb the next products more effectively. Apply with a cotton pad or pat directly with hands. Rose water toners also hydrate and soothe redness.",
        tip: "Avoid toners with alcohol — they dry out the skin.",
        product: "Rose Water Toner / Plum Green Tea Toner",
      },
      {
        step: "03",
        title: "Serum",
        time: "AM or PM (depends on serum)",
        description: "Serums are concentrated treatments that target specific concerns. Vitamin C serums brighten and protect in the morning. Niacinamide reduces pores and controls oil. Retinol repairs and anti-ages at night. Hyaluronic Acid deeply hydrates. Apply 2-3 drops and press gently into skin — do not rub.",
        tip: "Layer serums from thinnest to thickest consistency.",
        product: "Vitamin C Serum (AM) / Niacinamide Serum / Retinol (PM)",
      },
      {
        step: "04",
        title: "Moisturizer",
        time: "AM + PM",
        description: "Moisturizer seals in all the previous products and hydrates the skin. Even oily skin needs moisturizer — skipping it causes the skin to produce more oil. Gel moisturizers work for oily skin, cream moisturizers for dry skin.",
        tip: "Apply on slightly damp skin for better absorption.",
        product: "Lightweight Gel Cream / Luxury Moisture Cream",
      },
      {
        step: "05",
        title: "Sunscreen",
        time: "AM only",
        description: "Sunscreen is the single most important skincare product. UV rays cause 80% of visible skin ageing, dark spots, and increase skin cancer risk. Apply SPF 30 or higher every single morning — even on cloudy days and indoors. Reapply every 2-3 hours if outdoors.",
        tip: "Sunscreen is not optional. It is the most anti-ageing product in existence.",
        product: "Hydrating Sunscreen SPF 50 / Mattifying Sunscreen SPF 50",
      },
    ],
    ingredients: [
      { name: "Niacinamide", role: "Reduces pores, controls oil, fades dark spots, strengthens skin barrier", found: "The Ordinary Niacinamide Serum" },
      { name: "Vitamin C", role: "Brightens skin, fades pigmentation, boosts collagen, protects from UV", found: "Minimalist Vitamin C Serum" },
      { name: "Hyaluronic Acid", role: "Holds 1000x its weight in water, deeply hydrates, plumps skin", found: "Minimalist Hyaluronic Acid Serum" },
      { name: "Retinol", role: "Speeds cell turnover, reduces fine lines, treats acne, anti-ageing", found: "Olay Retinol Night Cream" },
      { name: "SPF / Zinc Oxide", role: "Blocks UV rays, prevents dark spots, most important anti-ageing ingredient", found: "Dot & Key Sunscreen SPF 50" },
      { name: "Aloe Vera", role: "Soothes irritation, hydrates, calms redness, heals sunburn", found: "Mamaearth Aloe Vera Gel" },
    ],
    dos: [
      "Cleanse twice daily — morning and night",
      "Always apply sunscreen in the morning",
      "Patch test new products before applying to full face",
      "Stay consistent — skincare takes 4-6 weeks to show results",
      "Drink plenty of water and eat a balanced diet",
      "Change pillowcases every 1-2 weeks",
    ],
    donts: [
      "Don't skip moisturizer even if you have oily skin",
      "Don't mix Vitamin C and Retinol in the same routine",
      "Don't pop pimples — it causes scarring and spreads bacteria",
      "Don't over-exfoliate — once or twice a week is enough",
      "Don't sleep with makeup on",
      "Don't use body lotion on your face — it clogs pores",
    ],
  },

  makeup: {
    name: "Makeup",
    emoji: "💄",
    tagline: "Makeup is art. Your face is the canvas.",
    headerImage: "/images/guides/makeup-hero.png",
    bgImage: "/images/guides/makeup-bg.jpeg",
    color: "from-red-100 to-rose-200",
    headerColor: "from-red-400 to-pink-500",
    intro: "Makeup is a form of self-expression that enhances natural features, boosts confidence, and allows creativity. Whether you prefer a natural no-makeup look or bold glam, knowing the right techniques and order of application makes all the difference between makeup that lasts all day and makeup that fades within hours.",
    whyItMatters: [
      "Properly applied makeup enhances your natural features without looking overdone",
      "The right products protect your skin while giving coverage",
      "Understanding techniques saves time and product",
      "Good makeup starts with good skincare underneath",
    ],
    routine: [
      {
        step: "01",
        title: "Skincare First",
        time: "Before everything",
        description: "Makeup always goes over skincare. Cleanse, moisturize, and apply sunscreen. Let your moisturizer absorb for 5 minutes before starting makeup. Hydrated skin makes makeup look smoother and last longer.",
        tip: "Never apply makeup on dry, unprepped skin — it will crack and look patchy.",
        product: "Gentle Cleanser + Moisturizer + SPF 50",
      },
      {
        step: "02",
        title: "Primer",
        time: "After skincare",
        description: "Primer creates a smooth base for makeup, fills in pores, controls oil, and helps makeup last significantly longer. Apply a pea-sized amount all over the face and let it set for 1-2 minutes before foundation.",
        tip: "Use a pore-filling primer for oily skin and a hydrating primer for dry skin.",
        product: "Pore-minimizing or Hydrating Primer",
      },
      {
        step: "03",
        title: "Foundation / BB Cream",
        time: "2nd step",
        description: "Foundation evens out skin tone and covers blemishes. Choose a shade that matches your neck, not just your face. Apply with a damp beauty sponge or foundation brush in stippling motions. BB creams are lighter and better for everyday wear.",
        tip: "Always blend foundation down your neck to avoid a harsh line.",
        product: "Lightweight Foundation / BB Cream",
      },
      {
        step: "04",
        title: "Concealer",
        time: "After foundation",
        description: "Concealer covers dark circles, blemishes, and redness. Apply after foundation — this way you need less product. Use a color corrector first if you have severe dark circles (peach corrector neutralizes blue-purple tones).",
        tip: "Set concealer immediately with translucent powder to prevent creasing.",
        product: "Full Coverage Concealer",
      },
      {
        step: "05",
        title: "Eye Makeup",
        time: "Before blush/highlighter",
        description: "Do eye makeup before the rest of the face. Eyeshadow fallout can ruin an already-done base. Start with eyeshadow primer, apply base shade, then crease shade, then lid shade. Blend thoroughly. Line the eyes with kajal or eyeliner, then apply mascara last.",
        tip: "Always blend eyeshadow edges — harsh lines look unnatural.",
        product: "Kajal Eyeliner / Eyeshadow Palette",
      },
      {
        step: "06",
        title: "Blush + Highlighter + Setting",
        time: "Final steps",
        description: "Blush adds a healthy flush of color to cheeks. Apply on the apples of cheeks and blend upward toward temples. Highlighter goes on cheekbones, nose tip, and cupid's bow for a glow. Finish with setting spray or translucent powder to lock everything in place.",
        tip: "Smile and apply blush on the apples of your cheeks for the most natural placement.",
        product: "Blush Palette / Highlighter / Setting Spray",
      },
    ],
    ingredients: [
      { name: "Hyaluronic Acid in Foundation", role: "Keeps skin hydrated under makeup, prevents dry patches", found: "Hydrating Foundation formulas" },
      { name: "SPF in BB Cream", role: "Provides light sun protection while giving coverage", found: "BB Cream with SPF" },
      { name: "Kaolin Clay in Primer", role: "Absorbs excess oil, keeps skin matte throughout the day", found: "Mattifying Primers" },
      { name: "Vitamin E in Lip Products", role: "Nourishes and hydrates lips, prevents dryness", found: "Laneige Lip Butter Balm" },
      { name: "Kohl in Kajal", role: "Darkens and defines eyes, long-lasting formula", found: "Mamaearth Natural Kajal" },
    ],
    dos: [
      "Always start with clean, moisturized skin",
      "Blend everything thoroughly — blending is the key to natural makeup",
      "Match foundation to your neck shade",
      "Set cream products with powder to increase longevity",
      "Clean makeup brushes weekly to prevent acne",
      "Remove makeup every night without fail",
    ],
    donts: [
      "Don't apply foundation with fingers — use a sponge or brush",
      "Don't pump mascara wand in and out — it pushes air in and dries it out",
      "Don't share makeup products — it spreads bacteria",
      "Don't use expired makeup — especially mascara (replace every 3 months)",
      "Don't apply too many layers — build coverage gradually",
      "Don't skip primer if you want makeup to last all day",
    ],
  },

  haircare: {
    name: "Haircare",
    emoji: "💆",
    tagline: "Healthy hair starts at the scalp.",
    headerImage: "/images/guides/haircare-hero.png",
    bgImage: "/images/guides/haircare-bg.jpeg",
    color: "from-amber-100 to-yellow-200",
    headerColor: "from-amber-500 to-orange-400",
    intro: "Hair care is much more than just washing your hair. It involves understanding your hair type, scalp condition, and using the right products in the right order. The scalp is essentially skin — it needs the same attention and nourishment. Healthy hair grows from a healthy, well-nourished scalp.",
    whyItMatters: [
      "Hair reflects your overall health — nutritional deficiencies show up here first",
      "The scalp produces natural oils that protect and nourish hair strands",
      "Damaged hair cannot be repaired from outside — only cut or managed",
      "The right routine reduces breakage, hair fall, and frizz significantly",
    ],
    routine: [
      {
        step: "01",
        title: "Pre-Wash Oil Treatment",
        time: "1-2 hours before washing",
        description: "Apply oil to the scalp and hair lengths before washing. This protects hair from losing too much protein during shampooing. Warm coconut oil, castor oil, or argan oil are excellent choices. Massage the scalp gently for 10-15 minutes to stimulate blood circulation and boost hair growth.",
        tip: "Warm the oil slightly before applying — it penetrates the hair shaft better.",
        product: "Argan Oil / Coconut Oil / Hair Growth Serum",
      },
      {
        step: "02",
        title: "Shampoo",
        time: "Wash day",
        description: "Shampoo cleanses the scalp, not the hair lengths. Apply shampoo only to the scalp and let the lather run down the lengths as you rinse — that is enough cleansing for the ends. Do not shampoo more than 2-3 times a week — over-washing strips natural oils.",
        tip: "Always shampoo twice — first wash removes buildup, second wash actually cleanses.",
        product: "Sulfate-free Shampoo for your hair type",
      },
      {
        step: "03",
        title: "Conditioner",
        time: "After every shampoo",
        description: "Conditioner restores moisture and smooth the hair cuticle after shampooing. Apply only to the mid-lengths and ends — never the scalp. Leave for 2-3 minutes, then rinse with cool water. Cool water seals the cuticle and adds shine.",
        tip: "Never apply conditioner to scalp roots — it weighs down hair and causes oiliness.",
        product: "Hydrating Conditioner / Argan Oil Hair Mask (weekly)",
      },
      {
        step: "04",
        title: "Hair Mask",
        time: "Once a week",
        description: "Deep conditioning masks restore protein, moisture, and strength to damaged hair. Apply after shampooing, comb through with a wide-tooth comb, cover with a shower cap, and leave for 20-30 minutes. Rinse thoroughly. Use once a week for best results.",
        tip: "Use heat (blow dryer on low over shower cap) to help mask penetrate deeper.",
        product: "WOW Argan Oil Hair Mask / Deep Conditioning Mask",
      },
      {
        step: "05",
        title: "Leave-in Treatment / Serum",
        time: "After washing, on damp hair",
        description: "Apply leave-in conditioner or hair serum to damp hair before styling. It detangles, reduces frizz, adds shine, and protects from heat styling. Hair growth serums applied to the scalp stimulate follicles and reduce hair fall.",
        tip: "Apply serums from mid-length to ends — avoid scalp unless it is a growth serum.",
        product: "Minimalist Hair Growth Serum / Leave-in Conditioner",
      },
    ],
    ingredients: [
      { name: "Argan Oil", role: "Deeply nourishes, adds shine, reduces frizz, repairs damage", found: "WOW Argan Oil Hair Mask" },
      { name: "Biotin", role: "Strengthens hair shaft, reduces breakage, supports hair growth", found: "Hair Growth Supplements / Serums" },
      { name: "Keratin", role: "Main protein in hair — smooths frizz, strengthens strands", found: "Keratin Treatment Shampoos" },
      { name: "Caffeine", role: "Stimulates scalp blood flow, reduces hair loss, promotes growth", found: "Minimalist Hair Growth Serum" },
      { name: "Castor Oil", role: "Thick oil that conditions scalp, reduces inflammation, promotes growth", found: "Pre-wash oil treatments" },
      { name: "Aloe Vera", role: "Soothes scalp, reduces dandruff, adds moisture without heaviness", found: "Mamaearth Aloe Vera Gel" },
    ],
    dos: [
      "Oil your scalp at least once a week",
      "Use a wide-tooth comb on wet hair — never a brush",
      "Always apply conditioner from mid-lengths to ends",
      "Rinse with cool water to seal the cuticle and add shine",
      "Sleep on a silk or satin pillowcase to reduce friction and breakage",
      "Trim hair every 6-8 weeks to remove split ends",
    ],
    donts: [
      "Don't shampoo daily — it strips natural scalp oils",
      "Don't brush wet hair — it causes maximum breakage",
      "Don't apply conditioner to the scalp",
      "Don't tie hair too tightly — it causes traction alopecia over time",
      "Don't use heat tools daily without heat protectant spray",
      "Don't rub hair dry with a towel — squeeze gently or use a microfiber towel",
    ],
  },

  wellness: {
    name: "Wellness",
    emoji: "🌿",
    tagline: "True beauty comes from within.",
    headerImage: "/images/guides/wellness-hero.jpeg",
    bgImage: "/images/guides/wellness-bg.jpeg",
    color: "from-green-100 to-emerald-200",
    headerColor: "from-green-500 to-emerald-600",
    intro: "Wellness in the context of beauty is the understanding that what you put into your body is just as important as what you put on it. Skin health, hair health, nail health, and overall radiance are direct reflections of your internal health — your nutrition, hydration, sleep, and stress levels. No skincare product can replace a healthy lifestyle.",
    whyItMatters: [
      "Collagen production — essential for skin elasticity — depends on nutrition",
      "Dehydration shows up on skin as dryness, dullness, and fine lines",
      "Poor sleep increases cortisol, which triggers acne and inflammation",
      "Chronic stress accelerates skin ageing and worsens conditions like eczema",
    ],
    routine: [
      {
        step: "01",
        title: "Hydration",
        time: "Throughout the day",
        description: "Drink a minimum of 8 glasses (2 litres) of water daily. Your skin is 64% water — dehydration makes it look dull, dry, and tired. Start your morning with a glass of warm water with lemon. Herbal teas, coconut water, and fresh fruit juices also count toward hydration.",
        tip: "If your urine is dark yellow, you are not drinking enough water.",
        product: "Hydrating Toners and Serums supplement external hydration",
      },
      {
        step: "02",
        title: "Nutrition",
        time: "Every meal",
        description: "Eat a diet rich in antioxidants, healthy fats, and vitamins. Vitamin C (citrus, bell peppers) boosts collagen. Vitamin E (almonds, sunflower seeds) protects from oxidative stress. Omega-3 fatty acids (walnuts, fish) reduce inflammation and keep skin supple. Zinc (pumpkin seeds) fights acne-causing bacteria.",
        tip: "Reduce sugar and processed food — they trigger inflammation and acne.",
        product: "Vitamin C, Vitamin E, Omega-3 supplements if diet is lacking",
      },
      {
        step: "03",
        title: "Sleep",
        time: "7-9 hours nightly",
        description: "Sleep is when your body repairs itself — skin cells regenerate, collagen is produced, and inflammation reduces. Poor sleep increases the stress hormone cortisol, which breaks down collagen and triggers breakouts. Aim for 7-9 hours on a consistent schedule. Sleep on your back to avoid pillow-induced wrinkles.",
        tip: "Use a night cream or sleeping mask before bed — skin absorbs products best while you sleep.",
        product: "Laneige Overnight Sleeping Mask / Retinol Night Cream",
      },
      {
        step: "04",
        title: "Exercise",
        time: "30 minutes daily",
        description: "Exercise increases blood circulation, delivering oxygen and nutrients to skin cells and carrying away waste products. It also reduces stress hormones. Even a 30-minute walk significantly improves skin glow. Sweating cleanses pores from the inside. Always cleanse your face after exercising.",
        tip: "Cleanse face within 30 minutes after exercising to prevent sweat-induced breakouts.",
        product: "Gentle Cleanser for post-workout cleansing",
      },
      {
        step: "05",
        title: "Stress Management",
        time: "Daily practice",
        description: "Chronic stress is one of the biggest beauty enemies. It triggers cortisol, which breaks down collagen, causes acne, worsens psoriasis and eczema, and accelerates ageing. Practice stress management through meditation, yoga, journaling, breathing exercises, or any activity that brings calm and joy.",
        tip: "Even 10 minutes of deep breathing daily reduces cortisol levels measurably.",
        product: "Aromatherapy products, lavender essential oils for stress relief",
      },
    ],
    ingredients: [
      { name: "Vitamin C", role: "Boosts collagen production, powerful antioxidant, brightens skin from inside", found: "Citrus fruits, bell peppers, amla" },
      { name: "Omega-3 Fatty Acids", role: "Reduces skin inflammation, keeps cell membranes healthy, prevents dryness", found: "Walnuts, flaxseeds, fatty fish, fish oil capsules" },
      { name: "Zinc", role: "Fights acne bacteria, reduces inflammation, supports wound healing", found: "Pumpkin seeds, chickpeas, zinc supplements" },
      { name: "Collagen Peptides", role: "Directly supports skin elasticity and reduces fine lines when consumed", found: "Collagen supplements, bone broth" },
      { name: "Biotin (Vitamin B7)", role: "Strengthens hair and nails, supports healthy skin", found: "Eggs, nuts, biotin supplements" },
      { name: "Aloe Vera (consumed)", role: "Anti-inflammatory, improves digestion which reflects on skin clarity", found: "Aloe vera juice / gel drinks" },
    ],
    dos: [
      "Drink at least 2 litres of water every day",
      "Eat a colourful diet rich in fruits and vegetables",
      "Get 7-9 hours of quality sleep every night",
      "Exercise for at least 30 minutes daily",
      "Practice stress management through meditation or yoga",
      "Take a multivitamin if your diet is lacking in nutrients",
    ],
    donts: [
      "Don't consume excessive sugar — it glycates collagen and causes ageing",
      "Don't smoke — it restricts blood flow to skin and causes premature ageing",
      "Don't drink excessive alcohol — it dehydrates skin and depletes vitamins",
      "Don't skip sleep for productivity — skin repairs only during sleep",
      "Don't ignore chronic stress — it has direct, visible effects on skin",
      "Don't crash diet — rapid weight loss causes skin laxity and hair loss",
    ],
  },
};

// ─── Main Component ──────────────────────────────────────────
const CategoryGuide = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const data = categoryData[category?.toLowerCase()];

  // Reset active step when changing category
  useEffect(() => {
    setActiveStep(0);
  }, [category]);

  // If category not found
  if (!data) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center flex-col gap-4 p-4 text-center">
        <span className="text-6xl">😕</span>
        <h2 className="text-xl font-bold text-gray-800">Guide not found</h2>
        <p className="text-gray-600 text-sm max-w-xs">
          The guide category you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-16 bg-cream bg-cover bg-center bg-fixed"
      style={
        data.bgImage
          ? { backgroundImage: `url('${data.bgImage}')` }
          : undefined
      }
    >
      {/* ── Hero Banner ───────────────────────── */}
      <div
        className={`relative text-white px-4 py-20 text-center overflow-hidden bg-cover bg-center bg-gradient-to-r ${data.headerColor}`}
        style={
          data.headerImage
            ? { backgroundImage: `url('${data.headerImage}')` }
            : undefined
        }
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-6xl mb-4">{data.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {data.name} Guide
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">
            {data.tagline}
          </p>
        </div>
      </div>

      {/* ── Main Content Container ────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* ── Introduction ──────────────────────── */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">📖</span> What is {data.name}?
          </h2>
          <p className="text-gray-600 leading-relaxed">{data.intro}</p>
        </div>

        {/* ── Why It Matters ────────────────────── */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span> Why It Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.whyItMatters.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-cream/80 rounded-xl p-3">
                <span className="text-primary font-bold text-lg shrink-0">✓</span>
                <p className="text-gray-600 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Step by Step Routine ──────────────── */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">🪜</span> Step-by-Step Routine
          </h2>

          {/* Step tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {data.routine.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition ${
                  activeStep === i
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {step.step} {step.title}
              </button>
            ))}
          </div>

          {/* Active step content */}
          <div className="bg-cream/80 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                {data.routine[activeStep].step}
              </span>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {data.routine[activeStep].title}
                </h3>
                <span className="text-xs text-primary font-medium bg-pink-100 px-2 py-0.5 rounded-full">
                  ⏰ {data.routine[activeStep].time}
                </span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              {data.routine[activeStep].description}
            </p>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 bg-yellow-50/90 border border-yellow-200 rounded-xl p-3">
                <p className="text-xs font-bold text-yellow-700 mb-1">💡 Pro Tip</p>
                <p className="text-sm text-yellow-800">{data.routine[activeStep].tip}</p>
              </div>
              <div className="flex-1 bg-pink-50/90 border border-pink-200 rounded-xl p-3">
                <p className="text-xs font-bold text-primary mb-1">🛍️ Recommended Products</p>
                <p className="text-sm text-gray-700">{data.routine[activeStep].product}</p>
              </div>
            </div>
          </div>

          {/* Step navigation */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeStep === 0
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-400 self-center">
              {activeStep + 1} of {data.routine.length}
            </span>
            <button
              onClick={() =>
                setActiveStep(Math.min(data.routine.length - 1, activeStep + 1))
              }
              disabled={activeStep === data.routine.length - 1}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeStep === data.routine.length - 1
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primaryDark"
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        {/* ── Key Ingredients ───────────────────── */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🔬</span> Key Ingredients Explained
          </h2>
          <div className="space-y-3">
            {data.ingredients.map((ing, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-4 hover:border-primary transition bg-white/80"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{ing.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{ing.role}</p>
                  </div>
                  <span className="shrink-0 text-xs bg-pink-50 text-primary px-3 py-1 rounded-full font-medium self-start">
                    Found in: {ing.found}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Do's and Don'ts ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Do's */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                ✓
              </span>
              Do's
            </h2>
            <div className="space-y-2">
              {data.dos.map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-green-50/90 rounded-xl p-3">
                  <span className="text-green-500 font-bold shrink-0 mt-0.5">✓</span>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                ✕
              </span>
              Don'ts
            </h2>
            <div className="space-y-2">
              {data.donts.map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-red-50/90 rounded-xl p-3">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Shop Now CTA ──────────────────────── */}
        <div className={`bg-gradient-to-r ${data.headerColor} rounded-2xl p-8 text-center text-white shadow-lg`}>
          <h2 className="text-2xl font-bold mb-2">
            Ready to Start Your {data.name} Journey?
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Explore our curated {data.name.toLowerCase()} products picked just for you
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(`/products?category=${data.name}`)}
              className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-pink-50 transition shadow-md"
            >
              Shop {data.name} Products →
            </button>
            <button
              onClick={() => navigate("/skin-test")}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              ✨ Take Skin Test First
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGuide;