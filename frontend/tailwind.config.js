/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom Colors
        cream: "#fbf0cb",
        orange: "#d3622c",
        "light-orange": "#e86f37",
        white: "#FFFFFF",

        "color-primary": "#E6E9EA",
        "color-secondary": "#4C5562",
        "color-tertiary": "#244873",
        "color-white": "#FFFFFF",
        "color-blue": "#BEE9F8",
        "color-blue2": "#306E9C",
        "color-red": "#ce2d4f",
      },
    },
  },
  plugins: [],
};
