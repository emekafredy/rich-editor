/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "450px",
      ...defaultTheme.screens,
    },
    colors: {
      white: {
        100: "#FFFFFF",
        200: "#FAFAFA",
        300: "#E7F1E9",
        400: "#f0f0f0",
      },
      gray: {
        100: "#E7F1E9",
        200: "#333333",
        300: "#CEE3D4",
      },
      green: {
        100: "#F7FCF8",
      },
      black: {
        100: "#343E37",
      },
      red: {
        100: "#CD2C2C",
      },
      primary: "#0C7227",
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
