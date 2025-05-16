import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './config';
import type { RequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  // If the locale is not supported or undefined, use the default locale
  const currentLocale = (!locale || !locales.includes(locale as Locale)) ? defaultLocale : locale;

  try {
    return {
      locale: currentLocale,
      messages: (await import(`./locales/${currentLocale}.json`)).default,
      timeZone: 'Asia/Baku',
      now: new Date(),
    };
  } catch (error) {
    console.log(error);
    // If there's an error loading messages, use the default locale
    return {
      locale: defaultLocale,
      messages: (await import(`./locales/${defaultLocale}.json`)).default,
      timeZone: 'Asia/Baku',
      now: new Date(),
    };
  }
}); 