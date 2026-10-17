import { defineQuery } from 'groq';
import { SEO_FRAGMENT } from './fragments';
import { LOCALE_FN } from './utils';


export const HOME_QUERY = defineQuery(/* groq */ `
  ${LOCALE_FN}
  *[_type == "home" && _id == "home"][0]{
    "title": locale::pick(title).value,
    "seo": { ${SEO_FRAGMENT} }
  }
`);
