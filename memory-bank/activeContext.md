# NeuStudio - Active Context & Current State

## Current Development Phase
- Core layout and i18n architecture are established.
- Homepage (`HomePage.astro`) structure is completed (Header, Hero, TechStackTicker, ServicesBento, Pricing, FinalCta, Footer).
- Legal page skeletons (`impressum.astro`, `privacy.astro`) and Portfolio skeleton are scaffolded to prevent 404 errors.

## Recent Architectural Decisions
- Migrated LLM instructions to a split `memory-bank` system to reduce context window token usage and prevent hallucinations during development.
- Enforced strict Tailwind semantic tokens to maintain a cohesive WaaS brand identity (Cobalt Blue & Electric Coral).

## Next Immediate Milestones
1. Implement Zod schemas and Content Collections for the Portfolio page.
2. Build out the Netlify-powered contact form with lead qualification fields.
3. Integrate GTM and local DSGVO-compliant cookie consent logic.