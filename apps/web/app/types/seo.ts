export type PageSeoData = {
  title?: string | null
  ignoreFormat?: boolean | null
  description?: string | null
  image?: string | null
};

export type DefaultSeoData = PageSeoData & {
  titleFormat?: string | null
};
