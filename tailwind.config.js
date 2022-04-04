const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: "#0015BC",
        secondary: "#FF0000",
        other: "#22c74e",
        white: "white",
        black: "black",
        selectBg: "white",
        selectBorder: "#e3edfc",
        selectBorderActive: "#6b96db",
        blue: "#2563EB",
        red: "#EF4444",
        lightGreyText: "#4a4a4a",
        blueGray300: "#90a4ae",
        blueGray600: "#546e7a",
        blue500: "#2196f3",
        footerBackground: "#3F3F46",
        footerText: "#d4d4d4",
        tooltipBack: "#e6f7f4",
      }
    }
  },
  plugins: [],
};
