import { ALL_FIELDS_GROUP, defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';
import { requiredInAllLocales } from '../../utils/validation';


export const home = defineType({
  type: 'document',
  name: 'home',
  icon: HomeIcon,
  groups: [
    { ...ALL_FIELDS_GROUP, hidden: true },
    { name: 'content', title: 'Content', default: true },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      type: 'localeString',
      name: 'title',
      group: 'content',
      validation: requiredInAllLocales,
    }),
    defineField({
      type: 'seo',
      name: 'seo',
      title: 'SEO',
      group: 'settings',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home' }),
  },
});
