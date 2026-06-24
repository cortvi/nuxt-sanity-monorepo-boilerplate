/* TODO: Uncomment when NUXT_SITE_URL is set */
// if (!import.meta.env.NUXT_SITE_URL) {
//   throw new Error('NUXT_SITE_URL is not set');
// }


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxtjs/i18n',
  ],

  runtimeConfig: {
    public: {
      siteUrl: import.meta.env.NUXT_SITE_URL,
    },
  },
  app: {
    rootAttrs: { id: 'app' },
    head: {
      /* TODO: Choose default text class */
      bodyAttrs: { class: '' },
    },
  },
  icon: {
    class: 'nuxt-icon',
    serverBundle: 'local',
    fallbackToApi: false,
    customCollections: [
      {
        prefix: 'i',
        dir: './app/assets/icon',
      },
    ],
  },
  /* TODO: Choose fonts */
  // fonts: {
  //   families: [
  //     {
  //       name: 'Some Font',
  //       provider: 'local',
  //       preload: true,
  //       display: 'swap',
  //       weights: [200, 300, 400, 500, 600, 700, 800, 900],
  //       subsets: ['latin'],
  //     },
  //   ],
  //   providers: {
  //     bunny: false,
  //     adobe: false,
  //     fontshare: false,
  //     google: false,
  //     typekit: false,
  //     vercel: false,
  //     fontsource: false,
  //     googleicons: false,
  //   },
  //   processCSSVariables: false,
  // },
  /* TODO: choose i18n strategy & locales */
  // i18n: {
  //   baseUrl: import.meta.env.NUXT_SITE_URL ?? 'https://example.com',
  //   strategy: 'prefix_and_default',
  //   locales: [
  //     { code: 'en', language: 'en-GB' },
  //     { code: 'es', language: 'es-ES' },
  //     { code: 'fr', language: 'fr-FR' },
  //     { code: 'de', language: 'de-DE' },
  //     { code: 'it', language: 'it-IT' },
  //     { code: 'ja', language: 'ja-JP' },
  //   ],
  //   defaultLocale: 'en',
  //   trailingSlash: false,
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     redirectOn: 'root',
  //   },
  // },
  hints: {
    features: {
      hydration: false,
      lazyLoad: { logs: false },
      webVitals: { logs: false },
    },
  },
  /* TODO: Choose inline styles */
  features: {
    inlineStyles: id =>
    {
      const isInline = (id != undefined) && (
        id.includes('hero') ||
        id.includes('/layout/') ||
        id.includes('/button/') ||
        id.includes('/reveal/') ||
        id.includes('media-asset') ||
        id.includes('pages/index.vue')
      );
      return isInline;
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/app/fx";
            @use "~/assets/scss/app/typo";
          `,
        },
      },
    },
  },
});
