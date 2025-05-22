"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiCode,
  FiBriefcase,
  FiDollarSign,
  FiActivity,
  FiTruck,
  FiHome,
  FiShoppingBag,
  FiBook,
  FiUsers
} from "react-icons/fi";
import { IconType } from "react-icons";

// Types
type IndustryColor = "blue" | "green" | "purple" | "pink" | "orange" | "teal" | "red" | "gray" | "indigo";

interface Industry {
  id: number;
  name: string;
  icon: IconType;
  count: number;
  description: string;
  popular: string[];
  color: IndustryColor;
}

// Mock data for industries
const industries: Industry[] = [
  {
    id: 1,
    name: "Technology & IT",
    icon: FiCode,
    count: 450,
    description: "Software development, IT services, and digital solutions",
    popular: ["Software Development", "IT Services", "Cloud Computing"],
    color: "blue"
  },
  {
    id: 2,
    name: "Finance & Banking",
    icon: FiDollarSign,
    count: 280,
    description: "Banking, financial services, and investment management",
    popular: ["Banking", "Investment", "Financial Analysis"],
    color: "green"
  },
  {
    id: 3,
    name: "Healthcare",
    icon: FiActivity,
    count: 320,
    description: "Medical services, healthcare technology, and pharmaceuticals",
    popular: ["Medical Services", "Pharmaceuticals", "Healthcare Tech"],
    color: "purple"
  },
  {
    id: 4,
    name: "Manufacturing",
    icon: FiTruck,
    count: 180,
    description: "Production, manufacturing, and industrial operations",
    popular: ["Production", "Quality Control", "Operations"],
    color: "orange"
  },
  {
    id: 5,
    name: "Real Estate",
    icon: FiHome,
    count: 150,
    description: "Property development, management, and real estate services",
    popular: ["Property Management", "Development", "Sales"],
    color: "teal"
  },
  {
    id: 6,
    name: "Retail & E-commerce",
    icon: FiShoppingBag,
    count: 290,
    description: "Retail operations, e-commerce, and consumer goods",
    popular: ["E-commerce", "Retail Management", "Sales"],
    color: "pink"
  },
  {
    id: 7,
    name: "Education",
    icon: FiBook,
    count: 210,
    description: "Educational institutions, training, and e-learning",
    popular: ["Teaching", "Training", "E-learning"],
    color: "red"
  },
  {
    id: 8,
    name: "Consulting",
    icon: FiBriefcase,
    count: 170,
    description: "Business consulting, strategy, and professional services",
    popular: ["Business Consulting", "Strategy", "Advisory"],
    color: "gray"
  },
  {
    id: 9,
    name: "Human Resources",
    icon: FiUsers,
    count: 130,
    description: "HR management, recruitment, and talent development",
    popular: ["Recruitment", "HR Management", "Training"],
    color: "indigo"
  }
];

const colorClasses: Record<IndustryColor, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100",
  green: "bg-green-50 text-green-600 border-green-100 hover:bg-green-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100",
  pink: "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100",
  teal: "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100",
  red: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100",
  gray: "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100"
};

const Industries = () => {
  const t = useTranslations("Industries");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter industries based on search query
  const filteredIndustries = industries.filter(industry => {
    if (!debouncedSearchQuery) return true;

    const searchLower = debouncedSearchQuery.toLowerCase();
    return (
      industry.name.toLowerCase().includes(searchLower) ||
      industry.description.toLowerCase().includes(searchLower) ||
      industry.popular.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

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

      {/* Popular Industries Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("popular")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.slice(0, 3).map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.id}`}
              className={`block p-6 rounded-xl border transition-all duration-200 ${colorClasses[industry.color]
                }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/50">
                  <industry.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {industry.name}
                  </h3>
                  <p className="text-sm opacity-90 mb-3">
                    {industry.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industry.popular.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Industries Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("all")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/industries/${industry.id}`}
                className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses[industry.color]}`}>
                    <industry.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {industry.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {industry.count} {t("positions")}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {industry.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {industry.popular.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
