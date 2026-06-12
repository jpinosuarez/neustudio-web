# SYSTEM CONTEXT & COPILOT INSTRUCTIONS: NeuStudio Web Project

## 1. PROJECT OVERVIEW
- **Project Name:** NeuStudio
- **Business Model:** Web as a Service (WaaS) agency targeting freelancers, independent professionals, and local businesses in Berlin (focus on Expat community).
- **Core Philosophy:** "Silent Tech" (Focus on business results, speed, and conversion, not tech jargon). High-performance, zero-maintenance, and legally compliant (DSGVO/GDPR) websites.
- **Language:** Multilingual (Spanish, English, German).

## 2. TECH STACK & GLOBAL RULES
- **Framework:** Astro (latest version, strictly Vanilla). 
- **Styling:** Tailwind CSS.
- **Language:** TypeScript (Strict Mode ENABLED).
- **UI Frameworks:** NEVER use React, Vue, Svelte, or Solid components unless explicitly requested by the user. Rely on Astro's `.astro` components, HTML, and Vanilla JavaScript.
- **Performance:** Zero client-side JavaScript by default. Achieve 100/100 Core Web Vitals.

## 3. STRICT i18n (INTERNATIONALIZATION) RULES
- **CRITICAL:** NEVER hardcode user-facing UI text (strings) in `.astro`, `.html`, or `.ts` files. 
- **Implementation:** ALWAYS use Astro's native i18n routing and TypeScript dictionaries.
- **Dictionaries Location:** Read and write translations to `src/i18n/ui.ts`.
- **Routing:** Pages must be structured under dynamic language routes (e.g., `src/pages/[lang]/index.astro`).

## 4. DESIGN SYSTEM & TAILWIND CONSTRAINTS
- **CRITICAL:** NEVER use arbitrary color classes in Tailwind (e.g., `text-[#1a2b3c]` or `bg-blue-500`).
- ALWAYS use the custom semantic tokens defined in `tailwind.config.mjs`:
  - `brand` (`text-neu-brand`, `bg-neu-brand`): Cobalt Blue (`#0047ff`) -> For primary interactions and brand authority.
  - `dark` (`text-neu-dark`, `bg-neu-dark`): Deep Charcoal (`#0f172a`) -> For headings and base text.
  - `light` (`bg-neu-light`): Light Ash (`#f2f4f7`) -> For application background and canvas.
  - `muted` (`text-neu-muted`, `border-neu-muted`): Slate Grey (`#475569`) -> For secondary text, subtitles, and borders.
  - `accent` (`text-neu-accent`, `bg-neu-accent`): Electric Coral (`#ff5a36`) -> ONLY for high-conversion triggers (CTAs, primary form submit buttons).
- **Typography:**
  - `font-sans` (Inter): For body text.
  - `font-display` (Syne): For headings and impactful UI elements.

  ## 4.1. STRICT UI & VISUAL STYLE GUIDE
- **Border Radius:** ALWAYS use `rounded-xl` (12px) for atomic UI components (buttons, input fields, badges). ALWAYS use `rounded-3xl` (24px) for cards, section containers, and layout blocks.
- **Borders & Separators:** Prefer thin dividers over heavy shadows. Cards on `bg-neu-light` must use `bg-white border border-neu-dark/5`.
- **Shadows:** Avoid default Tailwind shadows. ONLY use `shadow-sm` during active interaction states (e.g., `hover:shadow-sm hover:-translate-y-0.5 transition-all`).
- **Transparencies:** Navbars and sticky headers MUST use `bg-white/80 backdrop-blur-md` for a modern glassmorphism effect.
- **Headings Styling:** Typography `font-display` (Syne) MUST always be accompanied by `tracking-tight` for premium branding alignment.

## 4.2. STRICT MOBILE-FIRST & RESPONSIVE ARCHITECTURE
- **Mobile-First Rule:** ALWAYS write base Tailwind classes for mobile devices first. Use responsive breakpoints (`md:`, `lg:`) exclusively to progressively enhance and scale the layout for desktop screens.
- **Layout Scaling:** 
  - Mobile layouts must be strictly single-column (`flex-col` or `grid-cols-1`) with comfortable thumb-zone padding (minimum `px-4` or `px-6`).
  - Use `md:` or `lg:` to introduce multi-column grids (`md:grid-cols-2`, `lg:grid-cols-3`) and adjust alignment.
- **Typography Responsiveness:** Headlines must scale seamlessly to prevent text clipping on small screens. (e.g., use `text-3xl font-bold md:text-5xl lg:text-6xl`).
- **Touch Targets:** Interactive elements (buttons, mobile menu items, links) MUST have a minimum hit target area of 48x48px on mobile base styles to ensure optimal mobile UX.
- **Desktop Experience Guardrail:** Ensure that when layouts scale to desktop, maximum widths are strictly enforced (`max-w-7xl mx-auto`) to prevent content from stretching infinitely on ultra-wide monitors.

## 5. COMPONENT ARCHITECTURE & RESPONSIBILITIES
Follow this strict directory structure inside `src/components/`:
- `ui/`: Atomic, reusable, stateless components (e.g., `<Button />`, `<Input />`). These NEVER contain business logic or fixed layouts.
- `sections/`: Full-width page blocks (e.g., `<Hero />`, `<PricingGrid />`, `<ContactForm />`). These compose `ui/` components.
- `layout/`: Global structural components (e.g., `<Head.astro>`, `<Header />`, `<Footer />`).

## 6. DATA MODELING (CONTENT COLLECTIONS)
- Portfolio cases, services, and blog posts MUST be managed via Astro Content Collections (`src/content/`).
- ALWAYS define strict Zod schemas in `src/content/config.ts` for any new collection.
- Enforce required fields (title, date, client, metrics, image) to prevent build errors.

## 7. FORMS, LEAD CAPTURE & INTEGRATIONS
- **Form Technology:** Use native HTML forms with Netlify Forms integration (ALWAYS include `data-netlify="true"` on the `<form>` tag).
- **Lead Qualification:** Forms must include qualifying fields (e.g., "What is your main challenge?"). 
- NEVER use `mailto:` links for contact actions.

## 8. COMPLIANCE & SEO (DSGVO/GDPR)
- **Analytics:** NEVER inject tracking scripts (GA4, Meta Pixel) directly into the code. The ONLY allowed script injection in `<Head.astro>` is Google Tag Manager (GTM).
- **Consent:** Assume a strict Google Consent Mode v2 implementation. 
- **Legal Pages:** The `<Footer />` MUST ALWAYS include links to the `Impressum` (Legal Notice) and `Privacy Policy`.
- **Images:** ALWAYS use Astro's native `<Image />` component for automatic WebP/AVIF optimization and lazy loading.