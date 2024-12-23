import { generateRoutes } from "./scripts/generate-routes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "tiger's website",
          href: "/rss.xml",
        },
      ],
      meta: [
        { name: 'color-scheme', content: 'light dark' },
      ],
      title: "tiger's website",
    },
  },

  nitro: {
    prerender: {
      routes: ["/rss.xml", "/asks.xml", "/comments.xml", "/pending-comments.xml", "/watching.xml"],
    },
  },

  content: {
    highlight: {
      langs: ["rust", "ruby", "css", "html"],
      theme: {
        default: "github-dark",
        dark: "dracula",
        light: "github-light",
      },
    },
  },

  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/content"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  generate: {
    routes: generateRoutes(),
  },

  compatibilityDate: "2024-10-02",
});
