/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      orbitron: ["Orbitron", "sans-serif"],
    },
    extend: {},
  },
  // plugins: [require("daisyui")],
}
