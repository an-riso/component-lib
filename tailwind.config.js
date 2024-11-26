/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./static/**/*.{html,js,vue,ts}', './templates/**/*.{html,js,vue,ts}'],
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
  daisyui: {
    themes: [
      {
        oversonic: {
          primary: '#1fada2',
          'primary-content': '#FFFFFF',
          secondary: '#41607a',
          'secondary-content': '#FCFCFC',
          accent: '#0087e9',
          'accent-content': '#000613',
          neutral: '#201418',
          'neutral-content': '#cdcacb',
          'base-100': '#f5fefd',
          'base-200': '#d5dddc',
          'base-300': '#b6bdbc',
          'base-content': '#18212b',
          info: '#00b2e0',
          'info-content': '#111827',
          success: '#00eba0',
          'success-content': '#001309',
          warning: '#fdc448',
          'warning-content': '#040404',
          error: '#ff2952',
          'error-content': '#FFFFFF'
        }
      }
    ]
  }
}
