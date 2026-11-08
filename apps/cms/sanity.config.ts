import './studio/style.scss';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { locales, siteName } from '@repo/sanity';
import { dataset, projectId } from './studio/env';
import { structure } from './studio/structure';
import { schemaTypes, singletonActions, singletonTypes } from './schemas';
import { localeFieldTypes } from './schemas/objects/locale';
import { FormInput } from './components/form-input';


export default defineConfig({
  name: 'default',
  title: siteName,
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    internationalizedArray({
      languages: locales.map(({ id, title }) => ({ id, title })),
      defaultLanguages: locales.map(({ id }) => id),
      fieldTypes: localeFieldTypes,
      languageFilter: {
        documentTypes: schemaTypes
          .filter(({ type }) => type === 'document')
          .map(({ name }) => name),
      },
    }),
    visionTool(),
  ],
  form: {
    components: { input: FormInput },
  },
  schema: {
    types: schemaTypes,
    // Disable template creation:
    templates: () => [],
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.includes(schemaType) ?
        actions.filter(({ action }) => action && singletonActions.has(action)) :
        actions,
  },
});
