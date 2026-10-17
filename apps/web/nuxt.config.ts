import
{
  apiVersion,
  locales,
  defaultLocale,
} from '@repo/sanity';


if (!import.meta.env.NUXT_SITE_URL) {
  throw new Error('NUXT_SITE_URL is not set');
}
if (!import.meta.env.NUXT_SANITY_PROJECT_ID) {
  throw new Error('NUXT_SANITY_PROJECT_ID is not set');
}


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-14',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/sanity',
    '@nuxtjs/sitemap',
  ],

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
  site: {
    name: 'Nuxt boilerplate',
    url: import.meta.env.NUXT_SITE_URL,
    trailingSlash: false,
  },
  sanity: {
    apiVersion,
    projectId: import.meta.env.NUXT_SANITY_PROJECT_ID,
    dataset: import.meta.env.NUXT_SANITY_DATASET,
  },
  /* TODO: choose i18n strategy (locales live in @repo/sanity) */
  i18n: {
    baseUrl: import.meta.env.NUXT_SITE_URL,
    restructureDir: 'app/i18n',
    strategy: 'prefix',
    locales: locales.map(({ id, title, language }) =>
      ({ code: id, name: title, language })
    ),
    defaultLocale,
    trailingSlash: false,
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
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
        id.includes('media-asset')
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
  hints: {
    features: {
      hydration: false,
      lazyLoad: { logs: false },
      webVitals: { logs: false },
    },
  },
});
