import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';
import { titleToken } from '@repo/sanity';


export const settings = defineType({
  type: 'document',
  name: 'settings',
  title: 'Settings',
  icon: CogIcon,
  fields: [
    defineField({
      type: 'seo',
      name: 'seo',
      title: 'Default SEO',
    }),
    defineField({
      type: 'string',
      name: 'titleFormat',
      description: `Page title format. Use ${titleToken} where the title goes, e.g. "${titleToken} | Site name"`,
      validation: rule => rule.custom((value?: string) =>
        !value || value.includes(titleToken) ?
          true :
          `Must include ${titleToken}`
      ),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
