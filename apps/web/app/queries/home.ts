import { defineQuery } from 'groq';
import { SEO_FRAGMENT } from './fragments';


export const HOME_QUERY = defineQuery(/* groq */ `
  *[_type == "home" && _id == "home"][0]{
    "title": title[language == $locale][0].value,
    "seo": { ${SEO_FRAGMENT} }
  }
`);
