"use client";

import { FiStar, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

interface Offer {
  id: number;
  title: string;
  description: string;
  expiresAt: string;
  terms: string[];
  isPremium: boolean;
  isNew: boolean;
}

const Offers = () => {
  const t = useTranslations("Offers");

  const offers: Offer[] = [
    {
      id: 1,
      title: t("premiumListing.title"),
      description: t("premiumListing.description"),
      expiresAt: "2024-12-31",
      terms: [
        t("premiumListing.terms.featured"),
        t("premiumListing.terms.priority"),
        t("premiumListing.terms.analytics"),
        t("premiumListing.terms.support"),
      ],
      isPremium: true,
      isNew: true,
    },
    {
      id: 2,
      title: t("bundlePack.title"),
      description: t("bundlePack.description"),
      expiresAt: "2024-08-31",
      terms: [
        t("bundlePack.terms.multiple"),
        t("bundlePack.terms.discount"),
        t("bundlePack.terms.flexibility"),
        t("bundlePack.terms.validity"),
      ],
      isPremium: true,
      isNew: false,
    },
    {
      id: 3,
      title: t("startupPack.title"),
      description: t("startupPack.description"),
      expiresAt: "2024-10-31",
      terms: [
        t("startupPack.terms.basic"),
        t("startupPack.terms.visibility"),
        t("startupPack.terms.support"),
        t("startupPack.terms.upgrade"),
      ],
      isPremium: false,
      isNew: true,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
        <p className="text-lg text-gray-600">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${
              offer.isPremium ? "border-2 border-blue-500" : ""
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {offer.title}
                </h2>
                {offer.isNew && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {t("new")}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6">{offer.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <FiClock className="w-4 h-4" />
                <span>
                  {t("expires")}: {formatDate(offer.expiresAt)}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {offer.terms.map((term, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{term}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  offer.isPremium
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {t("getStarted")}
              </button>
            </div>

            {offer.isPremium && (
              <div className="bg-blue-50 p-4 border-t border-blue-100">
                <div className="flex items-center gap-2 text-blue-700">
                  <FiStar className="w-5 h-5" />
                  <span className="font-semibold">{t("premiumFeature")}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-yellow-50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <FiAlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("terms.title")}
            </h3>
            <p className="text-gray-600">{t("terms.description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
