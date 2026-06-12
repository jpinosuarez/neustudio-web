export const languages = ['es', 'en', 'de'] as const;

export const defaultLanguage = 'es' as const;

export const ui = {
  es: {
    nav: {
      services: 'Servicios',
      portfolio: 'Portfolio',
      contact: 'Contacto',
    },
    cta: {
      proposal: 'Solicitar propuesta',
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
    },
    cta: {
      proposal: 'Request proposal',
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
    },
    cta: {
      proposal: 'Angebot anfordern',
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