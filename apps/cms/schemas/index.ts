import { home } from './documents/home';
import { settings } from './documents/settings';
import { defaultSeo, seo } from './objects/seo';


export const schemaTypes = [
  // Documents:
  home,
  settings,

  // Objects:
  defaultSeo,
  seo,
];


export const singletonTypes = ['home', 'settings'];
export const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
