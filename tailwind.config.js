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
      sans: ["Andika"],
      display: ["Dosis"],
      zoe: ["Zoe"],
      erysdren: ["Erysdren"],
      abyss: ["Abyss"],
      myno: ["Myno"],
      oatmealine: ["Oatmealine"],
      indietsushin: ["IndieTsushin"],
      summer: ["Summer"],
      "tulip-one": ["TulipOne"],
      "tulip-two": ["TulipTwo"]
    },
    extend: {
      backgroundImage: {
        'background-repeat': "url('/images/background-repeat.webp')",
      }
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6633EE",
          secondary: "#3e62e6",
          accent: "#EE6633",
          neutral: "#031014",
          "base-100": "#EFF3F3",
          info: "#3eb6e6",
          success: "#bfef8d",
          warning: "#e66e3e",
          error: "#ffffff",
        },
        dark: {
          primary: "#6633EE",
          secondary: "#EE6633",
          accent: "#EE6633",
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
