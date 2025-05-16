"use client";

import { FiBriefcase, FiDroplet, FiList, FiMapPin, FiMail } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { AiFillBank } from "react-icons/ai";
import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Link from "next/link";

interface NavItem {
    label: string;
    href: string;
    icon: ReactNode;
    badge?: string;
}

const mainNavItems: NavItem[] = [
    {
        label: "Elanlar",
        href: "/vacancies",
        icon: <FiBriefcase className="w-5 h-5" />,
    },
    {
        label: "Kateqoriyalar",
        href: "/categories",
        icon: <FiDroplet className="w-5 h-5" />,
    },
    {
        label: "Sənaye",
        href: "/industries",
        icon: <FiList className="w-5 h-5" />,
    },
    {
        label: "Şirkətlər",
        href: "/companies",
        icon: <AiFillBank className="w-5 h-5" />,
    },
];

const secondaryNavItems: NavItem[] = [
    {
        label: "Seçilmiş elanlar",
        href: "/favorites",
        icon: <FiMapPin className="w-5 h-5" />,
        badge: "0",
    },
    {
        label: "Abunə - kateqoriyalar",
        href: "/subscriptions",
        icon: <FiMail className="w-5 h-5" />,
    },
];

const Sidebar: FC = () => {
    const pathname = usePathname();

    return (
        <aside className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4">
            {/* Top Section: Logo and Language */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-bold text-blue-700">Vac<span className="text-green-500">Portal</span></span>
                    <button className="border rounded-md px-2 py-1 text-xs text-gray-600">AZ ▼</button>
                </div>
                {/* Main Navigation */}
                <nav className="flex flex-col gap-2">
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${isActive ? "bg-blue-600 text-white" : "text-black hover:bg-gray-100"}`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                {/* Sizin JobSearch Section */}
                <div className="mt-8">
                    <div className="text-xs text-gray-400 mb-2">Sizin JobSearch</div>
                    <nav className="flex flex-col gap-2">
                        {secondaryNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-black ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                                >
                                    {item.icon}
                                    {item.label}
                                    {item.badge && (
                                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2">{item.badge}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                {/* Light/Dark Mode Toggle */}
                <div className="mt-8 flex items-center">
                    <button className="flex items-center gap-1 bg-gray-100 border rounded-lg px-3 py-2">
                        <span className="text-lg">🌞</span>
                        <span className="text-lg">🌙</span>
                    </button>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </aside>
    );
};

export default Sidebar; 