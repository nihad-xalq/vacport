"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FiSearch, FiMapPin, FiUsers, FiGlobe, FiCalendar, FiHeart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";

// Types
interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  location: string;
  size: string;
  founded: string;
  website: string;
  industry: string;
  openPositions: number;
  featured: boolean;
}

// Mock data for companies
const companies: Company[] = [
  {
    id: 1,
    name: "TechCorp",
    logo: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Leading software development company specializing in enterprise solutions",
    location: "Baku, Azerbaijan",
    size: "500+ employees",
    founded: "2010",
    website: "https://techcorp.com",
    industry: "Technology & IT",
    openPositions: 12,
    featured: true
  },
  {
    id: 2,
    name: "BankCorp",
    logo: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "One of the largest financial institutions in Azerbaijan",
    location: "Baku, Azerbaijan",
    size: "1000+ employees",
    founded: "1995",
    website: "https://bankcorp.com",
    industry: "Finance & Banking",
    openPositions: 8,
    featured: true
  },
  {
    id: 3,
    name: "CloudTech",
    logo: "https://randomuser.me/api/portraits/men/45.jpg",
    description: "Cloud infrastructure and DevOps solutions provider",
    location: "Remote",
    size: "100+ employees",
    founded: "2015",
    website: "https://cloudtech.com",
    industry: "Technology & IT",
    openPositions: 5,
    featured: true
  },
  {
    id: 4,
    name: "HealthCare Plus",
    logo: "https://randomuser.me/api/portraits/women/22.jpg",
    description: "Modern healthcare solutions and medical services",
    location: "Baku, Azerbaijan",
    size: "200+ employees",
    founded: "2012",
    website: "https://healthcareplus.com",
    industry: "Healthcare",
    openPositions: 6,
    featured: false
  },
  {
    id: 5,
    name: "EduTech",
    logo: "https://randomuser.me/api/portraits/men/67.jpg",
    description: "Educational technology and e-learning platform",
    location: "Remote",
    size: "50+ employees",
    founded: "2018",
    website: "https://edutech.com",
    industry: "Education",
    openPositions: 4,
    featured: false
  },
  {
    id: 6,
    name: "RetailPro",
    logo: "https://randomuser.me/api/portraits/women/89.jpg",
    description: "Leading retail chain with nationwide presence",
    location: "Multiple Locations",
    size: "2000+ employees",
    founded: "2005",
    website: "https://retailpro.com",
    industry: "Retail & E-commerce",
    openPositions: 15,
    featured: true
  }
];

const Companies = () => {
  const t = useTranslations("Companies");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter companies based on search query
  const filteredCompanies = companies.filter(company => {
    if (!debouncedSearchQuery) return true;

    const searchLower = debouncedSearchQuery.toLowerCase();
    return (
      company.name.toLowerCase().includes(searchLower) ||
      company.description.toLowerCase().includes(searchLower) ||
      company.industry.toLowerCase().includes(searchLower) ||
      company.location.toLowerCase().includes(searchLower)
    );
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <section>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {t("title")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {t("description")}
        </p>
      </div>

      {/* Search */}
      <div className="mb-12">
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full px-4 py-3 pl-12 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Featured Companies */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("featured")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies
            .filter(company => company.featured)
            .map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.id}`}
                className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={56}
                    height={56}
                    className="rounded-full border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {company.name}
                    </h3>
                    <span className="text-sm text-blue-600 font-medium">
                      {company.openPositions} {t("details.vacancies")}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {company.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {company.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers className="w-4 h-4" />
                    {company.size}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* All Companies Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("all")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={48}
                      height={48}
                      className="rounded-full border"
                    />
                    <div>
                      <Link
                        href={`/companies/${company.id}`}
                        className="font-semibold text-lg text-gray-900 hover:text-blue-600"
                      >
                        {company.name}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {company.industry}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(company.id);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <FiHeart
                      className={`w-5 h-5 ${favorites.includes(company.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                        }`}
                      fill={favorites.includes(company.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {company.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {company.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers className="w-4 h-4" />
                    {company.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {t("details.founded")}: {company.founded}
                  </span>
                  <Link
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                  >
                    <FiGlobe className="w-4 h-4" />
                    {t("details.website")}
                  </Link>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link
                    href={`/companies/${company.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {company.openPositions} {t("details.vacancies")} →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
