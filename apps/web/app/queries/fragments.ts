export const SEO_FRAGMENT = /* groq */ `
  "title": seo.title.text[language == $locale][0].value,
  "ignoreFormat": seo.title.ignoreFormat,
  "description": seo.description[language == $locale][0].value,
  "image": seo.image
`;
