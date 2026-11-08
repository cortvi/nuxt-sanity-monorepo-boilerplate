import { defineField } from 'sanity';


/** Registered by `internationalizedArray` as
 * `internationalizedArrayString` and `internationalizedArrayText`
**/
export const localeFieldTypes = [
  'string',
  defineField({
    type: 'text',
    name: 'text',
    rows: 3,
  }),
];
