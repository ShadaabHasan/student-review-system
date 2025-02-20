/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "text-gradient": "text-gradient 2.1s linear infinite",
      },
      keyframes: {
        "text-gradient": {
          to: {
            backgroundPosition: "200% center",
          },
        },
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};
