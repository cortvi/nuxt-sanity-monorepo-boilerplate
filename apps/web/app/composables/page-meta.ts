import { titleToken } from '@repo/sanity';
import type { DefaultSeoData, PageSeoData } from '~/types/seo';


export const usePageMeta = (
  seo?: MaybeRefOrGetter<PageSeoData | undefined>
) =>
{
  const siteConfig = useSiteConfig();
  const i18nHead = useLocaleHead();

  const defaultValues = useState<DefaultSeoData>('page-meta');

  const seoData = computed(() =>
    toValue(seo)
  );
  /* TODO: configure fallback title format */
  const title = computed(() =>
  {
    const title = seoData.value?.title ?? defaultValues.value?.title;
    if (!title) return siteConfig.name;

    const useFullTitle = seoData.value?.fullTitle ?? defaultValues.value?.fullTitle;
    if (useFullTitle) return title;
    const format = defaultValues.value?.titleFormat || `${titleToken} — Nuxt boilerplate`;
    return format.replace(titleToken, title);
  });
  const description = computed(() =>
    seoData.value?.description ?? defaultValues.value?.description
  );
  /* TODO: add default SEO image */
  const image = computed(() =>
    seoData.value?.image ??
    defaultValues.value?.image ??
    siteConfig.url + '/thumbnail.jpg'
  );

  /* TODO: configure default meta colors */
  const meta = computed(() => [
    ...(i18nHead.value.meta || []),
    { name: 'msapplication-TileColor', content: '#000000' },
    { name: 'theme-color', content: '#000000' },
  ]);
  /* TODO: add default favicon */
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


  useHead(() => ({
    htmlAttrs: i18nHead.value.htmlAttrs,
    meta: meta.value,
    link: link.value,
  }));
  useSeoMeta({
    title,
    description,

    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,

    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: 'summary_large_image',
  });


  return { defaultValues };
};
