import { defineField, defineType } from 'sanity';
import { TranslateIcon } from '@sanity/icons/Translate';
import { locales } from '@repo/sanity';
import { LocaleField } from '../../components/locale-field';


export const localeString = defineType({
  type: 'object',
  name: 'localeString',
  title: 'Localized string',
  icon: TranslateIcon,
  options: { columns: 1 },
  fields: locales.map(locale => defineField({
    type: 'string',
    name: locale.id,
    components: { field: LocaleField },
  })),
});

export const localeText = defineType({
  type: 'object',
  name: 'localeText',
  title: 'Localized text',
  icon: TranslateIcon,
  options: { columns: 1 },
  fields: locales.map(locale => defineField({
    type: 'text',
    name: locale.id,
    rows: 3,
    components: { field: LocaleField },
  })),
});
