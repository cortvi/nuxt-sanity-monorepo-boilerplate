import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from './studio/env';


export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    autoUpdates: true,
  },
  schemaExtraction: {
    enabled: true,
  },
  typegen: {
    enabled: true,
    path: '../web/app/**/*.{ts,vue}',
    generates: '../web/app/types/sanity.ts',
  },
});
