# NeuStudio - Technical Architecture & Engineering Standards

## 1. Core Philosophy: "Silent Tech"
The client buys a commercial result; the tech stack is our internal choice[cite: 12]. 
- **Primary Stack (JAMstack):** Astro (Vanilla, SSG) + Tailwind CSS[cite: 12, 15]. Mandatory for corporate sites, landings, and portfolios[cite: 12]. Guarantees 100/100 Core Web Vitals, extreme security, and zero server maintenance[cite: 12].
- **Secondary Stack (WordPress):** Strictly reserved for self-managed complex catalogs or high-frequency blogs[cite: 12]. Requires ultra-lightweight themes (Astra/GeneratePress) and strict security hardening[cite: 12].

## 2. Performance & Mobile-First Standard
- **Mobile-First Progressive Enhancement:** All UI components are designed and executed for mobile users first using base Tailwind classes[cite: 12]. Desktop layouts are scaled up using max-widths (`max-w-7xl mx-auto`) to maintain cohesion[cite: 12].
- **Touch Targets:** Minimum hit area of 48x48px on mobile for all interactive elements to respect the "thumb-zone"[cite: 12, 15].
- **Zero-JS Rule:** Zero client-side JavaScript by default[cite: 15]. No React or Vue[cite: 15].

## 3. Legal Compliance (DSGVO) & Security
Operating in the DACH region requires extreme legal compliance[cite: 12].
- **Mandatory Pages:** Every site must include an `Impressum` (Legal Notice) and `Datenschutzerklärung` (Privacy Policy) in the footer[cite: 12]. Legal texts are pasted manually to avoid LLM hallucinations[cite: 15].
- **Google Consent Mode v2:** Real cookie banners are mandatory[cite: 12]. No tracking scripts (GA4, Meta Pixel) can fire before explicit user consent[cite: 12].
- **Single Source of Truth:** All tracking is managed via Google Tag Manager (GTM), hardcoded in `<Head.astro>` but relying on the consent event[cite: 12, 15].

## 4. No-Code Automations & Lead Routing
- **Lead Capture:** Static forms powered by Netlify Forms (`data-netlify="true"`) for maximum load speed[cite: 12, 15].
- **Routing & CRM:** Forms are connected via Make (Integromat)[cite: 12]. Make processes the lead, logs it in the CRM, and sends instant notifications to internal comms (WhatsApp/Telegram)[cite: 12].
- **Booking:** TidyCal or Calendly integrations are placed exclusively on "Thank You" (`/gracias`) pages for qualified leads[cite: 12].

## 5. AI-First Content Workflow
- **No Client Bottlenecks:** We generate the initial copy using AI based on a strict onboarding questionnaire (Steuernummer, pain points)[cite: 12].
- **Conversion Frameworks:** All generated copy must use local conversion formulas (PAS: Problem-Agitation-Solution; AIDA)[cite: 12].