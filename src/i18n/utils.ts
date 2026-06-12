import { defaultLanguage, type Language, type TranslationKey, ui } from './ui';

function getTranslationValue(dictionary: Record<string, unknown>, key: string): string | undefined {
  return key.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment];
    }

    return undefined;
  }, dictionary) as string | undefined;
}

export function getLangFromUrl(url: URL): Language {
  const [maybeLang] = url.pathname.split('/').filter(Boolean);

  if (maybeLang && maybeLang in ui) {
    return maybeLang as Language;
  }

  return defaultLanguage;
}

export function useTranslations(lang: Language) {
  const dictionary = ui[lang];
  const fallbackDictionary = ui[defaultLanguage];

  return function t(key: TranslationKey): string {
    return (
      getTranslationValue(dictionary as Record<string, unknown>, key) ??
      getTranslationValue(fallbackDictionary as Record<string, unknown>, key) ??
      key
    );
  };
}