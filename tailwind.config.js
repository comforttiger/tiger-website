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
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#E63E62",
          secondary: "#BFEF8D",
          accent: "#37f6f2",
          neutral: "#dcf0f7",
          "base-100": "#031014",
          info: "#ffffff",
          success: "#00ffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
