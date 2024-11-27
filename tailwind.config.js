/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'oversonic-dark': '#111111',
        'oversonic-green': '#00AA00',
        'oversonic-yellow': '#FFAA00',
        'oversonic-red': '#FF0000',
        'oversonic-blue': '#3E8BE6',
        'oversonic-blue-hover': '#326FB8',
        'oversonic-hover': '#292929',
        'oversonic-grey': '#aaaaaa',
        'oversonic-white': '#ffffff',
        'oversonic-white-hover': '#eaeef5',
        'oversonic-grey-hover': '#888888',
        'oversonic-active': '#3E8BE6',
        'oversonic-active-hover': '#165abe',
        'oversonic-green-hover': '#00AA001A',
        'oversonic-green-new': '#E3FFC6',
        pink: '#ff49db',
        orange: '#ff7849',
        patronas: {
          DEFAULT: '#0ABBB5',
          dark: '#089B96',
          light: '#0BD5CE',
          grey: '#B3DAD9'
        }
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
