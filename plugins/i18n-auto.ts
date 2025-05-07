// plugins/i18n-auto.ts
import { defineNuxtPlugin } from '#app'
import type { I18n } from 'vue-i18n'

// 匹配所有 locales 目录下的 JSON
const messages = import.meta.glob('../locales/**/*.json', { eager: true })

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.vueApp.config.globalProperties.$i18n as I18n

  for (const path in messages) {
    // 路径示例 "../locales/zh-CN/moduleA.json"
    const matched = path.match(/locales\/(.+)\/(.+)\.json$/)
    if (matched) {
      const [_, locale, file] = matched
      // 合并到对应语言下，以文件名为命名空间
      i18n.global.mergeLocaleMessage(
        locale,
        { [file]: (messages[path] as any).default }
      )
    }
  }
})
