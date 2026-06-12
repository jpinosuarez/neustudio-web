# NeuStudio - Technical Architecture & Standards

## 1. The Tech Stack & Core Philosophy
- **Framework:** Astro (strictly Vanilla, SSG).
- **Styling:** Tailwind CSS (Mobile-first).
- **Logic:** TypeScript (Strict Mode ENABLED).
- **The "Zero-JS" Rule:** Zero client-side JavaScript by default. Third-party UI frameworks (React, Vue) are strictly FORBIDDEN. Use Vanilla JS exclusively for simple UI toggles.

## 2. Design System & UI Constraints
- **Semantic Tokens:** NEVER use arbitrary colors. Strictly use `tailwind.config.mjs` tokens:
  - `brand`: `#0047ff` (Primary interactions).
  - `dark`: `#0f172a` (Headings/Base text).
  - `light`: `#f2f4f7` (Backgrounds/Canvas).
  - `muted`: `#475569` (Secondary text/Borders).
  - `accent`: `#ff5a36` (ONLY for high-conversion CTAs).
- **Typography:** `font-sans` (Inter) for body, `font-display` (Syne) + `tracking-tight` for headings.
- **Geometry & UI:**
  - `rounded-xl` (12px) for atomic elements (buttons, inputs).
  - `rounded-3xl` (24px) for cards and sections.
  - Glassmorphism (`bg-white/80 backdrop-blur-md`) for sticky navbars.

## 3. Responsive & Mobile-First Architecture
- Mobile layouts must be strictly single-column with comfortable thumb-zone padding (`px-4`).
- Touch Targets: Minimum hit area of 48x48px on mobile for all interactive elements.
- Desktop Scaling: Enforce `max-w-7xl mx-auto` to prevent infinite stretching on wide monitors.

## 4. Component Structure
- `src/components/ui/`: Atomic, reusable, stateless components. No business logic.
- `src/components/sections/`: Full-width page blocks composing UI components.
- `src/components/layout/`: Global structural wrappers.

## 5. i18n & Data Modeling
- **Zero Hardcoded Text:** All UI strings must use Astro's native i18n routing and `src/i18n/ui.ts`.
- **Content Collections:** Portfolio and services MUST use `src/content/` with strict Zod schemas (`config.ts`) enforcing required fields (title, client, metrics).

## 6. Forms & Compliance (DSGVO)
- **Lead Capture:** Use native HTML forms with Netlify Forms (`data-netlify="true"`). NEVER use `mailto:` links.
- **Analytics:** ONLY Google Tag Manager (GTM) is allowed in `<Head.astro>`. Direct GA4/Meta Pixel scripts are forbidden. Assume strict Google Consent Mode v2.
- **Assets:** All fonts hosted locally. Images MUST use Astro's native `<Image />` component.