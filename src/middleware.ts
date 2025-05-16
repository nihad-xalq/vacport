import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: defaultLocale,

    // Only show locale prefix when it's not the default locale
    localePrefix: 'as-needed'
});

export const config = {
    // Skip all paths that should not be internationalized
    matcher: ['/((?!api|_next|.*\\..*).*)']
}; 