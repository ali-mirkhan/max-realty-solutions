/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        burgundy: {
          DEFAULT: "#7D1A2D",
          light: "#9B2035",
          dark: "#6B1526",
        },
        charcoal: {
          DEFAULT: "#2C2C2C",
          light: "#3A3A3A",
        },
        stone: {
          warm: "#F7F5F0",
          light: "#F2EDE6",
          border: "#E8E4DE",
        },
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
