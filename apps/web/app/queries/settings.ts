import { defineQuery } from 'groq';
import { SEO_FRAGMENT } from './fragments';


export const SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "settings" && _id == "settings"][0]{
    "seo": {
      ${SEO_FRAGMENT},
      "titleFormat": seo.title.format
    },
  }
`);
