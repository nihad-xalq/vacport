"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Dialog } from "@headlessui/react";
import { MdDone } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import {
    FiArrowLeft,
    FiCode,
    FiBriefcase,
    FiHeart,
    FiX,
    FiFlag,
    FiShare2,
    FiCopy,
    FiSend
} from "react-icons/fi";

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

// Mock data for categories (same as in Categories.tsx)
const categories = [
    {
        id: 1,
        name: "Software Development",
        icon: FiCode,
        count: 156,
        description: "Web, mobile, and software development positions",
        popular: ["Frontend", "Backend", "Full Stack", "DevOps"],
        color: "blue",
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
                position: "Backend Developer",
                company: "InnoWorks",
                location: "Remote",
                salary: "$2500-3500",
                employmentType: "Full-time",
                date: "1 week ago",
                logo: "https://randomuser.me/api/portraits/men/45.jpg",
                isPremium: false,
                description: "Join our backend team to build scalable APIs and microservices using Node.js and PostgreSQL.",
                requirements: [
                    "3+ years of Node.js experience",
                    "Experience with PostgreSQL or similar databases",
                    "Knowledge of RESTful APIs and microservices",
                    "Understanding of cloud platforms (AWS/Azure)"
                ],
                benefits: [
                    "Flexible working hours",
                    "Stock options",
                    "Annual bonus",
                    "Learning and development opportunities"
                ],
                email: "jobs@innoworks.com"
            }
        ]
    },
    {
        id: 2,
        name: "Business & Management",
        icon: FiBriefcase,
        count: 89,
        description: "Business, management, and administrative roles",
        popular: ["Project Manager", "Business Analyst", "Product Owner"],
        color: "green",
        vacancies: [
            {
                id: 3,
                position: "Project Manager",
                company: "BizSoft",
                location: "Baku, Azerbaijan",
                salary: "$2800-4000",
                employmentType: "Full-time",
                date: "3 days ago",
                logo: "https://randomuser.me/api/portraits/women/44.jpg",
                isPremium: false,
                description: "Lead and manage software development projects from inception to delivery.",
                requirements: [
                    "5+ years of project management experience",
                    "PMP certification preferred",
                    "Strong communication skills",
                    "Experience with Agile methodologies"
                ],
                benefits: [
                    "Competitive compensation",
                    "Flexible work hours",
                    "Health insurance",
                    "Professional development"
                ],
                email: "careers@bizsoft.com"
            }
        ]
    }
];

const CategoryPage = () => {
    const params = useParams();
    const t = useTranslations("Categories");
    const tCommon = useTranslations("common");
    const tVacancies = useTranslations("Vacancies");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"description" | "other">("description");
    const [showEmail, setShowEmail] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [showCopyTooltip, setShowCopyTooltip] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);
    const [showComplaintModal, setShowComplaintModal] = useState(false);
    const [complaintReason, setComplaintReason] = useState("");
    const [complaintDetails, setComplaintDetails] = useState("");
    const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);
    const [complaintSubmitted, setComplaintSubmitted] = useState(false);

    const category = categories.find(cat => cat.id === Number(params.id));

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(favId => favId !== id)
                : [...prev, id]
        );
    };

    // Get other vacancies from the same company
    const getOtherVacancies = (currentVacancy: Vacancy) => {
        return category?.vacancies.filter(v =>
            v.company === currentVacancy.company && v.id !== currentVacancy.id
        ) || [];
    };

    // Handle email copy
    const handleCopyEmail = () => {
        if (selectedVacancy?.email) {
            navigator.clipboard.writeText(selectedVacancy.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Share vacancy (copy link to clipboard)
    const handleShare = () => {
        if (selectedVacancy) {
            navigator.clipboard.writeText(
                window.location.href + `#vacancy-${selectedVacancy.id}`
            );
            setShowShareTooltip(true);
            setTimeout(() => setShowShareTooltip(false), 1500);
        }
    };

    // Handle complaint
    const handleComplaint = () => {
        setShowComplaintModal(true);
        setComplaintReason("");
        setComplaintDetails("");
        setComplaintSubmitted(false);
    };

    const handleSubmitComplaint = async () => {
        if (!complaintReason || !complaintDetails) return;

        setIsSubmittingComplaint(true);
        try {
            // Here you would typically send the complaint to your backend
            // For now, we'll just simulate a successful submission
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setComplaintSubmitted(true);
            setTimeout(() => {
                setShowComplaintModal(false);
                setComplaintSubmitted(false);
            }, 2000);
        } catch (error) {
            console.error("Error submitting complaint:", error);
        } finally {
            setIsSubmittingComplaint(false);
        }
    };

    // Keyboard shortcuts for modal
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter" && selectedVacancy) {
                if (selectedVacancy.applyLink) {
                    window.open(selectedVacancy.applyLink, "_blank");
                } else if (selectedVacancy.email) {
                    setShowEmail((prev) => !prev);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, selectedVacancy]);

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {tCommon("noResults")}
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {t("categoryNotFound")}
                    </p>
                    <Link
                        href="/categories"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 mb-6 shadow-sm group"
                    >
                        <FiArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                        {tCommon("back")}
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = category.icon;
    const otherVacancies = selectedVacancy ? getOtherVacancies(selectedVacancy) : [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back button */}
            <Link
                href="/categories"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 mb-6 shadow-sm group"
            >
                <FiArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                {tCommon("back")}
            </Link>

            {/* Category Header */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-lg ${category.color === 'blue' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                        <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {category.name}
                        </h1>
                        <p className="text-gray-600 mb-4">
                            {category.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {category.popular.map((tag, index) => (
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
                            {category.count}
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
                {category.vacancies.map((vacancy) => (
                    <div
                        key={vacancy.id}
                        onClick={() => {
                            setSelectedVacancy(vacancy);
                            setOpen(true);
                            setActiveTab("description");
                            setShowEmail(false);
                        }}
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

            {/* Vacancy Details Modal */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="fixed z-50 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
                    <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-0 z-50 flex flex-col focus:outline-none"
                        tabIndex={-1}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            aria-label={tCommon("cancel")}
                        >
                            <FiX className="w-5 h-5 text-gray-500" />
                        </button>

                        <div className="p-6">
                            {/* Top section: company name/logo, position, deadline */}
                            {selectedVacancy && (
                                <>
                                    <div className="flex items-center gap-3 mb-2 w-full justify-between">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={selectedVacancy.logo}
                                                alt={selectedVacancy.company}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full object-cover border"
                                            />
                                            <span className="font-semibold text-gray-700 text-base">
                                                {selectedVacancy.company}
                                            </span>
                                        </div>
                                        {/* <span className="flex items-center gap-1 text-gray-400 text-xs">
                                            <FiHeart className="w-4 h-4" />
                                            355
                                        </span> */}
                                    </div>
                                    <div className="w-full flex flex-col items-start">
                                        <span className="text-2xl font-bold text-gray-900 mb-1">
                                            {selectedVacancy.position}
                                        </span>
                                        {selectedVacancy.date && (
                                            <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded mb-2">
                                                <FiFlag className="w-4 h-4 text-orange-400" />
                                                {tVacancies("details.deadline")} {selectedVacancy.date}
                                            </span>
                                        )}
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex relative w-full border-b">
                                        <button
                                            className={`py-2 px-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === "description"
                                                ? "border-blue-600 text-blue-600"
                                                : "border-transparent text-gray-500 hover:text-blue-600"
                                                }`}
                                            onClick={() => setActiveTab("description")}
                                        >
                                            {tVacancies("details.description")}
                                        </button>
                                        <button
                                            className={`py-2 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "other"
                                                ? "border-blue-600 text-blue-600"
                                                : "border-transparent text-gray-500 hover:text-blue-600"
                                                }`}
                                            onClick={() => setActiveTab("other")}
                                        >
                                            {tVacancies("details.otherVacancies")}
                                            {otherVacancies.length > 0 && (
                                                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                                    {otherVacancies.length}
                                                </span>
                                            )}
                                        </button>
                                    </div>

                                    {/* Tab content */}
                                    <div className="py-4">
                                        <AnimatePresence mode="wait">
                                            {activeTab === "description" ? (
                                                <motion.div
                                                    key="description"
                                                    initial={{ opacity: 0, x: 40 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -40 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {selectedVacancy.isPremium && (
                                                        <span className="inline-block mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-xs text-white font-extrabold px-2 py-0.5 rounded shadow border-2 border-yellow-500">
                                                            ★ Premium
                                                        </span>
                                                    )}
                                                    {selectedVacancy.location && (
                                                        <div className="mb-2 text-sm text-gray-600">
                                                            <span className="font-semibold">
                                                                {tVacancies("details.location")}:
                                                            </span>{" "}
                                                            {selectedVacancy.location}
                                                        </div>
                                                    )}
                                                    {selectedVacancy.salary && (
                                                        <div className="mb-2 text-sm text-gray-600">
                                                            <span className="font-semibold">
                                                                {tVacancies("details.salary")}:
                                                            </span>{" "}
                                                            {selectedVacancy.salary}
                                                        </div>
                                                    )}
                                                    {selectedVacancy.employmentType && (
                                                        <div className="mb-2 text-sm text-gray-600">
                                                            <span className="font-semibold">
                                                                {tVacancies("details.employmentType")}:
                                                            </span>{" "}
                                                            {selectedVacancy.employmentType}
                                                        </div>
                                                    )}
                                                    {selectedVacancy.description && (
                                                        <div className="mb-4 text-gray-700">
                                                            <span className="font-semibold">
                                                                {tVacancies("details.description")}:
                                                            </span>{" "}
                                                            {selectedVacancy.description}
                                                        </div>
                                                    )}
                                                    {selectedVacancy.requirements && (
                                                        <div className="mb-2">
                                                            <div className="font-semibold text-gray-700 mb-1">
                                                                {tVacancies("details.requirements")}:
                                                            </div>
                                                            <ul className="list-disc list-inside text-sm text-gray-600">
                                                                {selectedVacancy.requirements.map((req, idx) => (
                                                                    <li key={idx}>{req}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {selectedVacancy.benefits && (
                                                        <div className="mb-4">
                                                            <div className="font-semibold text-gray-700 mb-1">
                                                                {tVacancies("details.benefits")}:
                                                            </div>
                                                            <ul className="list-disc list-inside text-sm text-gray-600">
                                                                {selectedVacancy.benefits.map((ben, idx) => (
                                                                    <li key={idx}>{ben}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="other"
                                                    initial={{ opacity: 0, x: -40 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 40 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="flex flex-col gap-4"
                                                >
                                                    {otherVacancies.length === 0 ? (
                                                        <div className="text-gray-500 text-sm">
                                                            {tVacancies("details.noOtherVacancies")}
                                                        </div>
                                                    ) : (
                                                        otherVacancies.map((vac) => (
                                                            <div
                                                                key={vac.id}
                                                                className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 cursor-pointer hover:bg-blue-50 transition shadow-sm"
                                                                onClick={() => {
                                                                    setSelectedVacancy(vac);
                                                                    setActiveTab("description");
                                                                    setShowEmail(false);
                                                                }}
                                                            >
                                                                <Image
                                                                    src={vac.logo}
                                                                    alt={vac.company}
                                                                    className="w-10 h-10 rounded-full object-cover mr-3 border"
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="font-semibold text-base truncate">
                                                                        {vac.position}
                                                                    </div>
                                                                    <div className="text-gray-500 text-xs truncate">
                                                                        {vac.company}
                                                                    </div>
                                                                </div>
                                                                <span className="text-xs text-gray-400">
                                                                    {vac.date}
                                                                </span>
                                                            </div>
                                                        ))
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Telegram CTA */}
                                    <div className="bg-blue-50 flex items-center gap-3 px-4 py-3 border-t border-blue-100">
                                        <span className="bg-blue-100 rounded-full p-2">
                                            <FiSend className="w-6 h-6 text-blue-500" />
                                        </span>
                                        <span className="text-sm text-blue-900">
                                            {tVacancies("details.telegramCTA")}
                                        </span>
                                    </div>

                                    {/* Bottom actions */}
                                    <div className="flex items-center justify-between py-4 border-t">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={handleComplaint}
                                                className="p-2 hover:bg-gray-100 rounded-full transition"
                                                title={tVacancies("details.complain")}
                                            >
                                                <FiFlag className="w-5 h-5 text-gray-400" />
                                            </button>
                                            <button
                                                onClick={handleShare}
                                                className="p-2 hover:bg-gray-100 rounded-full transition relative"
                                                title={tVacancies("details.share")}
                                            >
                                                <FiShare2 className="w-5 h-5 text-gray-400" />
                                                {showShareTooltip && (
                                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg">
                                                        {tVacancies("details.linkCopied")}
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <button
                                                className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 shadow transition ${loading ? "opacity-60 cursor-not-allowed" : ""
                                                    }`}
                                                onClick={async () => {
                                                    if (loading) return;
                                                    setLoading(true);
                                                    if (selectedVacancy.applyLink) {
                                                        window.open(selectedVacancy.applyLink, "_blank");
                                                        setLoading(false);
                                                    } else if (selectedVacancy.email) {
                                                        setShowEmail((prev) => !prev);
                                                        setLoading(false);
                                                    }
                                                }}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <svg
                                                        className="animate-spin h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v8z"
                                                        ></path>
                                                    </svg>
                                                ) : (
                                                    <span>{tVacancies("details.apply")}</span>
                                                )}
                                            </button>
                                            {/* Email reveal and tooltip */}
                                            <AnimatePresence>
                                                {showEmail && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute right-0 bottom-full mb-2 w-72 bg-white rounded-lg shadow-lg border p-3"
                                                    >
                                                        <p className="text-sm text-gray-600 mb-2">
                                                            {tVacancies("details.emailInstructions")}
                                                        </p>
                                                        <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {selectedVacancy.email}
                                                            </span>
                                                            <button
                                                                onClick={handleCopyEmail}
                                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                            >
                                                                {copied ? (
                                                                    // tVacancies("details.copied")
                                                                    <MdDone />
                                                                ) : (
                                                                    //   <span className="flex items-center gap-1">
                                                                    //     <FiCopy className="w-4 h-4" />
                                                                    //     {tVacancies("details.copyToClipboard")}
                                                                    //   </span>

                                                                    <FiCopy className="w-4 h-4" />

                                                                )}
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* Complaint Modal */}
            <Dialog
                open={showComplaintModal}
                onClose={() => !isSubmittingComplaint && setShowComplaintModal(false)}
                className="fixed z-50 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
                    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {tVacancies("complaint.title")}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {tVacancies("complaint.description")}
                        </p>

                        {complaintSubmitted ? (
                            <div className="mt-4 text-center">
                                <div className="text-green-600 font-medium mb-2">
                                    {tVacancies("complaint.submitted")}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {tVacancies("complaint.thankYou")}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {tVacancies("complaint.reason")}
                                    </label>
                                    <select
                                        value={complaintReason}
                                        onChange={(e) => setComplaintReason(e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg"
                                    >
                                        <option value="">{tVacancies("complaint.selectReason")}</option>
                                        <option value="fake">{tVacancies("complaint.reasons.fake")}</option>
                                        <option value="inappropriate">
                                            {tVacancies("complaint.reasons.inappropriate")}
                                        </option>
                                        <option value="expired">
                                            {tVacancies("complaint.reasons.expired")}
                                        </option>
                                        <option value="other">{tVacancies("complaint.reasons.other")}</option>
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {tVacancies("complaint.details")}
                                    </label>
                                    <textarea
                                        value={complaintDetails}
                                        onChange={(e) => setComplaintDetails(e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg h-24 resize-none"
                                        placeholder={tVacancies("complaint.detailsPlaceholder")}
                                    />
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowComplaintModal(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                        disabled={isSubmittingComplaint}
                                    >
                                        {tCommon("cancel")}
                                    </button>
                                    <button
                                        onClick={handleSubmitComplaint}
                                        disabled={!complaintReason || !complaintDetails || isSubmittingComplaint}
                                        className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                                    >
                                        {isSubmittingComplaint ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8z"
                                                    ></path>
                                                </svg>
                                                {tVacancies("complaint.submitting")}
                                            </>
                                        ) : (
                                            tVacancies("complaint.submit")
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default CategoryPage; 