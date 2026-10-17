import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';


export const settings = defineType({
  type: 'document',
  name: 'settings',
  title: 'Settings',
  icon: CogIcon,
  fields: [
    defineField({
      type: 'defaultSeo',
      name: 'seo',
      title: 'Default SEO',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
