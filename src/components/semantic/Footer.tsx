import Link from "next/link";
import React from "react";

interface FooterLink {
    label: string;
    href: string;
}

const footerLinks: FooterLink[] = [
    { label: "Haqqımızda", href: "/about" },
    { label: "Xidmətlər", href: "/services" },
    { label: "Əlaqə", href: "/contact" },
];

const Footer: React.FC = () => {
    return (
        <footer className="mt-8">
            <div className="flex justify-center gap-6 text-xs text-gray-500 mb-2">
                {footerLinks.map(link => (
                    <Link key={link.label} href={link.href} className="hover:underline">
                        {link.label}
                    </Link>
                ))}
            </div>
            <div className="text-center text-xs text-gray-400 mb-2">© JobSearch.az 2006—2025</div>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400 border-t pt-2">
                <span>Site by</span>
                <Link
                    href="https://instagram.com/creadive.az"
                    target="_blank"
                    className="hover:underline">
                    Creadive Agency
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
