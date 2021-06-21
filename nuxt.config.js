export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Instituto Jovem Exportador',
    title: 'Pjex',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },

  // target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  // 'roboto-fontface/css/roboto/roboto-fontface.css',
  // css: ['font-awesome/css/font-awesome.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://hk-pjex-api-prod.herokuapp.com/api/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Pjex - Instituto Jovem Exportador',
      lang: 'pt-BR',
      short_name: 'Pjex',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '@plugins/vuetify/vuetify.options.js',
    defaultAssets: {
      icons: {
        iconfont: 'mdi', // 'mdi' || 'md' || 'fa' || 'fa4'
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    buildDir: 'dist',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: false,
          propertyName: 'id',
        },
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: 'access_token',
          },
          user: {
            url: 'auth/user',
            method: 'get',
          },
          logout: {
            url: 'auth/logout',
            method: 'post',
          },
        },
      },
    },
  },
}
