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
          primary: "#9caad6",
          secondary: "#452f71",
          accent: "#a06cc2",
          neutral: "#dce0f0",
          "base-100": "#06080e",
          info: "#ffffff",
          success: "#00ffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
        dark2: {
          primary: "#E63E62",
          secondary: "#3EE6C2",
          accent: "#3eb6e6",
          neutral: "#eff3f3",
          "base-100": "#031014",
          info: "#ffffff",
          success: "#00ffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
