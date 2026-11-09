import type { SETTINGS_QUERY_RESULT } from './sanity';


export type SanitySeoDefault = NonNullable<SETTINGS_QUERY_RESULT>['seo'];
export type SanitySeo = Omit<NonNullable<SETTINGS_QUERY_RESULT>['seo'], 'titleFormat'>;

export type SeoDefaultData = Omit<SanitySeoDefault, 'image'> & { image: string | null };
export type SeoData = Omit<SanitySeo, 'image'> & { image: string | null };
