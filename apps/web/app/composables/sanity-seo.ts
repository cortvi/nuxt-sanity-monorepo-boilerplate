import { createImageUrlBuilder } from '@sanity/image-url';
import type { SETTINGS_QUERY_RESULT } from '~/types/sanity';
import type { PageSeoData } from '~/types/seo';


type SanitySeo = NonNullable<SETTINGS_QUERY_RESULT>['seo'];

/**
 * Maps a `SEO_FRAGMENT` result to `usePageMeta` data:
 * crops the image to a 1200×630 JPG respecting its crop & hotspot.
 */
export const useSanitySeo = (seo: MaybeRefOrGetter<SanitySeo | undefined>) =>
{
  const imageBuilder = createImageUrlBuilder(useSanity().client);
  return computed<PageSeoData | undefined>(() =>
  {
    const data = toValue(seo);
    if (!data) return;
    return {
      ...data,
      image: data.image?.asset ?
        imageBuilder.image(data.image)
          .width(1200)
          .height(630)
          .fit('crop')
          .format('jpg')
          .url() :
        null,
    };
  });
};
