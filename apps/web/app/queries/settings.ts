import { defineQuery } from 'groq';
import { SEO_FRAGMENT } from './fragments';
import { LOCALE_FN } from './utils';


export const SETTINGS_QUERY = defineQuery(/* groq */ `
  ${LOCALE_FN}
  *[_type == "settings" && _id == "settings"][0]{
    "seo": {
      ${SEO_FRAGMENT},
      "titleFormat": seo.title.format
    },
  }
`);
