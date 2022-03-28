// module.exports = {
//   plugins: {
//     'postcss-import': {},
//     'tailwindcss/nesting': {},
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nested')),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
