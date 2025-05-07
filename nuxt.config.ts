

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@tdesign-vue-next/nuxt'],
  devServer:{
    port: 3007,
    host: '0.0.0.0',
  },
  css: [
    '~/assets/css/main.css'
  ],
})
