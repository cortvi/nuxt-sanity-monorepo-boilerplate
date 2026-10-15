import type { PageSeoData } from '~/types/seo';


export const usePageMeta = (
  seo?: MaybeRefOrGetter<PageSeoData | undefined>
) =>
{
  const i18nHead = useLocaleHead();

  const seoData = computed(() => toValue(seo));
  const title = computed(() =>
  {
    // TODO: configure SEO tail
    const tail = 'Nuxt boilerplate';
    const title = seoData.value?.title;
    if (!title) return tail;
    if (seoData.value?.fullTitle) return title;
    return `${title} — ${tail}`;
  });
  const description = computed(() => seoData.value?.description);
  const image = computed(() => seoData.value?.image);

  const meta = computed(() => [
    ...(i18nHead.value.meta || []),
    { name: 'msapplication-TileColor', content: '#F7C1D8' },
    { name: 'theme-color', content: '#F7C1D8' },
  ]);

  const link = computed(() => [
    ...(i18nHead.value.link || []),
    { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
    { rel: 'icon', href: '/favicon/favicon.svg', type: 'image/svg+xml' },
    { rel: 'icon', sizes: '16x16', href: '/favicon/16.png', type: 'image/png' },
    { rel: 'icon', sizes: '32x32', href: '/favicon/32.png', type: 'image/png' },
    { rel: 'icon', sizes: '192x192', href: '/favicon/192.png', type: 'image/png' },
    { rel: 'icon', sizes: '512x512', href: '/favicon/512.png', type: 'image/png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch.png', type: 'image/png' },
  ]);


  useHead({
    htmlAttrs: { ...i18nHead.value.htmlAttrs },
    title,
    meta,
    link,
  });

  useSeoMeta({
    title,
    description,

    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageType: 'image/png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageUrl: image,

    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: 'summary_large_image',
  });
};
