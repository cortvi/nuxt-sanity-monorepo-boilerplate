import type { PageSeoData } from '~/types/seo';
import type { SETTINGS_QUERY_RESULT } from '~/types/sanity';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';


export const isSanityImageUrl = (url: string) => url.startsWith('https://cdn.sanity.io/images/');


/**
 * Builds a Sanity CDN image URL cropped to the given size,
 * respecting the image's crop & hotspot when `source` is an image object.
 * Needs the Nuxt app context (it calls `useSanity`).
 */
export function toSanityImageUrl(
  source: SanityImageSource,
  options: { width?: number, height?: number }
): string
{
  const globalScale = 1.2;
  let image = createImageUrlBuilder(useSanity().client)
    .image(source)
    .fit('crop')
    .auto('format');
  if (options.width) image = image.width(Math.round(options.width * globalScale));
  if (options.height) image = image.height(Math.round(options.height * globalScale));
  return image.url();
}


type SanitySeo = Partial<NonNullable<SETTINGS_QUERY_RESULT>['seo']>;
/**
 * Maps a `SEO_FRAGMENT` result to be used by `usePageMeta`:
 * - crops the image to a 1200×630 JPG respecting its crop & hotspot.
 */
export const composeSanitySeo = (seo: MaybeRefOrGetter<SanitySeo | undefined>) =>
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
