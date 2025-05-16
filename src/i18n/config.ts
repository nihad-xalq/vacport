export const locales = ["az", "en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "az";

export const languageNames: Record<Locale, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
};

export const languageFlags: Record<Locale, string> = {
  az: "🇦🇿",
  en: "🇬🇧",
  ru: "🇷🇺",
};
