module.exports = {
  build: {
    postcss: [
      require('postcss-responsive-type')(),
      require("postcss-cssnext")(),
    ],
    vendors: [
      'vue-rx',      
      'rxjs',
    ],
  },

  plugins: [
    '~plugins/vue-rx',
  ],

  /*
  ** Headers of the page
  */
  head: {
    title: 'I 🍴 algorithm',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "Nuxt.js project" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
