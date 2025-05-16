"use client";

import { useTranslations } from 'next-intl';
import { FiTarget, FiEye, FiUsers, FiAward } from 'react-icons/fi';

const About = () => {
  const t = useTranslations('About');

  const sections = [
    {
      icon: <FiTarget className="w-8 h-8 text-blue-500" />,
      title: t('mission'),
      content: t('missionContent'),
    },
    {
      icon: <FiEye className="w-8 h-8 text-purple-500" />,
      title: t('vision'),
      content: t('visionContent'),
    },
    {
      icon: <FiUsers className="w-8 h-8 text-green-500" />,
      title: t('team'),
      content: t('teamContent'),
    },
    {
      icon: <FiAward className="w-8 h-8 text-orange-500" />,
      title: t('values'),
      content: t('valuesContent'),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              {section.icon}
              <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('whyChooseUs')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">{t(`feature${item}Title`)}</h3>
              <p className="text-gray-600">{t(`feature${item}Description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 