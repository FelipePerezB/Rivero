/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors:{
        black: "hsla( 0,0%,9% ,1)"
      },
      width: {
        screen: "100dvw",
      },
      boxShadow: {
        md: "1px 1px 3px rgb(232, 232, 232)",
      },
      backgroundColor: {
        "blue-500": "#2c73eb",
        body: "#FDFEFF",
        "black-1000": "#0c0e13",
      },
      fontSize: {
        em: "1em",
      },
      animation: {
        "show-modal": "show-modal 150ms ease-in-out forwards",
        hide: "hide 250ms ease-in-out forwards",
      },
      keyframes: {
        hide: {
          "100%": {
            display: "none",
            opacity: 0,
          },
        },
        "show-modal": {
          "0%": {
            opacity: 0,
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
