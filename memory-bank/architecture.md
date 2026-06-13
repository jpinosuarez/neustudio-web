# NeuStudio - Technical Architecture & Standards

## 1. The Tech Stack & Core Philosophy
- **Framework:** Astro (strictly Vanilla, SSG).
- **Styling:** Tailwind CSS (Mobile-first).
- **Logic:** TypeScript (Strict Mode ENABLED).
- **The "Zero-JS" Rule:** Zero client-side JavaScript by default. Third-party UI frameworks (React, Vue) are strictly FORBIDDEN. Use lightweight Vanilla JS scoped in Astro `<script>` tags for UI interactions (e.g., multi-step forms, cookie banners).

## 2. Design System & UI Constraints
- **Semantic Tokens:** NEVER use arbitrary colors. Strictly use `tailwind.config.mjs` tokens (`brand`, `dark`, `light`, `muted`, `accent`).
- **Typography:** `font-sans` (Inter) for body, `font-display` (Syne) + `tracking-tight` for headings.
- **Geometry:** `rounded-xl` (12px) for atomic elements, `rounded-3xl` (24px) for cards.
- **Touch Targets:** Minimum hit area of 48x48px on mobile for all interactive elements.

## 3. i18n & Content Layer
- **Zero Hardcoded Text:** All UI strings must use Astro's native i18n routing and `src/i18n/ui.ts`.
- **Strategic Portfolio Deactivation:** The `portfolio` content collection and Zod schemas exist and are fully valid, BUT are currently deactivated via 302 redirects in `src/pages/[lang]/portfolio.astro`. Do not reactivate until explicit real case studies are provided.

## 4. Lead Generation & Forms
- **Multi-Step Contact Form:** Located at `/${lang}/contacto`. Uses native HTML and Vanilla JS to toggle visibility between qualification steps.
- **Infrastructure:** Powered exclusively by Netlify Forms (`data-netlify="true"`). Hidden fields are used to pass multi-step data. NEVER use `mailto:` links.

## 5. SEO, Analytics & Compliance (DSGVO)
- **Legal Pages:** `/impressum` and `/privacy` use Tailwind Typography (`prose`). The actual legal texts are pasted manually to avoid LLM hallucinations.
- **Cookie Consent:** `<CookieBanner />` uses Vanilla JS and `localStorage`. It dispatches a `consentGranted` window event.
- **Tracking:** Google Tag Manager (GTM) is hardcoded in `<Head.astro>` and `<Layout.astro>` but relies on the consent event.
- **SEO Elements:** `@astrojs/sitemap` is integrated. `Head.astro` accepts dynamic `title`, `description`, and `ogImage` props for Open Graph / Twitter Cards. `404.astro` provides a localized fallback.