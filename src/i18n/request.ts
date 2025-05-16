import {getRequestConfig} from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({locale}) => {
  // If the locale is not supported, use the default locale
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  try {
    return {
      locale,
      messages: (await import(`./locales/${locale}.json`)).default,
      timeZone: 'Asia/Baku',
      now: new Date(),
    };
  } catch (error) {
    // If there's an error loading messages, use the default locale
    return {
      locale: defaultLocale,
      messages: (await import(`./locales/${defaultLocale}.json`)).default,
      timeZone: 'Asia/Baku',
      now: new Date(),
    };
  }
}); 