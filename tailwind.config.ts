/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        regular: ['Poppins-Regular', 'sans-serif'],
        medium: ['Poppins-Medium', 'sans-serif'],
        semibold: ['Poppins-SemiBold', 'sans-serif'],
        bold: ['Poppins-Bold', 'sans-serif'],
        black: ['Poppins-Black', 'sans-serif'],
      },
      colors: {
        background: '#eff6ff',
        blue_secondary: '#bfdbfe',
        darker_background: '#f1f5f9',
        green_primary: '#10b981',
        green_secondary: '#a7f3d0',
        orange_primary: '#f97316',
        orange_secondary: '#fed7aa',
        pink_primary: '#ec4899',
        pink_secondary: '#fbcfe8',
        primary: '#3b82f6',
        red_primary: '#f43f5e',
        red_secondary: '#fecdd3',
        text: '#172554',
        violet_primary: '#8b5cf6',
        violet_secondary: '#ddd6fe',
        yellow_primary: '#eab308',
        yellow_secondary: '#fef08a'
      
      }
    },
  },
  plugins: [],
};
