import { locales, type Locale } from "@/i18n/config";
import Sidebar from "@/components/semantic/Sidebar";
import { NextIntlClientProvider } from "next-intl";
import Statistics from "@/components/Statistitcs";
import Main from "@/components/semantic/Main";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vacancy Portal",
  description: "Your one-stop solution for job listings and applications.",
  keywords: [
    "jobs",
    "vacancy",
    "careers",
    "job portal",
    "employment",
    "hiring",
    "applications",
  ],
  authors: [{ name: "Vacancy Portal Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  let messages;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
    console.log(error);
  }

  return (
    <html lang={locale}>
      <body className={`${poppins.className} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex">
            <Sidebar />
            <Main>{children}</Main>
            <Statistics />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
