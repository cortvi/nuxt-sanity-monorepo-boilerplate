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
    // Singletons can't be created:
    templates: templates =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  document: {
    // Documents are only created from their lists, not from the global "Create" button:
    newDocumentOptions: (prev, { creationContext }) => creationContext.type === 'global' ? [] : prev,
    // Limit actions to singleton types:
    actions: (actions, { schemaType }) => singletonTypes.includes(schemaType) ?
      actions.filter(({ action }) => action && singletonActions.has(action)) :
      actions,
  },
});
