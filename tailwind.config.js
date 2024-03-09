/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
    },
    screens: {
      '376px': '376px',
      '560px': '560px',
      '760px': '760px',
      '960px': '960px',
    },    
  },
  plugins: [
  ],
}
