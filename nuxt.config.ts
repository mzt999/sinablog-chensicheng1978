// https://nuxt.com/docs/api/configuration/nuxt-config
var mySiteBase = '/sinablog-chensicheng1978/';
export default defineNuxtConfig({
  app: {
    baseURL: mySiteBase,
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Nuxt.js project' }
      ],
      link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: mySiteBase+'favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: mySiteBase+'favicon.ico' },
      { rel: 'stylesheet', href: mySiteBase+'css/style.css' },
      { rel: 'stylesheet', href: mySiteBase+'font-awesome/css/font-awesome.min.css'},
      ],
    },
  },
  modules: ['@nuxt/content'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
