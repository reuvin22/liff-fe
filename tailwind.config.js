/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px' <= '639px',
        'sm': '640px' <= '769px',
        'md': '768px',
      },
    },
  },
  plugins: [],
}
