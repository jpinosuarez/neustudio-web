export const languages = ['es', 'en', 'de'] as const;

export const defaultLanguage = 'es' as const;

export const ui = {
  es: {
    nav: {
      services: 'Servicios',
      portfolio: 'Portfolio',
      contact: 'Contacto',
      menu: 'Abrir navegación',
      language: 'Cambiar idioma',
      home: 'Ir al inicio',
    },
    cta: {
      proposal: 'Solicitar propuesta',
    },
    hero: {
      socialProof: '⭐⭐⭐⭐⭐ Confiado por negocios locales en Berlín',
      headline: 'Tu Web Lista en 7 Días. Más Rápido. Más Ventas.',
      subtitle:
        'Sitios web optimizados para SEO que cargan en <0.5s y generan 3x más leads. Sin jerga técnica, solo resultados claros.',
      primaryCta: 'Solicitar propuesta',
      secondaryCta: 'Explora Nuestros Casos de Éxito',
      trustSignal: 'Totalmente compatible con DSGVO/GDPR',
    },
    footer: {
      tagline: 'Tu socio digital en Berlín',
      impressum: 'Impressum',
      privacy: 'Política de Privacidad',
    },
  },
  en: {
    nav: {
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
      menu: 'Open navigation',
      language: 'Change language',
      home: 'Go to home',
    },
    cta: {
      proposal: 'Request proposal',
    },
    hero: {
      socialProof: '⭐⭐⭐⭐⭐ Trusted by local businesses in Berlin',
      headline: 'Your Website in 7 Days. Faster. More Leads.',
      subtitle:
        'SEO-optimized websites that load in <0.5s and generate 3x more leads. No tech jargon, just clear results.',
      primaryCta: 'Get Your Free Proposal',
      secondaryCta: 'Explore Our Success Stories',
      trustSignal: 'Fully DSGVO/GDPR Compliant',
    },
    footer: {
      tagline: 'Your digital partner in Berlin',
      impressum: 'Impressum',
      privacy: 'Privacy Policy',
    },
  },
  de: {
    nav: {
      services: 'Leistungen',
      portfolio: 'Portfolio',
      contact: 'Kontakt',
      menu: 'Navigation öffnen',
      language: 'Sprache wechseln',
      home: 'Zur Startseite',
    },
    cta: {
      proposal: 'Angebot anfordern',
    },
    hero: {
      socialProof: '⭐⭐⭐⭐⭐ Von lokalen Unternehmen in Berlin geschätzt',
      headline: 'Deine Website in 7 Tagen. Schneller. Mehr Umsatz.',
      subtitle:
        'SEO-optimierte Websites, die in <0.5s laden und 3x mehr Leads generieren. Kein Tech-Jargon, nur klare Ergebnisse.',
      primaryCta: 'Kostenloses Angebot anfordern',
      secondaryCta: 'Unsere Erfolgsgeschichten ansehen',
      trustSignal: 'Vollständig DSGVO/GDPR-konform',
    },
    footer: {
      tagline: 'Dein digitaler Partner in Berlin',
      impressum: 'Impressum',
      privacy: 'Datenschutzerklärung',
    },
  },
} as const;

export type Language = keyof typeof ui;

type TranslationTree = (typeof ui)[Language];

type NestedKeyOf<T extends object> = {
  [Key in keyof T & string]: T[Key] extends Record<string, any>
    ? `${Key}` | `${Key}.${NestedKeyOf<T[Key]>}`
    : `${Key}`;
}[keyof T & string];

export type TranslationKey = NestedKeyOf<TranslationTree>;