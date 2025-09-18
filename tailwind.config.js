/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#64748b', 
        accent: '#f59e0b',
        dark: '#1e293b',
        light: '#f8fafc'
      }
    },
  },
  plugins: [],
}