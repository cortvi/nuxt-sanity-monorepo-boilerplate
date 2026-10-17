import { defineField, defineType } from 'sanity';
import { SearchIcon } from '@sanity/icons/Search';
import { localeValidation } from '../../utils/validation';


export const seo = defineType({
  type: 'object',
  name: 'seo',
  title: 'SEO',
  icon: SearchIcon,
  fields: [
    defineField({
      type: 'localeString',
      name: 'title',
    }),
    defineField({
      type: 'boolean',
      name: 'fullTitle',
      title: 'Full title',
      description: 'Use the title as-is, without the site name affix',
    }),
    defineField({
      type: 'localeText',
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
