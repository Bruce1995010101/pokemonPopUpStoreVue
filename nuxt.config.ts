// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@pinia/nuxt'],
  devtools: { enabled: true },
  components: [
    { path: '~/components', pathPrefix: false }, // 確保 Nuxt 掃描所有 components 目錄
  ],
  routeRules: {
    '/overAll': { ssr: false },
    '/product': { ssr: false },
    '/orderlist': { ssr: false },
    '/menuitem': { ssr: false },
    '/cafebooking': { ssr: false },
    '/storebooking': { ssr: false },
    '/Account': { ssr: false },
  }
})
