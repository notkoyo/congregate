import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pally: ["pally"],
        satoshi: ["satoshi"],
      },
      width: {
        1600: "1500px",
        400: "400px",
        40: "40px",
        650: "650px",
      },
      height: {
        200: "200px",
        260: "260px",
        107: "124px",
        101: "90px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
