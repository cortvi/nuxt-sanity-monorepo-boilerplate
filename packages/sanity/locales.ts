/* TODO: Choose locales */
export const locales = [
  { id: 'en', title: 'English', language: 'en-GB' },
  { id: 'es', title: 'Español', language: 'es-ES' },
] as const;
export type LocaleCode = typeof locales[number]['id'];
export const defaultLocale: LocaleCode = 'en';
