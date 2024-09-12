// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      title: "tiger's website"
    }
  },
  nitro: {
    prerender: {
      routes: [ '/rss.xml' ]
    }
  },
  content: {
    highlight: {
      langs: [
        'rust',
        'ruby',
        'css',
      ],
      theme: {
        default: 'github-dark',
        dark: 'dracula',
        light: 'github-light'
      }
    }
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/content"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
})
