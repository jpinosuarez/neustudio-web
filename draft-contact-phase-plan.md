# NeuStudio — Phase Transition Plan: Portfolio Deactivation & Multi-Step Contact Form

> **Version:** 1.0  
> **Status:** Draft — DO NOT IMPLEMENT UNTIL APPROVED  
> **Last Updated:** 2026-06-13  
> **Principle:** Preserve all portfolio code. Deactivate via navigation removal + 302 redirects. Shift 100% focus to high-ticket lead gen with a native multi-step contact form.

---

## 0. Pre-Flight: Fix Existing URL Inconsistency

**Problem Found:** `src/components/sections/Hero.astro` line 24 links the primary CTA to `/${lang}/contact`, while `Header.astro` line 17 references `/${lang}/contacto`. The Header uses `/contacto` consistently; the Hero is out of sync.

**Action (Plan Phase):** Fix Hero.astro line 24 to use `/contacto`:
```
- href={`/${lang}/contact`}
+ href={lang === 'es' ? '/contacto' : `/${lang}/contacto`}
```
This ensures all entry points funnel users to the same destination before the new contact page is built.

---

## 1. PORTFOLIO DEACTIVATION

### 1.1 `src/components/layout/Header.astro`

**Lines 17–23:** The `navItems` array currently includes the Portfolio link. The contact CTA button already points to `/contacto` — this stays untouched.

**Actions:**
1. **Comment out** (do not delete) the portfolio item from the `navItems` array (lines 21–22):
   ```astro
   // PORTFOLIO DEACTIVATED — see draft-contact-phase-plan.md
   // { key: 'nav.portfolio' as const, href: localizedPortfolioHref },
   ```
2. **Comment out** the `localizedPortfolioHref` variable declaration on line 18 (optional but clean):
   ```astro
   // const localizedPortfolioHref = lang === defaultLanguage ? '/portfolio' : `/${lang}/portfolio`;
   ```
3. **Keep** `localizedContactHref` (line 17) — this already points to `/contacto`, our new destination.

**Behavior after change:** Both desktop nav and mobile hamburger menu stop rendering "Portfolio" / "Casos de Éxito" / "Erfolgsgeschichten" links. The CTA button remains, now pointing at the upcoming multi-step form.

---

### 1.2 `src/components/layout/Footer.astro`

**Lines 29–31:** Footer contains a portfolio link in the "Links" column.

**Actions:**
1. **Comment out** the portfolio `<a>` tag and wrap in an HTML comment:
   ```astro
   <!-- PORTFOLIO DEACTIVATED — see draft-contact-phase-plan.md
   <a href={localizedPath('/portfolio')} class="text-sm text-neu-muted transition-colors hover:text-neu-dark">
     {t('nav.portfolio')}
   </a>
   -->
   ```

**Behavior after change:** The "Links" column only shows "Services". Portfolio is invisible in the footer.

---

### 1.3 `src/components/sections/Hero.astro`

**Lines 29–34:** The secondary CTA button links to `/${lang}/portfolio`.

**Actions:**
Since we want to funnel all traffic toward lead gen, we have two options:

- **Option A (Recommended):** Remove the secondary CTA entirely. The Hero becomes a single-CTA section — one "Solicitar Propuesta" button, no competing action. This is best for CRO.
- **Option B:** Keep the button but rewire it to the contact form instead of portfolio.

**Recommended implementation (Option A):**
1. **Comment out** lines 29–34 (the secondary CTA anchor):
   ```astro
   <!-- PORTFOLIO DEACTIVATED
   <a
     href={`/${lang}/portfolio`}
     class="..."
   >
     {t('hero.secondaryCta')}
   </a>
   -->
   ```
2. The hero now has only one CTA: the "Solicitar Propuesta" button linking to `/contacto`.

**CRO rationale:** Single-CTA pages reduce decision paralysis. Every user who lands on the homepage now has one path forward → schedule a consultation.

---

### 1.4 `src/pages/[lang]/portfolio.astro` — 302 Redirect

This file handles `/portfolio` (or `/{lang}/portfolio`). Users may still type this URL manually, or arrive via old bookmarks / backlinks.

**Actions:**
Replace the **entire frontmatter + template** with a clean redirect:

```astro
---
// PORTFOLIO DEACTIVATED — 302 Redirect to homepage
// Original content preserved in git history. See draft-contact-phase-plan.md.

import { defaultLanguage } from '../../i18n/ui';
import type { Language } from '../../i18n/ui';

export function getStaticPaths() {
  return [
    { params: { lang: 'es' } },
    { params: { lang: 'en' } },
    { params: { lang: 'de' } },
  ];
}

const { lang } = Astro.params as { lang: Language };
const target = lang === defaultLanguage ? '/' : `/${lang}`;

return Astro.redirect(target, 302);
---
```

**Key decisions:**
- **Status 302 (Temporary):** Signals to search engines this is a temporary change. When we re-activate the portfolio with real case studies, we flip it back. A 301 would permanently de-index the URLs.
- **Redirect destination:** The language-root homepage (e.g., `/` for ES, `/en/` for EN, `/de/` for DE). This is better UX than a 404.
- **Entire file replaced:** We strip all imports, `getCollection`, JSX template, etc. The file stays lean and intentional.

---

### 1.5 `src/pages/[lang]/portfolio/[slug].astro` — 302 Redirect

Same logic for individual case study detail pages (e.g., `/portfolio/berlin-kitchen-supply`).

**Actions:**
Replace with a redirect:

```astro
---
// PORTFOLIO DEACTIVATED — 302 Redirect to homepage
// Original content preserved in git history. See draft-contact-phase-plan.md.

import { defaultLanguage } from '../../i18n/ui';
import type { Language } from '../../i18n/ui';

export function getStaticPaths() {
  // We don't need real paths anymore, but getStaticPaths must return
  // an array so SSG doesn't break. Return empty array — this route
  // will only work via Astro.redirect fallback (or simply 404).
  // Actually, better: return the three lang variants so the redirect
  // works for any manually typed slug.
  return [
    { params: { lang: 'es', slug: 'placeholder' } },
    { params: { lang: 'en', slug: 'placeholder' } },
    { params: { lang: 'de', slug: 'placeholder' } },
  ];
}

const { lang } = Astro.params as { lang: Language };
const target = lang === defaultLanguage ? '/' : `/${lang}`;

return Astro.redirect(target, 302);
---
```

**Important nuance:** With dynamic `[slug]` routes, `getStaticPaths()` must return entries for SSG mode. Since this page previously used `getCollection('portfolio')` to generate paths, we now return a minimal set of placeholder entries. Every slug will redirect to the language homepage. If you prefer to avoid generating placeholder pages, this route could also be deleted entirely and the framework would 404 — but the redirect is safer for SEO and UX.

---

### 1.6 Files That Do NOT Need Changes

- **`src/i18n/ui.ts`:** Keep `nav.portfolio`, `hero.secondaryCta`, `portfolio.empty`, `pageTitles.portfolio` keys. They'll be used again when portfolio is reactivated.
- **`src/content/portfolio/`:** All MDX files stay untouched.
- **`src/content.config.ts`:** The portfolio collection schema stays intact.
- **`src/views/HomePage.astro`:** No direct portfolio link — it only imports section components. `Hero.astro` is handled above.

---

### 1.7 Portfolio Deactivation Checklist

| # | File | Action | Lines |
|---|------|--------|-------|
| 1 | `src/components/sections/Hero.astro` | Fix `/contact` → `/contacto` | L24 |
| 2 | `src/components/sections/Hero.astro` | Comment out secondary CTA (portfolio link) | L29–34 |
| 3 | `src/components/layout/Header.astro` | Comment out `localizedPortfolioHref` var | L18 |
| 4 | `src/components/layout/Header.astro` | Comment out portfolio `navItems` entry | L21–22 |
| 5 | `src/components/layout/Footer.astro` | Comment out portfolio footer link | L29–31 |
| 6 | `src/pages/[lang]/portfolio.astro` | Full file replace → 302 redirect | Entire file |
| 7 | `src/pages/[lang]/portfolio/[slug].astro` | Full file replace → 302 redirect | Entire file |

---

## 2. MULTI-STEP CONTACT FORM ARCHITECTURE

### 2.1 New File: `src/pages/[lang]/contacto.astro`

**Route:** `/contacto` (ES), `/en/contacto` (EN), `/de/contacto` (DE)

**Tech Stack (matching `architecture.md`):**
- Astro SSG with `getStaticPaths()` for all 3 languages
- Tailwind CSS (mobile-first, semantic tokens only)
- Vanilla JS in an Astro `<script>` tag — zero client-side frameworks
- Netlify Forms (`data-netlify="true"`)
- No heavy dependencies

---

### 2.2 Form Flow Overview

```
┌─────────────────────────────────────────────────────┐
│  STEP 1: QUALIFICATION                               │
│  "What's your biggest challenge right now?"          │
│  [Big toggle buttons — 48×48px minimum hit zone]     │
│  ☐ My site is too slow                               │
│  ☐ Nobody finds me on Google                         │
│  ☐ I need a fresh design                             │
│  ☐ Other / I'm not sure                              │
│                                                      │
│  [Next Step →]                    Step 1 of 3 ●○○    │
└─────────────────────────────────────────────────────┘
         ↓ (JavaScript toggles visibility)
┌─────────────────────────────────────────────────────┐
│  STEP 2: PROJECT DETAILS                             │
│  "Help us scope your project"                        │
│  Budget: [radio/select] <1k€ / 1k–3k€ / 3k€+        │
│  Timeline: [radio] ASAP / 1 month / 3+ months        │
│                                                      │
│  [← Back]  [Next Step →]        Step 2 of 3 ●●○      │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  STEP 3: IDENTITY & SUBMIT                           │
│  "Almost done! How can we reach you?"                │
│  Full Name*:   [________________]                    │
│  Business Name: [________________]                   │
│  Email*:       [________________]                    │
│  Phone (opt):  [________________]                    │
│                                                      │
│  [← Back]  [Send My Proposal →] Step 3 of 3 ●●●      │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  SUCCESS STATE                                       │
│  ✅ "We've received your request!"                   │
│  "We'll personally review it and get back to you     │
│   within 24 hours."                                  │
│                                                      │
│  [Return to Homepage]                                │
└─────────────────────────────────────────────────────┘
```

---

### 2.3 Data Model (Netlify Forms)

Netlify Forms auto-parses form fields. We'll use hidden fields for the qualification and budget/timeline steps so all data is submitted together in Step 3.

**Form field names:**

| Field | Netlify Name | Type | Step |
|-------|-------------|------|------|
| Pain Point | `pain_point` | `hidden` | 1 → carried forward |
| Budget Range | `budget` | `hidden` | 2 → carried forward |
| Timeline | `timeline` | `hidden` | 2 → carried forward |
| Full Name | `full_name` | `text` (required) | 3 |
| Business Name | `business_name` | `text` | 3 |
| Email | `email` | `email` (required) | 3 |
| Phone | `phone` | `tel` | 3 |
| Language | `language` | `hidden` | auto-filled |
| Honeypot | `bot-field` | `text` (hidden, anti-spam) | 3 |

---

### 2.4 Step Mechanics (Vanilla JS)

All three steps live in the same `<form>` element. Visibility is controlled via Tailwind's `hidden` class toggled by JavaScript. This ensures:
- All form data is submitted together.
- No page reloads between steps.
- Keyboard navigation works naturally (Tab flow stays within the visible step).
- Screen readers only see the active step (`aria-hidden="true"` on inactive step containers).

**JavaScript logic (inline `<script>` in Astro):**
```javascript
// Scoped to the form instance. No global pollution.
const form = document.getElementById('contact-form');
const steps = form.querySelectorAll('[data-step]');
let currentStep = 0;

function showStep(index) {
  steps.forEach((s, i) => {
    s.classList.toggle('hidden', i !== index);
    s.setAttribute('aria-hidden', i !== index ? 'true' : 'false');
  });
  // Update progress indicator
  // Focus the first focusable element in the new step
}

// Next/Back buttons call showStep(currentStep ± 1)
// Step 1 toggle buttons set hidden field + advance to step 2
// Step 2 radio selects set hidden fields + advance via button
// Step 3 is final submit
```

---

### 2.5 i18n Keys to Add to `src/i18n/ui.ts`

Add a new top-level key `contactForm` under each language:

```typescript
contactForm: {
  // Page-level
  pageTitle: 'Solicitar Propuesta',
  pageDescription: 'Cuéntanos sobre tu proyecto. Te responderemos en 24h.',
  
  // Step indicators
  stepLabel: 'Paso',
  stepOf: 'de',
  
  // Step 1 — Qualification
  step1Title: '¿Cuál es tu mayor desafío ahora mismo?',
  step1OptionSlow: 'Mi sitio es demasiado lento',
  step1OptionSeo: 'Nadie me encuentra en Google',
  step1OptionDesign: 'Necesito un diseño fresco',
  step1OptionOther: 'Otro / No estoy seguro',
  step1Next: 'Siguiente',
  
  // Step 2 — Project Details
  step2Title: 'Ayúdanos a dimensionar tu proyecto',
  step2BudgetLabel: 'Presupuesto estimado',
  step2BudgetLow: 'Menos de 1.000€',
  step2BudgetMid: '1.000€ – 3.000€',
  step2BudgetHigh: 'Más de 3.000€',
  step2TimelineLabel: '¿Cuándo necesitas empezar?',
  step2TimelineAsap: 'Lo antes posible',
  step2TimelineMonth: 'En el próximo mes',
  step2TimelineQuarter: 'En los próximos 3 meses',
  step2Back: 'Atrás',
  step2Next: 'Siguiente',
  
  // Step 3 — Identity
  step3Title: '¡Casi listo! ¿Cómo te contactamos?',
  step3NameLabel: 'Nombre completo *',
  step3NamePlaceholder: 'Tu nombre',
  step3BusinessLabel: 'Nombre de tu negocio',
  step3BusinessPlaceholder: 'Nombre de tu empresa o proyecto',
  step3EmailLabel: 'Email *',
  step3EmailPlaceholder: 'tu@email.com',
  step3PhoneLabel: 'Teléfono (opcional)',
  step3PhonePlaceholder: '+49 ...',
  step3Back: 'Atrás',
  step3Submit: 'Enviar mi solicitud',
  
  // Success
  successTitle: '¡Solicitud recibida!',
  successMessage: 'Revisaremos tu proyecto personalmente y te responderemos en menos de 24 horas.',
  successCta: 'Volver al inicio',
}
```

Equivalent entries for `en` and `de` with proper translations.

---

### 2.6 Design Spec (Matching `architecture.md`)

**Layout:**
- `max-w-2xl mx-auto px-4` — centered, single-column
- Generous vertical spacing: `py-16 md:py-24`
- Card container: `rounded-3xl border border-neu-dark/5 bg-white shadow-sm p-6 md:p-10`

**Typography:**
- Step title: `font-display text-2xl md:text-3xl font-bold tracking-tight text-neu-dark`
- Labels: `block text-sm font-semibold text-neu-dark mb-2`
- Helper text: `text-sm text-neu-muted`

**Toggle Buttons (Step 1):**
```html
<button type="button"
  class="w-full min-h-[56px] rounded-xl border-2 border-neu-dark/10 bg-neu-light px-4 py-4 text-left text-base font-medium text-neu-dark transition-all
         hover:border-neu-brand hover:bg-neu-brand/5
         aria-pressed:border-neu-brand aria-pressed:bg-neu-brand/10 aria-pressed:text-neu-brand"
  data-pain-point="slow"
  aria-pressed="false"
>
  🐢 Mi sitio es demasiado lento
</button>
```
- **48px+ height** guaranteed via `min-h-[56px]` (56px for comfort).
- `aria-pressed` state provides visual feedback without JS classes.
- Emoji prefix adds visual scanning speed (no icons library needed).

**Progress Indicator:**
```html
<div class="flex items-center justify-center gap-2 mb-8" aria-label="Paso 1 de 3">
  <span class="inline-block w-3 h-3 rounded-full bg-neu-brand"></span>
  <span class="inline-block w-3 h-3 rounded-full bg-neu-dark/10"></span>
  <span class="inline-block w-3 h-3 rounded-full bg-neu-dark/10"></span>
  <span class="text-xs text-neu-muted ml-2">Paso 1 de 3</span>
</div>
```
Updated dynamically via JS.

**Input Fields (Step 3):**
```html
<input type="text" name="full_name" required
  class="w-full rounded-xl border border-neu-dark/10 bg-neu-light px-4 py-3 text-neu-dark
         placeholder:text-neu-muted/60
         focus:border-neu-brand focus:outline-none focus:ring-2 focus:ring-neu-brand/20" />
```

**Back Button (Steps 2 & 3):**
```html
<button type="button"
  class="inline-flex items-center gap-1 rounded-xl px-4 py-3 text-sm font-medium text-neu-muted
         hover:text-neu-dark transition-colors min-h-12">
  ← Atrás
</button>
```

**Submit Button:**
```html
<button type="submit"
  class="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-neu-accent text-white
         font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all
         text-base min-w-[200px] min-h-12">
  Enviar mi solicitud
</button>
```

---

### 2.7 Netlify Forms Configuration

Add to the `<form>` element:
```html
<form id="contact-form"
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  action="/success"
  class="..."
>
  <!-- Hidden fields for Netlify -->
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="language" value={lang} />
  
  <!-- Honeypot (hidden from humans, visible to bots) -->
  <p class="hidden" aria-hidden="true">
    <label>Don't fill this out: <input name="bot-field" /></label>
  </p>
  
  <!-- Hidden fields for step data -->
  <input type="hidden" name="pain_point" id="field-pain-point" value="" />
  <input type="hidden" name="budget" id="field-budget" value="" />
  <input type="hidden" name="timeline" id="field-timeline" value="" />
  
  <!-- Step containers... -->
</form>
```

**Post-submit behavior:** The `action="/success"` triggers Netlify's default success page. Alternatively, we can use a custom success state within the Astro page by preventing default form submission and using `fetch` with Netlify's form endpoint — but for Phase 1, the Netlify default redirect is sufficient and simpler.

**`netlify.toml` (if not already present):**
We may need to ensure Netlify detects the form. Add a `netlify.toml` at the project root if it doesn't exist:
```toml
[[redirects]]
  from = "/success"
  to = "/contacto?success=true"
  status = 200
```
This allows the Astro page to detect the `?success=true` query param and show the success state inline, avoiding a separate success page.

---

### 2.8 CRO Best Practices Embedded

| Principle | Implementation |
|-----------|---------------|
| **Single-column mobile layout** | `max-w-2xl mx-auto` with `px-4` thumb-zone padding |
| **48px minimum touch targets** | All buttons use `min-h-12` (48px) or `min-h-[56px]` (56px) |
| **No competing CTAs** | Only one button visible per step; back button is muted |
| **Progress bar reduces abandonment** | 3 dots + "Step X of 3" text keeps users oriented |
| **Qualification first** | Pain point asked **before** name/email — shows we care about their problem |
| **Low-friction Step 1** | Big toggle buttons, one click to advance — no typing required |
| **Social proof proximity** | Trust signal text near submit button: "Sin spam. Respondemos en 24h." |
| **No `mailto:`** | Architecture rule: native HTML form with Netlify only |
| **DSGVO compliance** | No third-party scripts on the form page; only Netlify Forms processes data |

---

### 2.9 Accessibility Requirements (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|---------------|
| **Focus management** | After advancing a step, JS focuses the first focusable element in the new step container |
| **`aria-hidden`** | Inactive steps get `aria-hidden="true"` so screen readers skip them |
| **`aria-pressed`** | Toggle buttons in Step 1 use `aria-pressed` to indicate selection state |
| **`aria-label` on progress** | Progress indicator has `aria-label="Paso 1 de 3"` and `aria-live="polite"` |
| **Keyboard navigation** | All buttons are native `<button>` elements. Tab order flows naturally. |
| **Color contrast** | All text-on-background uses semantic tokens verified against AA contrast ratios |
| **Form labels** | Every input has a `<label>` with matching `for`/`id` |
| **Error messaging** | HTML5 validation (`required` attribute) provides native error messages; no custom JS validation needed for Phase 1 |
| **`autocomplete` attributes** | `autocomplete="name"`, `autocomplete="organization"`, `autocomplete="email"`, `autocomplete="tel"` on respective fields |

---

## 3. IMPLEMENTATION ORDER

This is the recommended order of execution to minimize conflicts and enable incremental testing:

| Phase | Step | File(s) | Description |
|-------|------|---------|-------------|
| **A** | A1 | `src/components/sections/Hero.astro` | Fix `/contact` → `/contacto` |
| **A** | A2 | `src/components/sections/Hero.astro` | Comment out secondary portfolio CTA |
| **A** | A3 | `src/components/layout/Header.astro` | Comment out portfolio nav item + variable |
| **A** | A4 | `src/components/layout/Footer.astro` | Comment out portfolio footer link |
| **A** | A5 | `src/pages/[lang]/portfolio.astro` | Replace with 302 redirect |
| **A** | A6 | `src/pages/[lang]/portfolio/[slug].astro` | Replace with 302 redirect |
| **B** | B1 | `src/i18n/ui.ts` | Add `contactForm` key to all 3 languages |
| **B** | B2 | `src/pages/[lang]/contacto.astro` | Create the multi-step form page (full implementation) |
| **C** | C1 | `netlify.toml` (or root) | Ensure Netlify Forms detection + success redirect |
| **C** | C2 | Local `astro dev` | Manual QA: navigate form, verify redirects, test all 3 languages |
| **C** | C3 | `astro build` + `netlify dev` | Verify Netlify Forms parsing in production-like environment |

---

## 4. ROLLBACK PLAN

If portfolio needs to be reactivated quickly:

1. **Uncomment** the nav items in `Header.astro` and `Footer.astro`.
2. **Uncomment** the secondary CTA in `Hero.astro`.
3. **Restore** `portfolio.astro` and `[slug].astro` from git: `git checkout HEAD~1 -- src/pages/[lang]/portfolio.astro src/pages/[lang]/portfolio/\[slug\].astro`
4. **Rebuild:** `astro build` (static generation will re-create portfolio pages from content collection).
5. **The `contacto.astro` page stays live** — it independently generates leads regardless of portfolio status.

---

## 5. NOTES & DECISIONS TO CONFIRM

- [ ] **Hero secondary CTA removal (Option A vs B):** The plan recommends removing the secondary CTA entirely for maximum CRO. Confirm this is acceptable vs. rewiring it to `/contacto`.
- [ ] **Success page behavior:** The plan uses `?success=true` query param on the same Astro page. Confirm this is preferred over a separate `/success` HTML page.
- [ ] **Phone field:** Included as optional in Step 3. High-ticket B2B often benefits from phone, but DSGVO considerations apply — confirm phone field should be included.
- [ ] **Netlify form name:** The form is named `"contact"`. Confirm no existing form uses this name (name collisions in Netlify merge submissions).