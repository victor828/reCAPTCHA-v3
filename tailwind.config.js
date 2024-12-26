/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["lofi", "night"],
  },
  darkMode: ["selector", '[data-theme="night"]'],
};
