"use client";

import { FiArrowLeft, FiCode, FiDollarSign, FiHeart } from "react-icons/fi";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";

// Types
interface Vacancy {
  id: number;
  position: string;
  company: string;
  logo: string;
  date: string;
  isPremium: boolean;
  description?: string;
  location?: string;
  salary?: string;
  employmentType?: string;
  requirements?: string[];
  benefits?: string[];
  applyLink?: string;
  email?: string;
}

interface Industry {
  id: number;
  name: string;
  icon: IconType;
  count: number;
  description: string;
  popular: string[];
  color: string;
  vacancies?: Vacancy[];
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
    color: "blue",
    vacancies: [
      {
        id: 1,
        position: "Senior Software Engineer",
        company: "TechCorp",
        location: "Baku, Azerbaijan",
        salary: "$3500-5000",
        employmentType: "Full-time",
        date: "2 days ago",
        logo: "https://randomuser.me/api/portraits/men/32.jpg",
        isPremium: true,
        description: "We are looking for an experienced Software Engineer to join our team. You will be responsible for developing high-performance applications.",
        requirements: [
          "8+ years of software development experience",
          "Strong knowledge of multiple programming languages",
          "Experience with microservices architecture",
          "Understanding of cloud platforms (AWS/Azure)"
        ],
        benefits: [
          "Competitive salary",
          "Remote work options",
          "Health insurance",
          "Professional development budget"
        ],
        email: "careers@techcorp.com"
      },
      {
        id: 2,
        position: "DevOps Engineer",
        company: "CloudTech",
        location: "Remote",
        salary: "$3000-4500",
        employmentType: "Full-time",
        date: "1 week ago",
        logo: "https://randomuser.me/api/portraits/men/45.jpg",
        isPremium: false,
        description: "Join our DevOps team to build and maintain our cloud infrastructure.",
        requirements: [
          "5+ years of DevOps experience",
          "Strong knowledge of AWS/Azure",
          "Experience with CI/CD pipelines",
          "Infrastructure as Code expertise"
        ],
        benefits: [
          "Flexible working hours",
          "Stock options",
          "Annual bonus",
          "Learning budget"
        ],
        email: "jobs@cloudtech.com"
      }
    ]
  },
  {
    id: 2,
    name: "Finance & Banking",
    icon: FiDollarSign,
    count: 280,
    description: "Banking, financial services, and investment management",
    popular: ["Banking", "Investment", "Financial Analysis"],
    color: "green",
    vacancies: [
      {
        id: 3,
        position: "Financial Analyst",
        company: "BankCorp",
        location: "Baku, Azerbaijan",
        salary: "$2800-4000",
        employmentType: "Full-time",
        date: "3 days ago",
        logo: "https://randomuser.me/api/portraits/women/44.jpg",
        isPremium: false,
        description: "Analyze financial data and prepare reports for management decision-making.",
        requirements: [
          "3+ years of financial analysis experience",
          "Strong Excel and financial modeling skills",
          "Bachelor's degree in Finance or related field",
          "CFA certification is a plus"
        ],
        benefits: [
          "Competitive compensation",
          "Health insurance",
          "Professional certifications support",
          "Career development opportunities"
        ],
        email: "careers@bankcorp.com"
      }
    ]
  }
];

const IndustryPage = () => {
  const params = useParams();
  const t = useTranslations("Industries");
  const tCommon = useTranslations("common");
  // const tVacancies = useTranslations("Vacancies");
  const [favorites, setFavorites] = useState<number[]>([]);

  const industry = industries.find(ind => ind.id === Number(params.id));

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  if (!industry) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {tCommon("noResults")}
          </h2>
          <p className="text-gray-600 mb-8">
            {t("industryNotFound")}
          </p>
          <Link
            href="/industries"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 mb-6 shadow-sm group"
          >
            <FiArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            {tCommon("back")}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        href="/industries"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 mb-6 shadow-sm group"
      >
        <FiArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
        {tCommon("back")}
      </Link>

      {/* Industry Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-lg bg-${industry.color}-50`}>
            <Icon className={`w-8 h-8 text-${industry.color}-600`} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {industry.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {industry.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {industry.popular.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {industry.count}
            </div>
            <div className="text-sm text-gray-500">
              {t("positions")}
            </div>
          </div>
        </div>
      </div>

      {/* Vacancies List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t("availablePositions")}
        </h2>
        {industry.vacancies?.map((vacancy) => (
          <div
            key={vacancy.id}
            className={`relative flex items-center bg-white rounded-lg shadow-sm px-4 py-3 border ${vacancy.isPremium ? "border-yellow-400" : "border-gray-200"
              } hover:bg-gray-50 cursor-pointer transition-colors`}
          >
            {vacancy.isPremium && (
              <span
                className="absolute top-0 right-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-[10px] text-white font-extrabold px-1 py-0.5 z-10 shadow-lg border-2 border-yellow-500"
                style={{ borderRadius: "0 0 8px 8px", letterSpacing: "1px" }}
              >
                ★ Premium
              </span>
            )}
            <Image
              src={vacancy.logo}
              alt={vacancy.company}
              className="w-12 h-12 rounded-full object-cover mr-4 border"
              width={48}
              height={48}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg truncate">
                  {vacancy.position}
                </span>
              </div>
              <div className="text-gray-500 text-sm truncate">
                {vacancy.company}
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span>{vacancy.location}</span>
                <span>•</span>
                <span>{vacancy.employmentType}</span>
                <span>•</span>
                <span>{vacancy.salary}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {vacancy.date}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(vacancy.id);
                }}
                className="ml-2 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
                aria-label={tCommon("save")}
              >
                <FiHeart
                  className={`w-5 h-5 ${favorites.includes(vacancy.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400"
                    }`}
                  fill={favorites.includes(vacancy.id) ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryPage; 