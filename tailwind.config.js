/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-primary-black": "#1b2021",
        "dark-variant-gray": "#30343f",
        "primary-pink": "#E83D95",
        "primary-pink-variant": "#ea638c",
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
