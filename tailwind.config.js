/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts,js}"],
  theme: {
    extend: {
      colors: {
        white: {
          100: '#fff'
        },
        gray: {
          100: '#e1e1e6',
          300: '#c4c4cc',
          400: '#8d8d99',
          600: '#323238',
          700: '#29292e',
          800: '#202024',
          900: '#121214'
        },
        green: {
          300: '#00b37e',
          500: '#00875f'
        }
      },
      fontFamily: {
        sans: 'Roboto, sans-serif'
      }
    }
  },
  plugins: [],
}
