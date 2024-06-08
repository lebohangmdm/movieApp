export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },

    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      colors: {
        "light-1": "#e6e6e6",
        "light-2": "#b3b3b3",
        "light-3": "#333333",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
