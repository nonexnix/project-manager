module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      colors: {
        'violet': '#EFECFC',
        'snow': '#F6F8FC',
        'blue': '#6AC0DC',
        'pink': '#E30071',
        'typography': '#2F2F2F'
      }
    },
  },
  plugins: [],
}
