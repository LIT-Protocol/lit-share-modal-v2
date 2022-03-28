module.exports = {
  env: {
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@babel/eslint-parser",
  "rules": {
    "react/prop-types": 0
  }
}
