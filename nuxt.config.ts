export default defineNuxtConfig({
  experimental: {
    validate: false,
  },
  app: {
    baseURL: '/sinablog-chensicheng1978/',
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Nuxt.js project' }
      ],
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/blog/css/style.css?2026-08-31' },
        { rel: 'stylesheet', href: '/blog/font-awesome/css/font-awesome.min.css'},
      ],
      script: [
        { src: '/js/statcounter.js?2022-01-29'},
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2790001673900763',
          'crossorigin': 'anonymous',
          'async':true
        }
      ]
    },
  },
  
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/eslint-module',
    '@nuxtjs/html-validator',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
        highlight: {
          // Theme used in all color schemes.
          theme: 'github-light',
        }
      }
    },

  },
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
  },
  render: {
    fallback: {
      static: {
        handlers: {
          '.js': false,
          '.css': false
        }
      }
    }
  }
})