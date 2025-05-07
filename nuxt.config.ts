

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@tdesign-vue-next/nuxt', '@nuxtjs/i18n'],
  devServer:{
    port: 3007,
    host: '0.0.0.0',
  },
  css: [
    '~/assets/css/main.css'
  ],
  i18n: {
    // 2. 默认语言
    defaultLocale: 'zh-CN',

    // 3. 路由前缀方式：
    //    - 'prefix'：所有语言都带前缀 (/en/about, /zh-CN/about)
    //    - 'prefix_except_default'：默认语言不带前缀 (/about, /en/about)
    strategy: 'prefix_except_default',

    // 4. 懒加载语言包
    lazy: true,
    langDir: 'locales/',

    // 5. 浏览器语言探测
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'  // 当访问 / 时根据浏览器语言跳转
    }
  },
  plugins: ['~/plugins/i18n-auto.ts']
})
