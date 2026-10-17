import type { StructureBuilder, StructureResolver } from 'sanity/structure';
import { CogIcon } from '@sanity/icons/Cog';
import { HomeIcon } from '@sanity/icons/Home';
import { singletonTypes } from '../schemas';


const singleton = (
  S: StructureBuilder,
  type: string,
  title: string,
  icon: typeof CogIcon
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'home', 'Home', HomeIcon),
      S.divider(),
      singleton(S, 'settings', 'Settings', CogIcon),
      ...S.documentTypeListItems().filter(item =>
        !singletonTypes.includes(item.getId()!)
      ),
    ]);
