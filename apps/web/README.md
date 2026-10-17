# Nuxt app

Opinionated [Nuxt 4](https://nuxt.com) starter. It ships with GSAP scroll animation, page transitions, i18n scaffolding, SCSS tokens and helpers, Sanity content wiring and a small set of reusable components, but leaves key project-specific choices open as inline `TODO` comments.

Setup, environment variables and Sanity details live in the [root README](../../README.md). Use this template as a base, then work through the checklist below before building features.

## Quick start

From the repo root, after following the root quick start: `pnpm dev:web`. The dev server runs at [http://localhost:3000](http://localhost:3000).

## Scripts

Run with `pnpm --filter web <script>`, or from this folder with `pnpm <script>`.

- `dev`: start the development server
- `build`: production build
- `preview`: preview the production build locally
- `generate`: static site generation
- `lint` / `lint:fix`: run ESLint
- `typecheck`: run Nuxt type checking

## What's included

- **Nuxt modules**: `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/hints`, `@nuxt/icon`, `@nuxtjs/i18n`, `@nuxtjs/sanity`, `@nuxtjs/sitemap`
- **Sanity**: GROQ queries in `app/queries/`, generated types in `app/types/sanity.ts`, `useSanitySeo` for SEO data, and Sanity image support in `<MediaAsset>`
- **GSAP**: ScrollTrigger and ScrollSmoother (client plugin and composables; ScrollTo and other addons stubbed for opt-in)
- **Page transitions**: global middleware with loader and site state
- **SCSS**: variables, typography mixins, breakpoints, and component styles with auto-imported partials
- **Icons**: local custom collection under `app/assets/icon` (prefix `i`; add SVGs to the folder)
- **Reveal components**: text/chars/lines/underline animation helpers
- **Composables**: viewport, scroll smoother, site state, GSAP helpers, page meta, and utilities

## Project structure

```
app/
├── assets/scss/
│   ├── app/             # Global styles, tokens, typography
│   └── components/      # Per-component styles
├── components/          # Layout, reveal, media and text components
├── composables/         # Shared Vue composables (incl. page-meta, sanity-seo)
├── i18n/                # Locale messages and i18n config
├── layouts/             # Default layout (ScrollSmoother wrapper)
├── middleware/          # Trailing-slash removal, page transitions
├── pages/               # Routes (index = home)
├── plugins/             # GSAP client plugin
├── queries/             # GROQ queries (defineQuery)
├── types/               # Shared TypeScript types (sanity.ts is generated)
└── utils/               # Pure helpers
public/                  # Static assets (favicons, OG thumbnail, …)
```

## Before you start a new project

Search the repo for `TODO` and resolve each item. They mark decisions that vary per client or site.

### 1. Design tokens: `app/assets/scss/app/_vars.scss`

Define CSS custom properties: brand colors, spacing, animation curves, layout breakpoints, etc. The file currently has `TODO` placeholders for default text and background colors.

### 2. Typography: `_typo.scss` and `index.scss`

- Add font-family mixins and size/weight mixins in `_typo.scss`
- Populate the `@each` style lists in `index.scss` to generate utility classes (e.g. `.text-h1`, `.text-body-1-regular`; weight classes are already wired)
- A **fluid rem base** is already enabled (`1px` at design width, scaling above `screen-lg`), so unstyled text renders at 1px until typography is set; adjust or remove it if the project uses a different sizing system

### 3. Default body class: `nuxt.config.ts`

Set `app.head.bodyAttrs.class` to the project's default typography utility (e.g. `text-body-1-regular`).

### 4. Fonts: `nuxt.config.ts`

Uncomment and configure the `@nuxt/fonts` block: font families, weights, preload, and disable unused providers.

### 5. Scrollbar styling: `app/assets/scss/app/_scrollbars.scss`

Choose custom scrollbar styles or keep the `.no-scrollbar` helper only.

### 6. i18n: `nuxt.config.ts`, `app/i18n/`, `app/types/i18n/`

- Review `i18n` in `nuxt.config.ts`: it ships with the `prefix` strategy; locales (`en`, `es`) and the default locale come from `packages/sanity/locales.ts`
- Add locale files under `app/i18n/locales/` (registered in `app/i18n/i18n.config.ts`) and extend the `LocaleTexts` type in `app/types/i18n/app.ts`
- To add or remove a locale, follow the steps in the [root README](../../README.md#localization)

### 7. Inline styles: `nuxt.config.ts`

Review `features.inlineStyles`: the predicate decides which component styles are inlined for faster first paint. Adjust the path/name checks for your component set.

### 8. GSAP plugins: `app/plugins/gsap.client.ts`

Register only the GSAP addons the project needs (ScrollTo, DrawSVG, CustomEase, Draggable, Flip, …). ScrollSmoother settings (`smooth`, `effects`, etc.) can be tuned here too.

### 9. SEO: `app/composables/page-meta.ts`

`app.vue` (and `error.vue`, which replaces it on errors) calls `usePageMeta`: it sets the default SEO from the Sanity `settings` document plus the site-wide tags. Pages call `usePageMeta` with only their own values, so anything they leave empty falls back to those defaults. Set the title tail, default OG image, meta colors and favicons in `usePageMeta`.

### 10. Public assets: `public/`

Add favicons under `public/favicon/` and an OG thumbnail at `public/thumbnail.jpg` (both referenced by `usePageMeta`).

### 11. Error page: `app/error.vue`

Replace the minimal status-code placeholder with a styled error view.

### 12. Locale copy: `app/i18n/locales/`

Replace placeholder strings and expand the `LocaleTexts` type as you add keys.

After the checklist, add icons under `app/assets/icon` and start building pages under `app/pages/`, adding a query in `app/queries/` for each new Sanity-backed page.
