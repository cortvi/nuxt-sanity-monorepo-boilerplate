import { defineField, defineType } from 'sanity';
import { SearchIcon } from '@sanity/icons/Search';
import { siteName, titleToken } from '@repo/sanity';
import { SeoTitleInput } from '../../components/seo-title-input';
import { localeValidation } from '../../utils/validation';


/** Builds the page SEO object, or the site-wide default one when `isDefault` */
const defineSeo = (name: string, title: string, isDefault: boolean) => defineType({
  type: 'object',
  name,
  title,
  icon: SearchIcon,
  fields: [
    defineField({
      type: 'object',
      name: 'title',
      components: { input: SeoTitleInput },
      fields: [
        defineField({
          type: 'internationalizedArrayString',
          name: 'text',
        }),
        ...isDefault ?
          [defineField({
            type: 'internationalizedArrayString',
            name: 'format',
            title: 'Title format',
            description: (
              `Use ${titleToken} where the title goes, e.g. "${titleToken} | ${siteName}"`
            ),
            validation: rule => localeValidation(
              rule,
              (text?: string) => !text || text.includes(titleToken),
              `Must include ${titleToken}`
            ),
          })] :
          [],
        defineField({
          type: 'boolean',
          name: 'ignoreFormat',
          title: 'Ignore site format',
          description: 'Use the title as-is, without applying the site title format',
        }),
      ],
    }),
    defineField({
      type: 'internationalizedArrayText',
      name: 'description',
      validation: rule => localeValidation(
        rule,
        (text?: string) => (text?.length ?? 0) <= 160,
        'Keep it under 160 characters',
        'warning'
      ),
    }),
    defineField({
      type: 'image',
      name: 'image',
      description: 'Cropped to 1200×630',
      options: { hotspot: true },
    }),
  ],
});

export const seo = defineSeo('seo', 'SEO', false);
export const defaultSeo = defineSeo('defaultSeo', 'Default SEO', true);
