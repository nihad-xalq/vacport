"use client";

import { FiHeart, FiX, FiPrinter, FiFlag, FiSend, FiShare2, FiCopy } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FC, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

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

// Generate 50 mock vacancies
const companies = [
    { name: "TechCorp", logo: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "BizSoft", logo: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "InnoWorks", logo: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "AlphaGroup", logo: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "NextGen", logo: "https://randomuser.me/api/portraits/men/12.jpg" },
    { name: "DataWave", logo: "https://randomuser.me/api/portraits/women/23.jpg" },
    { name: "Cloudify", logo: "https://randomuser.me/api/portraits/men/56.jpg" },
    { name: "GreenTech", logo: "https://randomuser.me/api/portraits/women/78.jpg" },
    { name: "FinEdge", logo: "https://randomuser.me/api/portraits/men/88.jpg" },
    { name: "Marketly", logo: "https://randomuser.me/api/portraits/women/90.jpg" },
];

const positions = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Project Manager",
    "QA Engineer",
    "DevOps Engineer",
    "Product Owner",
    "Business Analyst",
    "Mobile Developer",
    "Data Scientist",
];

const descriptions = [
    "Join our dynamic team to build modern web applications and deliver high-quality user experiences.",
    "Work with cutting-edge backend technologies and scalable cloud infrastructure.",
    "Design intuitive interfaces and collaborate with product teams for seamless UX.",
    "Lead projects from conception to delivery, ensuring timely and successful launches.",
    "Ensure product quality through automated and manual testing processes.",
    "Maintain and improve CI/CD pipelines and cloud deployments.",
    "Own the product vision and work closely with stakeholders to deliver value.",
    "Analyze business requirements and translate them into technical solutions.",
    "Develop mobile applications for iOS and Android platforms.",
    "Leverage data to drive business decisions and build predictive models.",
];

const locations = [
    "Baku, Azerbaijan",
    "Remote",
    "Ganja, Azerbaijan",
    "Sumqayit, Azerbaijan",
    "Shaki, Azerbaijan",
];

const employmentTypes = [
    "Full-time",
    "Part-time",
    "Remote",
    "Contract",
];

const requirementsList = [
    ["Bachelor's degree in related field", "2+ years experience", "Team player"],
    ["Strong communication skills", "Experience with Agile", "Problem-solving mindset"],
    ["Portfolio of previous work", "Attention to detail", "Self-motivated"],
    ["Knowledge of industry trends", "Ability to work independently", "Time management skills"],
];

const benefitsList = [
    ["Competitive salary", "Flexible hours", "Health insurance"],
    ["Remote work options", "Professional development", "Team events"],
    ["Paid vacation", "Modern office", "Free snacks"],
];

function getRandomDate() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
}

const vacancies: Vacancy[] = Array.from({ length: 50 }, (_, i) => {
    const company = companies[i % companies.length];
    return {
        id: i + 1,
        position: positions[i % positions.length],
        company: company.name,
        logo: company.logo,
        date: getRandomDate(),
        isPremium: i < 15, // First 15 are premium
        description: descriptions[i % descriptions.length],
        location: locations[i % locations.length],
        salary: `$${(800 + (i % 10) * 200).toLocaleString()}`,
        employmentType: employmentTypes[i % employmentTypes.length],
        requirements: requirementsList[i % requirementsList.length],
        benefits: benefitsList[i % benefitsList.length],
        // For demo: every 3rd vacancy has an applyLink, others have an email
        applyLink: i % 3 === 0 ? "https://apply.example.com/job/" + (i + 1) : undefined,
        email: i % 3 !== 0 ? `vakansiya${i + 1}@company.com` : undefined,
    };
});

const Vacancies: FC = () => {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
    const [activeTab, setActiveTab] = useState<'description' | 'other'>('description');
    const [showEmail, setShowEmail] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    // Find other vacancies from the same company (excluding the selected one)
    const otherVacancies = selectedVacancy
        ? vacancies.filter(
            (v) => v.company === selectedVacancy.company && v.id !== selectedVacancy.id
        )
        : [];

    // Copy email to clipboard
    const handleCopyEmail = () => {
        if (selectedVacancy?.email) {
            navigator.clipboard.writeText(selectedVacancy.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    // Share vacancy (copy link to clipboard)
    const handleShare = () => {
        if (selectedVacancy) {
            navigator.clipboard.writeText(window.location.href + `#vacancy-${selectedVacancy.id}`);
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 1500);
        }
    };

    // Keyboard shortcuts for modal
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter" && selectedVacancy) {
                if (selectedVacancy.applyLink) {
                    window.open(selectedVacancy.applyLink, '_blank');
                } else if (selectedVacancy.email) {
                    setShowEmail((prev) => !prev);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, selectedVacancy]);

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Vakansiyalar</h1>
            <div className="flex flex-col gap-4">
                {vacancies.map((vacancy) => (
                    <div
                        key={vacancy.id}
                        className={`relative flex items-center bg-white rounded-lg shadow-sm px-4 py-3 border ${vacancy.isPremium ? 'border-yellow-400' : 'border-gray-200'} hover:bg-gray-50 cursor-pointer transition-colors`}
                        onClick={() => {
                            setSelectedVacancy(vacancy);
                            setOpen(true);
                            setActiveTab('description');
                        }}
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
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-lg truncate">{vacancy.position}</span>
                            </div>
                            <div className="text-gray-500 text-sm truncate">{vacancy.company}</div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                            <span className="text-xs text-gray-400 whitespace-nowrap">{vacancy.date}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(vacancy.id); }}
                                className="ml-2 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
                                aria-label="Add to favorites"
                            >
                                <FiHeart
                                    className={`w-5 h-5 ${favorites.includes(vacancy.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
                                    fill={favorites.includes(vacancy.id) ? 'currentColor' : 'none'}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Vacancy Details Modal */}
            <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30"
                        aria-hidden="true"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-0 z-50 flex flex-col focus:outline-none"
                        tabIndex={-1}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            aria-label="Bağla"
                        >
                            <FiX className="w-5 h-5 text-gray-500" />
                        </button>
                        {/* Top section: company name/logo, position, deadline */}
                        <div className="flex flex-col items-center border-b px-8 pt-8 pb-4">
                            <div className="flex items-center gap-3 mb-2 w-full justify-between">
                                <div className="flex items-center gap-2">
                                    {selectedVacancy && (
                                        <Image
                                            src={selectedVacancy.logo}
                                            alt={selectedVacancy.company}
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                    )}
                                    <span className="font-semibold text-gray-700 text-base">{selectedVacancy?.company}</span>
                                </div>
                                <span className="flex items-center gap-1 text-gray-400 text-xs">
                                    <FiHeart className="w-4 h-4" />
                                    355
                                </span>
                            </div>
                            <div className="w-full flex flex-col items-start">
                                <span className="text-2xl font-bold text-gray-900 mb-1">{selectedVacancy?.position}</span>
                                {selectedVacancy?.date && (
                                    <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded mb-2">
                                        <FiFlag className="w-4 h-4 text-orange-400" />
                                        Deadline {selectedVacancy.date}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Tabs */}
                        <div className="flex border-b px-8 pt-4 bg-white relative">
                            <button
                                className={`py-2 px-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'description' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Job description
                            </button>
                            <button
                                className={`py-2 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'other' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
                                onClick={() => setActiveTab('other')}
                            >
                                Other vacancies
                                {otherVacancies.length > 0 && (
                                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">{otherVacancies.length}</span>
                                )}
                            </button>
                            <motion.div
                                layoutId="tab-underline"
                                className="absolute bottom-0 left-0 h-0.5 bg-blue-600 rounded transition-all"
                                style={{ width: activeTab === 'description' ? '120px' : '140px', transform: activeTab === 'description' ? 'translateX(0)' : 'translateX(120px)' }}
                            />
                        </div>
                        {/* Tab content */}
                        <div className="px-8 py-6 flex-1 overflow-y-auto max-h-[60vh]">
                            <AnimatePresence mode="wait">
                                {activeTab === 'description' && (
                                    <motion.div
                                        key="desc"
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -40 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {selectedVacancy?.isPremium && (
                                            <span className="inline-block mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-xs text-white font-extrabold px-2 py-0.5 rounded shadow border-2 border-yellow-500">
                                                ★ Premium
                                            </span>
                                        )}
                                        {selectedVacancy?.location && (
                                            <div className="mb-2 text-sm text-gray-600"><span className="font-semibold">Yerləşmə:</span> {selectedVacancy.location}</div>
                                        )}
                                        {selectedVacancy?.salary && (
                                            <div className="mb-2 text-sm text-gray-600"><span className="font-semibold">Maaş:</span> {selectedVacancy.salary}</div>
                                        )}
                                        {selectedVacancy?.employmentType && (
                                            <div className="mb-2 text-sm text-gray-600"><span className="font-semibold">İş növü:</span> {selectedVacancy.employmentType}</div>
                                        )}
                                        {selectedVacancy?.description && (
                                            <div className="mb-4 text-gray-700"><span className="font-semibold">Təsvir:</span> {selectedVacancy.description}</div>
                                        )}
                                        {selectedVacancy?.requirements && (
                                            <div className="mb-2">
                                                <div className="font-semibold text-gray-700 mb-1">Tələblər:</div>
                                                <ul className="list-disc list-inside text-sm text-gray-600">
                                                    {selectedVacancy.requirements.map((req, idx) => (
                                                        <li key={idx}>{req}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {selectedVacancy?.benefits && (
                                            <div className="mb-4">
                                                <div className="font-semibold text-gray-700 mb-1">Faydalar:</div>
                                                <ul className="list-disc list-inside text-sm text-gray-600">
                                                    {selectedVacancy.benefits.map((ben, idx) => (
                                                        <li key={idx}>{ben}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                                {activeTab === 'other' && (
                                    <motion.div
                                        key="other"
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 40 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-4"
                                    >
                                        {otherVacancies.length === 0 ? (
                                            <div className="text-gray-500 text-sm">No other vacancies from this company.</div>
                                        ) : (
                                            otherVacancies.map((vac) => (
                                                <div
                                                    key={vac.id}
                                                    className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 cursor-pointer hover:bg-blue-50 transition shadow-sm"
                                                    onClick={() => {
                                                        setSelectedVacancy(vac);
                                                        setActiveTab('description');
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
                                                        <div className="font-semibold text-base truncate">{vac.position}</div>
                                                        <div className="text-gray-500 text-xs truncate">{vac.company}</div>
                                                    </div>
                                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{vac.date}</span>
                                                </div>
                                            ))
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* Telegram CTA */}
                        <div className="bg-blue-50 flex items-center gap-3 px-8 py-4 border-t border-blue-100">
                            <span className="bg-blue-100 rounded-full p-2">
                                <FiSend className="w-6 h-6 text-blue-500" />
                            </span>
                            <span className="text-sm text-blue-900">Vakansiyalar barədə məlumatı ən tez bizim <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Telegram kanalında</a> izləyə bilərsiniz.</span>
                        </div>
                        {/* Bottom actions */}
                        <div className="flex items-center justify-between px-8 py-4 border-t bg-white sticky bottom-0 z-10">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200">
                                    <FiPrinter className="w-5 h-5" /> Print
                                </button>
                                <button className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-200">
                                    <FiFlag className="w-5 h-5" /> Complain
                                </button>
                                <button
                                    className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    onClick={handleShare}
                                    aria-label="Share vacancy"
                                >
                                    <FiShare2 className="w-5 h-5" /> Share
                                    <AnimatePresence>
                                        {showTooltip && (
                                            <motion.span
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute left-1/2 -translate-x-1/2 bottom-10 bg-blue-600 text-white text-xs rounded px-3 py-1 shadow"
                                            >
                                                Link copied!
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                            <div className="relative">
                                <button
                                    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 shadow transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    onClick={async () => {
                                        if (loading) return;
                                        setLoading(true);
                                        if (selectedVacancy?.applyLink) {
                                            window.open(selectedVacancy.applyLink, '_blank');
                                            setLoading(false);
                                        } else if (selectedVacancy?.email) {
                                            setShowEmail((prev) => !prev);
                                            setLoading(false);
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                    ) : (
                                        <span>Apply for job</span>
                                    )}
                                </button>
                                {/* Email reveal and tooltip */}
                                <AnimatePresence>
                                    {showEmail && selectedVacancy?.email && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute bottom-14 right-0 w-80 z-20"
                                        >
                                            <div className="bg-blue-500 text-white text-sm rounded-t-lg px-4 py-3 shadow-lg relative">
                                                Applicants are requested to copy below email for apply.
                                                <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-500" />
                                            </div>
                                            <div className="flex items-center gap-2 bg-green-500 text-white font-semibold rounded-b-lg px-4 py-2 cursor-pointer select-all mt-0.5 relative">
                                                <FiX className="w-4 h-4 text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowEmail(false); }} />
                                                <span className="border-l border-white/30 pl-3 text-xs">{selectedVacancy.email}</span>
                                                <span
                                                    className="ml-2 text-xs flex items-center gap-1"
                                                    onClick={handleCopyEmail}
                                                    onMouseEnter={() => setShowTooltip(true)}
                                                    onMouseLeave={() => setShowTooltip(false)}
                                                >
                                                    {/* {copied ? <FiCheck className="w-4 h-4 text-white" /> : <FiShare2 className="w-4 h-4 text-white" />} */}
                                                    {copied ? 'Copied!' : <FiCopy className="w-4 h-4 text-white justify-self-end" />}
                                                </span>
                                                <AnimatePresence>
                                                    {showTooltip && !copied && (
                                                        <motion.span
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-xs rounded px-3 py-1 shadow"
                                                        >
                                                            Copy to clipboard
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Dialog>
        </div>
    );
};

export default Vacancies;
