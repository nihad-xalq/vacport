"use client";

import {
  FiTrendingUp,
  FiBarChart2,
  FiCalendar,
  FiUsers,
  FiBriefcase,
  FiAward,
  FiGlobe,
} from "react-icons/fi";
import { useTranslations } from "next-intl";
import { FC, JSX } from "react";

interface IndicatorData {
  label: string;
  value: number;
  icon: JSX.Element;
  description: string;
  color: string;
}

const Statistics: FC = () => {
  const t = useTranslations("Statistics");

  const indicators: IndicatorData[] = [
    {
      label: t("daily"),
      value: 7,
      icon: <FiTrendingUp className="w-7 h-7 text-blue-500" />,
      description: t("dailyDescription"),
      color: "from-blue-100 to-blue-50",
    },
    {
      label: t("weekly"),
      value: 38,
      icon: <FiBarChart2 className="w-7 h-7 text-green-500" />,
      description: t("weeklyDescription"),
      color: "from-green-100 to-green-50",
    },
    {
      label: t("monthly"),
      value: 142,
      icon: <FiCalendar className="w-7 h-7 text-purple-500" />,
      description: t("monthlyDescription"),
      color: "from-purple-100 to-purple-50",
    },
  ];

  const extraStats = [
    {
      label: t("activeUsers"),
      value: "1,250+",
      icon: <FiUsers className="w-5 h-5 text-blue-400" />,
      color: "text-blue-700",
    },
    {
      label: t("totalListings"),
      value: "2,800+",
      icon: <FiBriefcase className="w-5 h-5 text-green-400" />,
      color: "text-green-700",
    },
  ];

  const moreStats = [
    {
      label: t("premiumListings"),
      value: "15",
      icon: <FiAward className="w-5 h-5 text-yellow-500" />,
      color: "text-yellow-700",
    },
    {
      label: t("countries"),
      value: "4",
      icon: <FiGlobe className="w-5 h-5 text-indigo-400" />,
      color: "text-indigo-700",
    },
  ];

  const additionalStats = [
    {
      label: t("mostViewed"),
      value: t("frontendDeveloper"),
      icon: <FiTrendingUp className="w-5 h-5 text-orange-400" />,
      color: "text-orange-700",
    },
    {
      label: t("mostActiveCategory"),
      value: t("itTechnology"),
      icon: <FiBarChart2 className="w-5 h-5 text-cyan-400" />,
      color: "text-cyan-700",
    },
  ];

  return (
    <section className="w-full max-w-lg mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl font-extrabold text-blue-700">
          {t("title")}
        </span>
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
          {t("live")}
        </span>
      </div>

      {/* Main indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {indicators.map((item) => (
          <div
            key={item.label}
            className={`relative bg-gradient-to-br ${item.color} rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-100 transition-transform hover:scale-105 hover:shadow-lg`}
          >
            <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
              {item.icon}
            </div>
            <span className="text-4xl font-extrabold text-blue-700 drop-shadow mb-2 z-10">
              {item.value}
            </span>
            <span className="text-base font-semibold text-gray-700 z-10">
              {item.label}
            </span>
            <span className="mt-2 text-xs text-gray-500 text-center z-10">
              {item.description}
            </span>
          </div>
        ))}
      </div>

      {/* Extra stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {extraStats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 bg-white rounded-lg shadow px-6 py-4 border border-gray-100 h-[72px]"
          >
            <span className="flex-shrink-0">{stat.icon}</span>
            <span className={`font-bold text-lg ${stat.color} flex-shrink-0`}>
              {stat.value}
            </span>
            <span className="text-gray-500 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* More stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {moreStats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow px-6 py-4 border border-gray-100 h-[72px]"
          >
            <span className="flex-shrink-0">{stat.icon}</span>
            <span className={`font-bold text-lg ${stat.color} flex-shrink-0`}>
              {stat.value}
            </span>
            <span className="text-gray-500 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Additional stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {additionalStats.map((stat) => (
          <div
            key={stat.label}
            className="relative flex items-center gap-3 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl shadow-lg px-6 py-5 border border-gray-100 hover:shadow-xl transition-all group h-[100px]"
          >
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-pink-200 via-cyan-200 to-white rounded-full p-2 shadow group-hover:scale-110 transition-transform">
              {stat.icon}
            </span>
            <div className="ml-8">
              <span className={`font-bold text-lg ${stat.color}`}>
                {stat.value}
              </span>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
