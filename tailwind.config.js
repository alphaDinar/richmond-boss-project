import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      screens: {
        'sm-screen': { 'max': '650px' },
        'half-screen': { 'max': '850px' },
        'md-screen': { 'max': '1050px' },
        'tab-screen': { 'max': '1350px' },
      },
      boxShadow: {
        'light-shadow': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        'custom-heavy': '0 10px 15px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  darkMode: "class",
  darkMode: "class",
  plugins: [nextui()],
}

module.exports = config;