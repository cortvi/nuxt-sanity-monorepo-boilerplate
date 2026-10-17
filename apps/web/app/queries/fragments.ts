export const SEO_FRAGMENT = /* groq */ `
  "title": locale::pick(seo.title.text).value,
  "ignoreFormat": seo.title.ignoreFormat,
  "description": locale::pick(seo.description).value,
  "image": seo.image
`;
