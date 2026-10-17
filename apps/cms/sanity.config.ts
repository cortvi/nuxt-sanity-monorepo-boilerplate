import './studio/style.scss';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { languageFilter } from '@sanity/language-filter';
import { locales } from '@repo/sanity';
import { dataset, projectId } from './studio/env';
import { structure } from './studio/structure';
import { schemaTypes, singletonActions, singletonTypes } from './schemas';


export default defineConfig({
  name: 'default',
  /* TODO: Set studio title */
  title: 'Nuxt boilerplate',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    languageFilter({
      supportedLanguages: locales.map(({ id, title }) => ({ id, title })),
      /* Required: when omitted, the plugin shows the button but never filters fields */
      documentTypes: schemaTypes
        .filter(({ type }) => type === 'document')
        .map(({ name }) => name),
    }),
    visionTool(),
  ],
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
