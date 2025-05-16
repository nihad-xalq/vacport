import { FiTrendingUp, FiBarChart2, FiCalendar, FiUsers, FiBriefcase, FiAward, FiGlobe } from "react-icons/fi";
import { FC, JSX } from "react";

interface IndicatorData {
    label: string;
    value: number;
    icon: JSX.Element;
    description: string;
    color: string;
}

const indicators: IndicatorData[] = [
    {
        label: "Günlük",
        value: 7,
        icon: <FiTrendingUp className="w-7 h-7 text-blue-500" />,
        description: "Bu gün əlavə olunan yeni elanlar",
        color: "from-blue-100 to-blue-50",
    },
    {
        label: "Həftəlik",
        value: 38,
        icon: <FiBarChart2 className="w-7 h-7 text-green-500" />,
        description: "Son 7 gündə əlavə olunan elanlar",
        color: "from-green-100 to-green-50",
    },
    {
        label: "Aylıq",
        value: 142,
        icon: <FiCalendar className="w-7 h-7 text-purple-500" />,
        description: "Son 30 gündə əlavə olunan elanlar",
        color: "from-purple-100 to-purple-50",
    },
];

const extraStats = [
    {
        label: "Aktiv istifadəçi",
        value: "1,250+",
        icon: <FiUsers className="w-5 h-5 text-blue-400" />,
        color: "text-blue-700",
    },
    {
        label: "Ümumi elan",
        value: "2,800+",
        icon: <FiBriefcase className="w-5 h-5 text-green-400" />,
        color: "text-green-700",
    },
];

const moreStats = [
    {
        label: "Premium elanlar",
        value: "15",
        icon: <FiAward className="w-5 h-5 text-yellow-500" />,
        color: "text-yellow-700",
    },
    {
        label: "Ölkələr üzrə elanlar",
        value: "4",
        icon: <FiGlobe className="w-5 h-5 text-indigo-400" />,
        color: "text-indigo-700",
    },
];

const additionalStats = [
    // {
    //     label: "Yeni şirkət sayı",
    //     value: "8",
    //     icon: <FiUsers className="w-5 h-5 text-pink-400" />,
    //     color: "text-pink-700",
    // },
    {
        label: "Ən çox baxılan elan",
        value: "Frontend Developer",
        icon: <FiTrendingUp className="w-5 h-5 text-orange-400" />,
        color: "text-orange-700",
    },
    {
        label: "Ən aktiv kateqoriya",
        value: "IT & Texnologiya",
        icon: <FiBarChart2 className="w-5 h-5 text-cyan-400" />,
        color: "text-cyan-700",
    },
];

const Statistics: FC = () => {
    return (
        <section className="w-full max-w-3xl mx-auto p-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-extrabold text-blue-700">Statistika</span>
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">Canlı</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {indicators.map((item) => (
                    <div
                        key={item.label}
                        className={`relative bg-gradient-to-br ${item.color} rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-100 transition-transform hover:scale-105 hover:shadow-lg`}
                    >
                        <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
                            {item.icon}
                        </div>
                        <span className="text-4xl font-extrabold text-blue-700 drop-shadow mb-2 z-10">{item.value}</span>
                        <span className="text-base font-semibold text-gray-700 z-10">{item.label}</span>
                        <span className="mt-2 text-xs text-gray-500 text-center z-10">{item.description}</span>
                    </div>
                ))}
            </div>
            {/* Bottom section: extra stats and a decorative element */}
            <div className="mt-10 flex flex-col items-center">
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                    {extraStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-3 bg-white rounded-lg shadow px-5 py-3 border border-gray-100"
                        >
                            <span>{stat.icon}</span>
                            <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                            <span className="text-gray-500 text-sm">{stat.label}</span>
                        </div>
                    ))}
                </div>
                <div className="opacity-70">
                    <svg width="180" height="32" viewBox="0 0 180 32" fill="none">
                        <ellipse cx="90" cy="16" rx="90" ry="16" fill="#3B82F6" fillOpacity="0.08" />
                    </svg>
                </div>
                {/* Added: More statistics below */}
                <div className="mt-8 w-full flex flex-col sm:flex-row gap-6 justify-center items-center">
                    {moreStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow px-5 py-3 border border-gray-100"
                        >
                            <span>{stat.icon}</span>
                            <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                            <span className="text-gray-500 text-sm">{stat.label}</span>
                        </div>
                    ))}
                </div>
                {/* Additional statistics below */}
                <div className="mt-12 w-full">
                    {/* <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-pulse"></span>
                        Son əlavə olunanlar
                    </h3> */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        {additionalStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="relative w-full flex items-center gap-3 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl shadow-lg px-6 py-5 border border-gray-100 hover:shadow-xl transition-all group min-w-[220px]"
                            >
                                <span className="absolute -left-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-pink-200 via-cyan-200 to-white rounded-full p-2 shadow group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </span>
                                <div className="ml-8">
                                    <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                                    <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
