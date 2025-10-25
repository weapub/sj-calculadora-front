/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: { 950: "#0a0a0f" },
        violet: { 600: "#6d28d9", 500: "#7c3aed" },
      },
    },
  },
  plugins: [],
}
