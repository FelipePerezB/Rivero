/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        sm: "4px",
      },
      gap: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "40px",
      },
      padding: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      colors: {
        black: "#040E25",
        muted: "#A0A0A0",
        border: "#E5E7EB",
      },
      width: {
        screen: "100dvw",
      },
      boxShadow: {
        md: "2px 2px 6px rgb(229, 231, 235, 0.5)",
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
