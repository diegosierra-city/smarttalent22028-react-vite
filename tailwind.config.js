/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      primary: '#4F4A45',
      secondary: '#ED7D31',
      color3: '#6C5F5B',
      color4: '#F6F1EE',
      black: '#000000',
      white: '#ffffff',
      silver: '#cccccc'
          },
  },
  plugins: [],
}

