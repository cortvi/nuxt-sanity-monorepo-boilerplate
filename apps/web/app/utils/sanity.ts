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
