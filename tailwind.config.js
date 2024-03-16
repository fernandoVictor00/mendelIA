/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'biofy-blue': '#008FBB',
        'biofy-blue-more': '#00A6D9',
        'biofy-cyan': '#00AD7F',
        'biofy-cyan-more': '#00C99A',
        'biofy-blue-dark': '#002D42',
        'biofy-blue-dark-more': '#001F2C',
      }
    },
  },
  plugins: [],
}

