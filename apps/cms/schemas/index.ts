import { home } from './documents/home';
import { settings } from './documents/settings';
import { localeString, localeText } from './objects/locale';
import { defaultSeo, seo } from './objects/seo';


export const schemaTypes = [
  // Documents:
  home,
  settings,

  // Objects:
  defaultSeo,
  seo,
  localeString,
  localeText,
];


export const singletonTypes = ['home', 'settings'];
export const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
