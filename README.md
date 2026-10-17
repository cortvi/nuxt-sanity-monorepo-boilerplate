# Nuxt + Sanity boilerplate

Turborepo monorepo for North projects that use [Nuxt 4](https://nuxt.com) and [Sanity](https://www.sanity.io). The Nuxt app is opinionated and wired to a standalone Sanity Studio with TypeGen.

The Sanity side is optional: if a project only needs the Nuxt template, follow [Using without Sanity](#using-without-sanity) to turn this back into a single-app repo.

## Requirements

- Node.js **24** (see `.nvmrc`)
- pnpm **12**

## Structure

```
apps/
├── web/                 # Nuxt app (see apps/web/README.md for the template checklist)
└── cms/                 # Sanity Studio
    ├── components/      # Custom Studio inputs (boolean, SEO title preview, locale field)
    ├── schemas/
    │   ├── documents/   # settings, home
    │   └── objects/     # seo, defaultSeo, localized types
    ├── studio/
    │   └── structure.ts # Studio sidebar (singletons)
    └── schema.json      # Extracted schema (generated, committed)
packages/
├── eslint-config/       # Shared stylistic rules used by both apps
└── sanity/              # Shared Sanity config (@repo/sanity), see below
```

### Shared Sanity config: `packages/sanity`

`@repo/sanity` is TypeScript source consumed directly by both apps (Nuxt/Vite, Nitro and the Sanity CLI all transpile it, so there's no build step). It holds static config and pure helpers only; environment variables stay in each app. `index.ts` re-exports one file per concern:

- `api.ts`: `apiVersion`, used by the Nuxt module and Studio clients
- `locales.ts`: `locales` (`id`, `title`, `language`) and `defaultLocale`, the single source for Nuxt i18n, the Studio language filter and the localized schema types
- `seo.ts`: `siteName`, `titleToken`, `fallbackTitleFormat` and `formatTitle`, shared by the web app and the Studio title preview (see [SEO](#seo))

Queries can interpolate its constants: TypeGen resolves the imports and inlines them. Keep interpolated values as plain string literals or template literals, since TypeGen can't evaluate function calls or member access.

## Quick start

1. Create a Sanity project at [sanity.io/manage](https://www.sanity.io/manage) and note its project ID.
2. Install dependencies: `pnpm install`
3. Copy the env files and fill in the project ID (see [Environment](#environment)):

```bash
cp apps/web/.env.example apps/web/.env
cp apps/cms/.env.example apps/cms/.env
```

4. Create the `development` dataset used by the examples (skip if you point the env files at an existing dataset)
5. Allow the local apps to call Sanity from the browser:

```bash
pnpm --filter cms exec sanity cors add http://localhost:3000
```

6. Run both apps: `pnpm dev`

The web app runs at [http://localhost:3000](http://localhost:3000) (redirects to `/en`, see [Localization](#localization)) and the Studio at [http://localhost:3333](http://localhost:3333). Create and publish the **Settings** and **Home** documents in the Studio.

## Scripts

Run from the root; Turborepo runs the task in every app that defines it.

- `pnpm dev`: start the web and Studio dev servers
- `pnpm dev:web` / `pnpm dev:cms`: start a single app
- `pnpm build`: production build of both apps
- `pnpm generate`: static site generation (web)
- `pnpm lint` / `pnpm lint:fix`: run ESLint
- `pnpm typecheck`: type-check both apps
- `pnpm typegen`: extract the Studio schema and regenerate GROQ types

Use `pnpm --filter <web|cms> <script>` to run anything else in one app (e.g. `pnpm --filter cms run deploy`; `run` is required because `deploy` is also a built-in pnpm command).

## Content model

- `settings` (singleton): default SEO (`defaultSeo`), queried in `app.vue` and used for any value a page leaves empty
- `home` (singleton): localized title and page SEO (`seo`), `pages/index.vue`
- `seo` (object): localized title (with an "Ignore site format" toggle) and description, and a share image (cropped to 1200×630, respecting the editor's crop and hotspot)
- `defaultSeo` (object): `seo` plus the site title format

`<MediaAsset>` takes a Sanity image object as `source` and builds its URLs with `@sanity/image-url` (respecting crop and hotspot); pass the asset's LQIP (`asset->metadata.lqip`) as `blurUpThumb` for the blur-up placeholder.

Singletons are locked to a fixed document ID (`settings`, `home`) through `structure.ts` and can't be created from the "new document" menu or deleted from the Studio.

Custom Studio inputs live in `apps/cms/components/`:

- `FormInput`: registered Studio-wide in `sanity.config.ts`, renders every boolean field with `BooleanInput` (compact, description in a tooltip)
- `SeoTitleInput`: SEO title fields plus a live preview of the final title per locale, using the `settings` format when the page doesn't set one
- `LocaleField`: shows each locale subfield's code as a badge instead of the default header

## Localization

Locales are defined once in `packages/sanity/locales.ts` (`en` and `es`). Locales are independent: content never falls back to another locale, and `defaultLocale` (`en`) is only the locale `/` redirects to when the browser language isn't supported.

- **Web**: `@nuxtjs/i18n` uses the `prefix` strategy, so every route carries the locale (`/en`, `/es/<path>`) and `/` redirects to the detected locale. UI strings live in `apps/web/app/i18n/locales/<code>.ts` (typed with `LocaleTexts`) and are registered in `app/i18n/i18n.config.ts`.
- **Studio**: content uses field-level localization. `schemas/objects/locale.ts` generates `localeString` and `localeText` objects with one field per locale, and `@sanity/language-filter` adds a "Filter languages" button to show only the locales an editor works on. A localized field is either required in every locale (`validation: requiredInAllLocales`) or optional in every locale.
- **Queries**: every query takes a `$locale` param and projects only that locale's value (`null` when empty), so components receive plain strings. Localized fields are written as `locale::pick(field).value`, a GROQ function declared in `LOCALE_FN` (`apps/web/app/queries/utils.ts`) that every query using it must start with. It holds one `select` branch per locale because TypeGen can't type `field[$locale]`.

To add a locale:

1. Add it to `locales` in `packages/sanity/locales.ts`
2. Add a `select` branch for it to `LOCALE_FN` in `apps/web/app/queries/utils.ts`
3. Add `apps/web/app/i18n/locales/<code>.ts` and register it in `app/i18n/i18n.config.ts`
4. Run `pnpm typegen`

## Queries and types

GROQ queries live in `apps/web/app/queries/` and are wrapped in `defineQuery` (imported from `groq`) so TypeGen picks them up. Reusable pieces live in `fragments.ts` as plain `/* groq */` strings (not `groq`-tagged, or TypeGen would parse them as queries). Each query needs a unique variable name; its result type is generated as `<NAME>_RESULT` in `apps/web/app/types/sanity.ts`, which is committed so the web app type-checks without running the Studio.

Types regenerate automatically while the Studio dev server runs. Run `pnpm typegen` after changing schemas or queries without it.

## SEO

`app.vue` queries `settings` and stores its SEO as the defaults; pages call `usePageMeta` with only their own values, and anything they leave empty falls back to those defaults. In both cases, pass the `SEO_FRAGMENT` result through `composeSanitySeo` (`apps/web/app/utils/sanity.ts`), which builds the share image URL, then hand it to `usePageMeta`.

Titles go through `formatTitle` (`packages/sanity/seo.ts`), so the site and the Studio preview render them the same way:

- The format is the `settings` title format (e.g. `{{title}} | Site`, must include the `{{title}}` token), or `fallbackTitleFormat` when empty
- A page's "Ignore site format" toggle uses its title as-is; when unset, it inherits the `settings` toggle
- A page without a title (and no default title) gets `siteName`

`siteName` is also the Nuxt site name and the Studio title, so set it and `fallbackTitleFormat` per project.

## Environment

`apps/web/.env`:

- `NUXT_SITE_URL` (required): public site URL, used for the default OG image, i18n SEO links (`baseUrl`) and the sitemap
- `NUXT_SANITY_PROJECT_ID` (required): Sanity project ID
- `NUXT_SANITY_DATASET`: Sanity dataset (`development` in the example)

These are read in `nuxt.config.ts` when the app builds (or the dev server starts), so set them before building and rebuild after changing them; they are not runtime-config overrides.

`apps/cms/.env`:

- `SANITY_STUDIO_PROJECT_ID`: Sanity project ID
- `SANITY_STUDIO_DATASET`: Sanity dataset, same as the web app

`SANITY_STUDIO_*` values are bundled into the Studio, so never put secrets in them.

## Deployment

- **Web**: see the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment). Set the `NUXT_`* variables on the host and add the production URL to the Sanity CORS origins.
- **Studio**: `pnpm --filter cms run deploy` hosts it on `*.sanity.studio`, or deploy `apps/cms/dist` anywhere static after `pnpm build`.

## Using without Sanity

To start a Nuxt-only project, remove the Studio and the Sanity wiring, then flatten the repo back to a single app.

### 1. Remove Sanity

- Delete `apps/cms/` and `packages/sanity/`
- Run `pnpm --filter web remove @nuxtjs/sanity @repo/sanity @sanity/client @sanity/image-url @sanity/browserslist-config groq`
- In `apps/web/nuxt.config.ts`, delete the `@repo/sanity` import, the `NUXT_SANITY_PROJECT_ID` check, the `'@nuxtjs/sanity'` module and the `sanity` block, write the site `name` inline and the i18n `locales` and `defaultLocale` inline (e.g. `locales: [{ code: 'en', name: 'English', language: 'en-GB' }]`)
- In `apps/web/app/composables/page-meta.ts`, replace the `formatTitle` import with a local title format (e.g. `` `${title} — Site` ``) and drop `titleFormat` and `ignoreFormat` (also from `apps/web/app/types/seo.ts`) if the project doesn't need them
- Delete `apps/web/app/queries/`, `apps/web/app/types/sanity.ts` and `apps/web/app/utils/sanity.ts`
- In `apps/web/app/components/media-asset.vue`, remove the Sanity branch of `toImageUrl` (the `isSanityImageUrl`/`toSanityImageUrl` lines, `source` from the destructuring and from the missing-URL check); in `apps/web/app/types/components/media-asset.ts`, remove `source` and the `@sanity/image-url` import. DatoCMS and plain URLs keep working
- In `apps/web/app/app.vue` and `apps/web/app/pages/index.vue`, remove the query and pass static data to `usePageMeta`
- Remove the `NUXT_SANITY_*` lines from `apps/web/.env.example` and `apps/web/.env`, and the `app/types/sanity.ts` ignore from `apps/web/eslint.config.mjs`

### 2. Flatten to a single repo

- Move everything inside `apps/web/` (including `.env` and `.env.example`) to the root, replacing the root `package.json` and `README.md`
- In `eslint.config.mjs`, replace `...baseConfig` with the contents of `packages/eslint-config/index.mjs`, then run `pnpm add -D @stylistic/eslint-plugin` and remove `@repo/eslint-config` from `package.json`
- Delete `apps/`, `packages/` and `turbo.json`
- Remove the `packages` list from `pnpm-workspace.yaml`, and the Sanity/Turborepo entries from `.gitignore`
- Delete `node_modules` and run `pnpm install`
