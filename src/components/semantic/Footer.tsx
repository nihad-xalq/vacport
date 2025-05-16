"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

const Footer: React.FC = () => {
  const t = useTranslations("navigation");
  const common = useTranslations("common");
  const locale = useLocale();

  const footerLinks: FooterLink[] = [
    { label: t("about"), href: `/${locale}/about` },
    { label: t("offers"), href: `/${locale}/offers` },
    { label: t("contact"), href: `/${locale}/contact` },
  ];

  return (
    <footer className="mt-8">
      <div className="flex justify-center gap-6 text-xs text-gray-500 mb-2">
        {footerLinks.map((link) => (
          <Link key={link.label} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="text-center text-xs text-gray-400 mb-2">
        © 2024 VacPort. {common("allRightsReserved")}
      </div>
      <div className="flex items-center justify-center gap-1 text-xs text-gray-400 border-t pt-2">
        <span>Site by</span>
        <Link
          href="https://instagram.com/creadive.az"
          target="_blank"
          className="hover:underline"
        >
          Creadive Agency
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
