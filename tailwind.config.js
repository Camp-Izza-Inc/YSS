/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#252a2d",
        primary: {
          50: "#CEDDEB",
          100: "#9EBCD7",
          200: "#76A1C6",
          300: "#5489B8",
          400: "#40719B",
          500: "#355C7F",
          600: "#2B4C68",
          700: "#243E56",
          800: "#1D3346",
          900: "#182A3A",
        },
        offWhite: "#EFF1F8",
        secondary: "#2d4050",
        accent: "#90c8dd",
      },
    },
  },
  daisyui: {
    themes: [
      {
        yss: {
          primary: "#5489B8",
          secondary: "#2d4050",
          accent: "#90c8dd",
          neutral: "#2a323c",
          "base-100": "#252a2d",
          info: "#a3e635",
          success: "#22c55e",
          warning: "#e89117",
          error: "#e45864",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
