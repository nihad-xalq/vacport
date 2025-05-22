import { locales, defaultLocale } from "./i18n/config";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: defaultLocale,

  // Always show locale prefix
  localePrefix: "always"
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - Internal Next.js paths
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
