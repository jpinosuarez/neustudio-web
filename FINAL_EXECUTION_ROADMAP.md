# NeuStudio Sprint 1 - Final Execution Roadmap

**TO:** DeepSeek V4 (Phase 3 Coding Agent)  
**FROM:** Cline (Phase 2 Technical Project Manager)  
**DATE:** 2023-10-27  
**PRIORITY:** Critical  
**OBJECTIVE:** Implement Strict Dark Mode, Pure-CSS Hover Grid, DSGVO Compliance, and i18n Migration

---

## EXECUTION PROTOCOL

You are the coding agent responsible for implementing the changes specified in this roadmap. You will NOT have access to the original design system documents. This roadmap is your ONLY source of truth. Execute each phase sequentially. Mark each checkbox as complete after implementation.

**CRITICAL RULES:**
- All background colors must use `bg-neu-dark` (Prussian Blue `#0f172a`).
- All text colors must use `text-neu-light` (Platinum `#f2f4f7`).
- NEVER use `bg-white`, `bg-neu-light`, or `text-neu-dark` unless explicitly instructed.
- Replace all static shadows (`shadow-sm`, `shadow-md`) with `border border-white/10`.
- All user-facing copy must be consumed via the `t()` function from `src/i18n/utils`.

---

## PHASE 1: Foundation & Global Configuration

### Task 1.1: Update Tailwind Configuration
**File:** `tailwind.config.mjs`

- [ ] Add the **Neon Cyan** color token to the `theme.extend.colors.neu` object.

**Exact Change Required:**
```javascript
colors: {
  neu: {
    brand: '#0047ff',
    dark: '#0f172a',
    light: '#f2f4f7',
    muted: '#475569',
    accent: '#ff5a36',
    interactive: '#d946ef',
    'interactive-cyan': '#22d3ee', // ADD THIS LINE
  },
},
```

### Task 1.2: Enforce Dark Mode & Mobile Safe Areas in Layout
**File:** `src/layouts/Layout.astro`

- [ ] Replace the `<body>` tag's class attribute to enforce strict dark mode and mobile safe area insets.

**Current Code (Line 21):**
```html
<body class="bg-grid-orb bg-neu-light font-sans text-neu-dark">
```

**Replace With:**
```html
<body class="bg-grid-orb bg-neu-dark font-sans text-neu-light pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
```

### Task 1.3: Remove DSGVO-Violating GTM Noscript Block
**File:** `src/layouts/Layout.astro`

- [ ] Delete the entire Google Tag Manager `<noscript>` block (Lines 22-25).

**Code to DELETE:**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

---

## PHASE 2: Hero Section & Hover Grid Implementation

### Task 2.1: Inject the Pure-CSS Hover Grid
**File:** `src/components/sections/Hero.astro`

- [ ] Add the `relative` class to the main `<section>` tag to establish a positioning context.

**Current Code (Line 8):**
```html
<section class="px-4 py-16 md:px-6 lg:py-24 max-w-7xl mx-auto flex flex-col items-center text-center">
```

**Replace With:**
```html
<section class="relative px-4 py-16 md:px-6 lg:py-24 max-w-7xl mx-auto flex flex-col items-center text-center">
```

- [ ] Insert the Hover Grid code IMMEDIATELY AFTER the opening `<section>` tag and BEFORE the content `<div>`.

**Exact Code to INSERT (After Line 8):**
```html
<!-- Start of Hover Grid -->
<div class="absolute inset-0 z-0 h-full w-full overflow-hidden">
  <div class="grid h-full w-full grid-cols-10 grid-rows-10">
    {Array.from({ length: 100 }).map(() => (
      <div class="h-full w-full border border-white/5 transition-colors duration-1000 ease-out hover:bg-neu-interactive/20 hover:duration-0" />
    ))}
  </div>
</div>
<!-- End of Hover Grid -->
```

- [ ] Add the `relative z-10` classes to the main content `<div>` to ensure it sits above the grid.

**Current Code (Line 9):**
```html
<div class="max-w-4xl">
```

**Replace With:**
```html
<div class="relative z-10 max-w-4xl">
```

### Task 2.2: Replace the Trust Badge with Dark Mode Authority Pill
**File:** `src/components/sections/Hero.astro`

- [ ] Delete the existing badge code (Lines 10-13).

**Code to DELETE:**
```html
<div class="inline-flex items-center gap-2 rounded-full border border-neu-dark/5 bg-white px-4 py-1.5 text-sm font-medium text-neu-muted mb-6">
  <span class="flex h-2 w-2 rounded-full bg-neu-brand"></span>
  <span>{t('hero.badge')}</span>
</div>
```

- [ ] Replace with a new Dark Mode authority pill that uses `border-white/10` and business-friendly copy.

**Exact Code to INSERT (Replace Lines 10-13):**
```html
<div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-neu-light mb-6">
  <span class="flex h-2 w-2 rounded-full bg-neu-brand"></span>
  <span>{t('hero.authorityBadge')}</span>
</div>
```

- [ ] Add the new i18n key `hero.authorityBadge` to `src/i18n/ui.ts` with business-friendly copy (e.g., "A website that wins clients").

**File:** `src/i18n/ui.ts`

**Add to the `hero` section:**
```typescript
authorityBadge: {
  es: 'Una web que atrae clientes',
  en: 'A website that wins clients',
  de: 'Eine Website, die Kunden gewinnt',
},
```

### Task 2.3: Apply Dark Mode to Hero Text Elements
**File:** `src/components/sections/Hero.astro`

- [ ] Change the headline color from `text-neu-dark` to `text-neu-light` (Line 14).

**Current Code:**
```html
<h1 class="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neu-dark mt-6 leading-tight">
```

**Replace With:**
```html
<h1 class="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neu-light mt-6 leading-tight">
```

- [ ] The subtitle and trust signal already use `text-neu-muted`, which is acceptable for secondary text in dark mode. No changes required for Lines 17 and 36.

---

## PHASE 3: Component Dark Mode & i18n Migration

### Task 3.1: Refactor Pricing Section to Dark Mode
**File:** `src/components/sections/Pricing.astro`

- [ ] Change the section background from `bg-white` to `bg-neu-dark` (Line 42).

**Current Code:**
```html
<section class="bg-white py-24">
```

**Replace With:**
```html
<section class="bg-neu-dark py-24">
```

- [ ] Update the badge background to use dark mode depth (Line 45).

**Current Code:**
```html
<span class="inline-flex min-h-12 items-center rounded-xl border border-neu-dark/5 bg-neu-light px-4 text-sm font-semibold text-neu-muted">
```

**Replace With:**
```html
<span class="inline-flex min-h-12 items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 text-sm font-semibold text-neu-light">
```

- [ ] Change the section title color from `text-neu-dark` to `text-neu-light` (Line 48).

**Current Code:**
```html
<h2 class="mt-5 font-display text-4xl font-bold tracking-tight text-neu-dark md:text-5xl">
```

**Replace With:**
```html
<h2 class="mt-5 font-display text-4xl font-bold tracking-tight text-neu-light md:text-5xl">
```

- [ ] Update the pricing card backgrounds and borders to use dark mode depth (Lines 56-60).

**Current Code:**
```html
class={`flex flex-col h-full rounded-3xl border p-8 text-center ${
  tier.variant === 'accent'
    ? 'border-neu-accent/20 bg-neu-accent/5 ring-2 ring-neu-accent/20'
    : 'border-neu-dark/5 bg-neu-light'
}`}
```

**Replace With:**
```html
class={`flex flex-col h-full rounded-3xl border p-8 text-center ${
  tier.variant === 'accent'
    ? 'border-neu-accent/20 bg-neu-accent/5 ring-2 ring-neu-accent/20'
    : 'border-white/10 bg-white/5 backdrop-blur-md'
}`}
```

- [ ] Change all card text colors from `text-neu-dark` to `text-neu-light` (Lines 62, 67, 73, 83, 91).

**Find and Replace:**
- Line 62: `text-neu-muted` → Keep as is (secondary text)
- Line 67: `text-neu-muted` → Keep as is (secondary text)
- Line 73: `text-neu-dark` → `text-neu-light`
- Line 83: `text-neu-dark` → `text-neu-light`
- Line 91: Keep as is (already correct)

### Task 3.2: Refactor ServicesBento to Dark Mode & Extract i18n
**File:** `src/components/sections/ServicesBento.astro`

#### Step 3.2.1: Extract Hardcoded Strings to i18n
- [ ] Delete the entire `copyByLanguage` object (Lines 7-47) and the `readText` function (Lines 51-55).

- [ ] Add the following keys to `src/i18n/ui.ts`:

**File:** `src/i18n/ui.ts`

**Add a new `services` section:**
```typescript
services: {
  badge: {
    es: 'Nuestro Enfoque',
    en: 'Our Approach',
    de: 'Unser Ansatz',
  },
  title: {
    es: 'Webs que trabajan por ti, no al revés',
    en: 'Websites that work for you, not the other way around',
    de: 'Websites, die für dich arbeiten, nicht umgekehrt',
  },
  speedTitle: {
    es: 'Velocidad que Vende',
    en: 'Speed that Sells',
    de: 'Geschwindigkeit, die verkauft',
  },
  speedDescription: {
    es: 'Tiempos de carga instantáneos diseñados para móvil. Convierte el tráfico local en clientes potenciales.',
    en: 'Instant load times designed for mobile. Turn local traffic into leads.',
    de: 'Sofortige Ladezeiten, optimiert für Mobilgeräte. Verwandle lokale Besucher in Anfragen.',
  },
  waasTitle: {
    es: 'Cero Dolores de Cabeza',
    en: 'Zero Headaches',
    de: 'Null Kopfschmerzen',
  },
  waasDescription: {
    es: 'Gestionamos hosting, seguridad y actualizaciones. Tú concéntrate en hacer crecer tu negocio.',
    en: 'We handle hosting, security, and updates. You focus on running your business.',
    de: 'Wir kümmern uns um Hosting, Sicherheit und Updates. Du konzentrierst dich auf dein Geschäft.',
  },
  seoTitle: {
    es: 'Construido para Google',
    en: 'Built for Google',
    de: 'Optimiert für Google',
  },
  seoDescription: {
    es: 'Estructura optimizada para que tus clientes en Berlín te encuentren antes que a tu competencia.',
    en: 'Optimized structure so your clients in Berlin find you before your competition.',
    de: 'Strukturierte Optimierung, damit dich Kunden in Berlin vor deiner Konkurrenz finden.',
  },
},
```

- [ ] Update the `services` array in `ServicesBento.astro` to use the `t()` function (Lines 60-76).

**Replace Lines 57-76 With:**
```javascript
const services = [
  {
    title: t('services.speedTitle'),
    description: t('services.speedDescription'),
    accentClass: 'bg-neu-brand/10 text-neu-brand',
  },
  {
    title: t('services.waasTitle'),
    description: t('services.waasDescription'),
    accentClass: 'bg-white/10 text-neu-light',
  },
  {
    title: t('services.seoTitle'),
    description: t('services.seoDescription'),
    accentClass: 'bg-neu-accent/10 text-neu-accent',
  },
];
```

#### Step 3.2.2: Apply Dark Mode to ServicesBento
**File:** `src/components/sections/ServicesBento.astro`

- [ ] Change the section background from `bg-neu-light` to `bg-neu-dark` (Line 79).

**Current Code:**
```html
<section id="servicios" class="bg-neu-light py-24">
```

**Replace With:**
```html
<section id="servicios" class="bg-neu-dark py-24">
```

- [ ] Update the badge to use dark mode depth (Line 82).

**Current Code:**
```html
<div class="inline-flex min-h-12 items-center rounded-xl border border-neu-dark/5 bg-white px-4 text-sm font-semibold text-neu-muted">
```

**Replace With:**
```html
<div class="inline-flex min-h-12 items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 text-sm font-semibold text-neu-light">
```

- [ ] Change the section heading color from `text-neu-dark` to `text-neu-light` (Line 85).

**Current Code:**
```html
<h2 class="mt-5 font-display text-3xl font-bold tracking-tight text-neu-dark md:text-5xl">
```

**Replace With:**
```html
<h2 class="mt-5 font-display text-3xl font-bold tracking-tight text-neu-light md:text-5xl">
```

- [ ] Update the service cards to use dark mode depth and remove static shadows (Line 92).

**Current Code:**
```html
<article class="flex h-full flex-col rounded-3xl border border-neu-dark/5 bg-white p-8 shadow-sm">
```

**Replace With:**
```html
<article class="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
```

- [ ] Change the card title color from `text-neu-dark` to `text-neu-light` (Line 96).

**Current Code:**
```html
<h3 class="mb-3 text-xl font-bold text-neu-dark">{service.title}</h3>
```

**Replace With:**
```html
<h3 class="mb-3 text-xl font-bold text-neu-light">{service.title}</h3>
```

- [ ] The card description already uses `text-neu-muted`, which is acceptable. No change required for Line 97.

- [ ] Update the section label and heading references (Lines 83, 86).

**Replace Lines 83 and 86:**
```html
{sectionLabel}
```
**With:**
```html
{t('services.badge')}
```

**And:**
```html
{sectionHeading}
```
**With:**
```html
{t('services.title')}
```

---

## PHASE 4: Clean Up & Removal

### Task 4.1: Remove TechStackTicker Component
**File:** `src/components/sections/TechStackTicker.astro`

- [ ] This component violates the project brief by displaying client-facing technical jargon. It must be removed from the homepage.

**Option A (Recommended):** Delete the component import and usage from the homepage file (likely `src/pages/[lang]/index.astro`).

**Option B:** If you cannot locate the import, replace the entire contents of `TechStackTicker.astro` with an empty component:

```astro
---
// Component removed due to content policy violation
---
```

---

## PHASE 5: Verification Checklist

After completing all phases, verify the following:

- [ ] The entire site uses a dark background (`bg-neu-dark`) and light text (`text-neu-light`).
- [ ] No instances of `bg-white`, `bg-neu-light`, or `text-neu-dark` remain in the audited components.
- [ ] The Hero section displays the Pure-CSS Hover Grid with trailing light effects.
- [ ] The Hero badge displays business-friendly copy via the `t()` function.
- [ ] All pricing cards have equal height and use dark mode depth rules.
- [ ] The ServicesBento component consumes all copy from `src/i18n/ui.ts`.
- [ ] The GTM `<noscript>` block has been removed from the layout.
- [ ] Mobile safe area insets are applied to the body.
- [ ] The TechStackTicker component is no longer visible on the homepage.

---

## END OF ROADMAP

This roadmap is complete. Execute each phase sequentially and mark checkboxes as you progress. If you encounter any ambiguity, prioritize the exact code snippets provided in this document over any existing code patterns.
