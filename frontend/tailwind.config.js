module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B76E79",       // Rose Gold main
        primaryDark: "#9D5965",   // Rose Gold dark (hover)
        primaryLight: "#E8B4B8",  // Rose Gold light
        gold: "#D4AF37",          // Gold accent
        cream: "#FDF6F0",         // Cream background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}