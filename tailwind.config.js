/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#2B7FFF', // Bright Blue
        secondary: '#00E0FF', // Cyan / Aqua
        accent: '#112334', // Deep Navy (Dark BG)
        danger: '#FF0000',

        // Backgrounds
        background: {
          light: '#FFFFFF', // Pure White for Light Mode
          dark: '#112334',  // Deep Navy for Dark Mode
        },

        // Surfaces (Cards, Inputs)
        surface: {
          light: '#F8F9FA', // Very Light Grey for Light Mode cards
          dark: '#1A2C42',  // Lighter Navy for Dark Mode cards
        },

        // Text
        textGrey: '#A3B1C6',
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      gridTemplateColumns: {
        // Mobile-first grid
        'card-mobile': 'repeat(auto-fill, minmax(100%, 1fr))',
        'card-desktop': 'repeat(auto-fill, minmax(300px, 1fr))',
      }
    },
  },
  plugins: [],
}
