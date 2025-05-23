"use client";

import {
  FiBriefcase,
  FiDroplet,
  FiList,
  FiMapPin,
  FiMail,
} from "react-icons/fi";
import LanguageSwitcher from "../LanguageSwitcher";
import { usePathname } from "next/navigation";
import { AiFillBank } from "react-icons/ai";
import { type Locale } from "@/i18n/config";
import { useTranslations } from "next-intl";
import ThemeToggle from "../ThemeToggle";
import { FC, ReactNode } from "react";
import { useLocale } from "next-intl";
import Footer from "./Footer";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string;
}

const Sidebar: FC = () => {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("navigation");
  const common = useTranslations("common");

  const mainNavItems: NavItem[] = [
    {
      label: t("vacancies"),
      href: `/${locale}/vacancies`,
      icon: <FiBriefcase className="w-5 h-5" />,
    },
    {
      label: t("categories"),
      href: `/${locale}/categories`,
      icon: <FiDroplet className="w-5 h-5" />,
    },
    {
      label: t("industries"),
      href: `/${locale}/industries`,
      icon: <FiList className="w-5 h-5" />,
    },
    {
      label: t("companies"),
      href: `/${locale}/companies`,
      icon: <AiFillBank className="w-5 h-5" />,
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      label: t("favorites"),
      href: `/${locale}/favorites`,
      icon: <FiMapPin className="w-5 h-5" />,
      badge: "0",
    },
    {
      label: t("subscriptions"),
      href: `/${locale}/subscriptions`,
      icon: <FiMail className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-68 min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4">
      {/* Top Section: Logo and Language */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-2xl font-bold text-blue-700">
            Vac<span className="text-green-500">Portal</span>
          </span>
          <LanguageSwitcher currentLocale={locale} />
        </div>
        {/* Main Navigation */}
        <nav className="flex flex-col gap-2">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        {/* Secondary Navigation Section */}
        <div className="mt-8">
          <div className="text-xs text-gray-400 mb-2">{common("more")}</div>
          <nav className="flex flex-col gap-2">
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-black ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Theme Toggle */}
        <div className="mt-8">
          <ThemeToggle />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </aside>
  );
};

export default Sidebar;
