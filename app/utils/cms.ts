/**
 * Appends width/height query parameters to a DatoCMS image URL.
 * DatoCMS and Sanity use Imgix for image transformations via query parameters.
 * Note: SVGs are returned unchanged to prevent rasterization.
 *
 * @param url - The image URL
 * @param options - Image transformation options
 * @param options.width - Image width in pixels
 * @param options.height - Image height in pixels
 * @param options.fit - How to fit the image (crop, fill, scale). Defaults to 'crop'
 * @param options.auto - Auto-format optimization. Defaults to 'format'
 * @returns The URL with query parameters appended, or unchanged if SVG
 */
export function toTransImageUrl(
  url: string,
  options: {
    width?: number
    height?: number
    fit?: 'crop' | 'fill' | 'scale'
    auto?: 'format' | 'compress'
    focalPoint?: { x: number, y: number } | null
  }
): string
{
  try
  {
    const requestUrl = new URL(url);
    const pathname = requestUrl.pathname.toLowerCase();
    if (pathname.endsWith('.svg')) return url;

    const globalScale = 1.2;
    if (options.width) requestUrl.searchParams.set(
      'w',
      String(Math.round(options.width * globalScale))
    );
    if (options.height) requestUrl.searchParams.set(
      'h',
      String(Math.round(options.height * globalScale))
    );

    requestUrl.searchParams.set('fit', options.fit ?? 'crop');
    requestUrl.searchParams.set('auto', options.auto ?? 'format');

    const fp = options.focalPoint;
    if (fp &&
      Number.isFinite(fp.x) &&
      Number.isFinite(fp.y) &&
      (options.fit ?? 'crop') === 'crop'
    )
    {
      requestUrl.searchParams.set('crop', 'focalpoint');
      requestUrl.searchParams.set('fp-x', String(fp.x));
      requestUrl.searchParams.set('fp-y', String(fp.y));
    }

    return requestUrl.toString();
  }
  catch
  {
    return url;
  }
}
