# Nuxt boilerplate

Opinionated [Nuxt 4](https://nuxt.com) starter for North projects. It ships with GSAP scroll animation, page transitions, i18n scaffolding, SCSS design tokens, and a small set of reusable components — but leaves key project-specific choices open as inline `TODO` comments.

Use this template as a base, then work through the checklist below before building features.

## Requirements

- Node.js **≥ 22**
- pnpm **≥ 10**

## Quick start

```bash
pnpm install
cp .env.example .env   # set NUXT_SITE_URL (SEO, OG image, i18n)
pnpm dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build locally |
| `pnpm generate` | Static site generation |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm typecheck` | Run Nuxt type checking |

## What's included

- **Nuxt modules** — `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/hints`, `@nuxt/icon`, `@nuxtjs/i18n`
- **GSAP** — ScrollTrigger and ScrollSmoother (client plugin and composables; ScrollTo and other addons stubbed for opt-in)
- **Page transitions** — global middleware with loader and site state
- **SCSS** — variables, typography mixins, breakpoints, and component styles with auto-imported partials
- **Icons** — local custom collection under `app/assets/icon` (prefix `i`; add SVGs to the folder)
- **Reveal components** — text/chars/lines/underline animation helpers
- **Composables** — viewport, scroll smoother, site state, GSAP helpers, page meta, and utilities

## Project structure

```
app/
├── assets/scss/
│   ├── app/             # Global styles, tokens, typography
│   └── components/      # Per-component styles
├── components/          # Layout, reveal, media, text components
├── composables/         # Shared Vue composables (incl. page-meta)
├── i18n/                # Locale messages and i18n config
├── layouts/             # Default layout (ScrollSmoother wrapper)
├── middleware/          # Trailing-slash removal, page transitions
├── pages/               # Routes
├── plugins/             # GSAP client plugin
├── types/               # Shared TypeScript types
└── utils/               # Pure helpers
public/                  # Static assets (favicons, OG thumbnail, …)
```

## Before you start a new project

Search the repo for `TODO` and resolve each item. They mark decisions that vary per client or site.

### 1. Design tokens — `app/assets/scss/app/_vars.scss`

Define CSS custom properties: brand colors, spacing, animation curves, layout breakpoints, etc. The file currently has `TODO` placeholders for default text and background colors.

### 2. Typography — `_typo.scss` and `index.scss`

- Add font-family mixins and size/weight mixins in `_typo.scss`
- Populate the `@each` style lists in `index.scss` to generate utility classes (e.g. `.text-h1`, `.text-body-1-regular`; weight classes are already wired)
- A **fluid rem base** is already enabled (`1px` at design width, scaling above `screen-lg`) — adjust or remove if your project uses a different sizing system

### 3. Default body class — `nuxt.config.ts`

Set `app.head.bodyAttrs.class` to the project's default typography utility (e.g. `text-body-1-regular`).

### 4. Fonts — `nuxt.config.ts`

Uncomment and configure the `@nuxt/fonts` block: font families, weights, preload, and disable unused providers.

### 5. Scrollbar styling — `app/assets/scss/app/_scrollbars.scss`

Choose custom scrollbar styles or keep the `.no-scrollbar` helper only.

### 6. i18n — `nuxt.config.ts`, `app/i18n/`, `app/types/i18n/`

- Uncomment and configure `i18n` in `nuxt.config.ts`: strategy, locales, `defaultLocale`, `baseUrl` (uses `NUXT_SITE_URL`)
- Add locale files under `app/i18n/locales/`
- Extend the `LocaleTexts` type in `app/types/i18n/app.ts`
- Set `NUXT_SITE_URL` in `.env`

### 7. Inline styles — `nuxt.config.ts`

Review `features.inlineStyles`: the predicate decides which component styles are inlined for faster first paint. Adjust the path/name checks for your component set.

### 8. GSAP plugins — `app/plugins/gsap.client.ts`

Register only the GSAP addons the project needs (ScrollTo, DrawSVG, CustomEase, Draggable, Flip, …). ScrollSmoother settings (`smooth`, `effects`, etc.) can be tuned here too.

### 9. Default SEO — `app/app.vue`

Fill in `usePageMeta` defaults: title, description, and OG image path.

### 10. Public assets — `public/`

Add favicons under `public/favicon/` and an OG thumbnail at `public/thumbnail.png` (referenced by `usePageMeta` and `app/composables/page-meta.ts`).

### 11. Error page — `app/error.vue`

Replace the minimal status-code placeholder with a styled error view.

### 12. Locale copy — `app/i18n/locales/en.ts`

Replace placeholder strings and expand the `LocaleTexts` type as you add keys.

---

After the checklist, rename the package in `package.json`, add icons under `app/assets/icon`, and start building pages under `app/pages/`.

## Environment

| Variable | Description |
| --- | --- |
| `NUXT_SITE_URL` | Public site URL — used for OG image URLs, i18n SEO (`baseUrl`), and canonical links |

See `.env.example`.

## Deployment

See the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment).
