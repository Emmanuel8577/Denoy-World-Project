/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        denyo: {
          green: "#006838", // Forest Green
          blue: "#0054A6",  // Deep Royal Blue
          red: "#ED1C24",   // Vibrant Red
          gold: "#D4AF37",  // Metallic Gold
        },
      },
      fontFamily: {
        // High-end Serif for headings
        serif: ['Fraunces', 'serif'], 
        // Modern Sans for body/dashboard
        sans: ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}