export const siteName = 'Nuxt boilerplate';


/** Placeholder replaced by the page title in the site title format */
export const titleToken = '{{title}}';

/* TODO: configure fallback title format */
export const fallbackTitleFormat = `${titleToken} — ${siteName}`;

/** Applies the site title format to a title, unless `ignoreFormat` is set */
export const formatTitle = (
  title: string,
  { format, ignoreFormat }: {
    format?: string | null,
    ignoreFormat?: boolean | null
  } = {}
) =>
  ignoreFormat ?
    title :
    (format || fallbackTitleFormat).replace(titleToken, title);
