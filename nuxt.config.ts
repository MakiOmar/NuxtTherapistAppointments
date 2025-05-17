import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', dir: 'ltr', file: 'en.json' },
      { code: 'ar', name: 'العربية', iso: 'ar-EG', dir: 'rtl', file: 'ar.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix', // URLs will be /en, /ar
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api', // Laravel backend
    },
  },
})
