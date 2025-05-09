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
    '~/assets/css/main.css',
    '~/assets/iconfont/iconfont.css'
  ],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
        // 如果你还有其他全局 meta，也可以继续写在这里
      ],
      // 你也可以在这里统一添加 title、link、script 等
      // title: 'My Nuxt3 App',
      // link: [ { rel: 'icon', href: '/favicon.ico' } ]
    }
  }
})
