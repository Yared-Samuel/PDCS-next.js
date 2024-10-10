/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx','./app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.tsx',],
  theme: {
    extend: {},
  },
  plugins: [
    
    require('daisyui'),
  ],
  daisyui: {
    themes: ["nord"],
  },
}

