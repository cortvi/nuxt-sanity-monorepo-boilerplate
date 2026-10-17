export const SEO_FRAGMENT = /* groq */ `
  "title": locale::pick(seo.title).value,
  "fullTitle": seo.fullTitle,
  "description": locale::pick(seo.description).value,
  "image": seo.image
`;
