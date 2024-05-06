/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      colors:
      {
        'blue1' : '#4F7CAC',
        'blue2' : '#9EEFE5',
        'mint' : "#C0E0DE",
        'darkmetal' : "#162521",
        'grey' : "#3C474B",
      }


    },
  },
  plugins: [],
}

