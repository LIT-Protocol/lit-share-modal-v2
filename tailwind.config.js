module.exports = {
  content: ['./index.html', './src/*.{js,jsx}', './src/**/*.{js,jsx}'],
  corePlugins: {
    preflight: false,
  },
  darkMode: "media",
  prefix: 'lsm-',
  theme: {
    textColor: {
      "black": "#000",
      "secondary": "#000533",
      "white": "#fff",
      "gray": "#d4d4d4",
      "dark-gray": "#616161",
      "brand-light": "#F0ECF8",
      "brand-5": "#2C0C72",
      "brand-4": "rgba(129, 89, 217, 1)",
      "brand-3": "#8159D9",
      "brand-2": "#e6dcfa",
      "next-button": "rgba(0, 0, 0, 0.26)",
      "title-gray": "rgba(0, 5, 51, 0.8)"
    },
    colors: {
      "white": "#fff",
      "black": "#000",
      "modal-overlay": "rgba(0,0,0,0.65)",
      "light-modal-overlay": "rgba(0,0,0,0.30)",
      "gray": "#d4d4d4",
      "dark-gray": "#616161",
      "brand-light": "#F0ECF8",
      "brand-5": "#2C0C72",
      "brand-4": "rgba(129, 89, 217, 1)",
      "brand-3": "#8159D9",
      "brand-2": "#e6dcfa",
      "initial-blue": "rgba(0, 148, 255, .22)",
      "transparent": "rgba(0, 0, 0, 0)"
    },
    fontFamily: {
      "open": ['Open Sans, sans-serif'],
      "segoe": ['Segoe UI, sans-serif'],
    }
  }
}
