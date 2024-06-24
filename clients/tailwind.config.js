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
        "purple-1": "#9400ff",
        "purple-2": "#9499ff",
        "darkBluesh-1": "#2c2e4c",
        "darkBluesh-2": "#1a1c2e",
        "darkBluesh-3": "#161726",
      },
      spacing: {
        // Add a custom height class using calc(100dvh - 20px)
        "height-dvh": "calc(100dvh - 16px)",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
