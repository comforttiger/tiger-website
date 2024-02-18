/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      sans: ["Fredoka"],
      display: ["Dosis"]
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#E63E62",
          secondary: "#3e62e6",
          accent: "#e63eb6",
          neutral: "#031014",
          "base-100": "#EFF3F3",
          info: "#3eb6e6",
          success: "#bfef8d",
          warning: "#e66e3e",
          error: "#ffffff",
        },
        dark: {
          primary: "#E63E62",
          secondary: "#3eb6e6",
          accent: "#3EE6C2",
          neutral: "#eff3f3",
          "base-100": "#031014",
          info: "#3eb6e6",
          success: "#bfef8d",
          warning: "#e66e3e",
          error: "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
