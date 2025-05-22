"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiCode,
  FiBriefcase,
  FiDatabase,
  FiPenTool,
  FiTrendingUp,
  FiServer,
  FiSmartphone,
  FiShield,
  FiCloud
} from "react-icons/fi";

type CategoryColor = "blue" | "green" | "purple" | "pink" | "orange" | "teal" | "red" | "gray" | "indigo";

interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
  count: number;
  description: string;
  popular: string[];
  color: CategoryColor;
}

// Mock data for categories
const categories: Category[] = [
  {
    id: 1,
    name: "Software Development",
    icon: FiCode,
    count: 156,
    description: "Web, mobile, and software development positions",
    popular: ["Frontend", "Backend", "Full Stack", "DevOps"],
    color: "blue"
  },
  {
    id: 2,
    name: "Business & Management",
    icon: FiBriefcase,
    count: 89,
    description: "Business, management, and administrative roles",
    popular: ["Project Manager", "Business Analyst", "Product Owner"],
    color: "green"
  },
  {
    id: 3,
    name: "Data Science",
    icon: FiDatabase,
    count: 67,
    description: "Data analysis, machine learning, and AI positions",
    popular: ["Data Analyst", "Data Scientist", "ML Engineer"],
    color: "purple"
  },
  {
    id: 4,
    name: "Design",
    icon: FiPenTool,
    count: 45,
    description: "UI/UX, graphic design, and creative positions",
    popular: ["UI Designer", "UX Designer", "Graphic Designer"],
    color: "pink"
  },
  {
    id: 5,
    name: "Marketing",
    icon: FiTrendingUp,
    count: 78,
    description: "Digital marketing, SEO, and content creation",
    popular: ["Digital Marketer", "Content Writer", "SEO Specialist"],
    color: "orange"
  },
  {
    id: 6,
    name: "IT & Networking",
    icon: FiServer,
    count: 92,
    description: "System administration and networking positions",
    popular: ["System Admin", "Network Engineer", "IT Support"],
    color: "teal"
  },
  {
    id: 7,
    name: "Mobile Development",
    icon: FiSmartphone,
    count: 54,
    description: "iOS, Android, and cross-platform development",
    popular: ["iOS Developer", "Android Developer", "React Native"],
    color: "red"
  },
  {
    id: 8,
    name: "Security",
    icon: FiShield,
    count: 34,
    description: "Information security and cybersecurity roles",
    popular: ["Security Engineer", "Penetration Tester", "Security Analyst"],
    color: "gray"
  },
  {
    id: 9,
    name: "Cloud Computing",
    icon: FiCloud,
    count: 88,
    description: "Cloud infrastructure and DevOps positions",
    popular: ["Cloud Engineer", "AWS Specialist", "DevOps Engineer"],
    color: "indigo"
  }
];

const colorClasses: Record<CategoryColor, string> = {
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

const Categories = () => {
  const t = useTranslations("Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [, setSelectedCategory] = useState<number | null>(null);

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.popular.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h1>
        <p className="text-lg text-gray-600 mb-6">{t("description")}</p>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <motion.div
            key={category.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/categories/${category.id}`}
              className={`block p-6 rounded-xl border transition-all duration-200 ${colorClasses[category.color]} cursor-pointer`}
              onMouseEnter={() => setSelectedCategory(category.id)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/80 backdrop-blur">
                  <category.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold">
                  {category.count} {t("positions")}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-sm opacity-90 mb-4">{category.description}</p>

              <div className="flex flex-wrap gap-2">
                {category.popular.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-white/50 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* No results */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("noResults")}
          </h3>
          <p className="text-gray-600">
            {t("tryDifferent")}
          </p>
        </div>
      )}
    </section>
  );
};

export default Categories;
