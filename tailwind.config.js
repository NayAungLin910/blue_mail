/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./resources/**/*.{blade.php,js,vue,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
}
