"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FiArrowLeft, FiMapPin, FiUsers, FiGlobe, FiCalendar, FiHeart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
  about?: string;
  vacancies?: Vacancy[];
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
    featured: true,
    about: "TechCorp is a leading software development company that has been delivering innovative enterprise solutions since 2010. With a team of over 500 talented professionals, we specialize in creating cutting-edge software solutions that help businesses transform and grow in the digital age.",
    vacancies: [
      {
        id: 1,
        position: "Senior Frontend Developer",
        company: "TechCorp",
        location: "Baku, Azerbaijan",
        salary: "$3000-4500",
        employmentType: "Full-time",
        date: "2 days ago",
        logo: "https://randomuser.me/api/portraits/men/32.jpg",
        isPremium: true,
        description: "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces for web applications using React and TypeScript.",
        requirements: [
          "5+ years of experience with React",
          "Strong knowledge of TypeScript",
          "Experience with state management (Redux, MobX)",
          "Understanding of modern web technologies and best practices"
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
        company: "TechCorp",
        location: "Remote",
        salary: "$3000-4500",
        employmentType: "Full-time",
        date: "1 week ago",
        logo: "https://randomuser.me/api/portraits/men/32.jpg",
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
        email: "jobs@techcorp.com"
      }
    ]
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
    featured: true,
    about: "BankCorp is one of Azerbaijan's largest and most trusted financial institutions. Since 1995, we have been providing comprehensive banking services to individuals and businesses. Our commitment to innovation and customer service has made us a leader in the banking sector.",
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

const CompanyPage = () => {
  const params = useParams();
  const t = useTranslations("Companies");
  const tCommon = useTranslations("common");
  const [favorites, setFavorites] = useState<number[]>([]);

  const company = companies.find(comp => comp.id === Number(params.id));

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {tCommon("noResults")}
          </h2>
          <p className="text-gray-600 mb-8">
            {t("companyNotFound")}
          </p>
          <Link
            href="/companies"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 mb-6 shadow-sm group"
          >
            <FiArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            {tCommon("back")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        href="/companies"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 mb-6 shadow-sm group"
      >
        <FiArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
        {tCommon("back")}
      </Link>

      {/* Company Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="flex items-start gap-6">
          <Image
            src={company.logo}
            alt={company.name}
            width={96}
            height={96}
            className="rounded-xl border"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {company.name}
              </h1>
              <button
                onClick={() => toggleFavorite(company.id)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FiHeart
                  className={`w-6 h-6 ${
                    favorites.includes(company.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }`}
                  fill={favorites.includes(company.id) ? "currentColor" : "none"}
                />
              </button>
            </div>
            <p className="text-gray-600 mt-2">
              {company.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
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
          </div>
        </div>
      </div>

      {/* About Section */}
      {company.about && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t("details.about")}
          </h2>
          <p className="text-gray-600">
            {company.about}
          </p>
        </div>
      )}

      {/* Vacancies List */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {t("details.vacancies")}
        </h2>
        <div className="space-y-4">
          {company.vacancies?.map((vacancy) => (
            <div
              key={vacancy.id}
              className={`relative flex items-center bg-white rounded-lg shadow-sm px-4 py-3 border ${
                vacancy.isPremium ? "border-yellow-400" : "border-gray-200"
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg truncate">
                    {vacancy.position}
                  </span>
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
                    className={`w-5 h-5 ${
                      favorites.includes(vacancy.id)
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
    </div>
  );
};

export default CompanyPage; 