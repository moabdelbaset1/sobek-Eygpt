"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Info, Phone, Newspaper } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { motion } from "framer-motion";

export default function BottomNav() {
    const pathname = usePathname();
    const { lang, isRTL } = useLanguageContext();

    const navItems = [
        {
            label: t("home", lang),
            href: "/",
            icon: Home,
        },
        {
            label: t("products", lang),
            href: "/products/human-new", // Defaulting to human products, could be a menu
            icon: Package,
        },
        {
            label: t("news", lang),
            href: "/media/news",
            icon: Newspaper,
        },
        {
            label: t("about", lang),
            href: "/about",
            icon: Info,
        },
        {
            label: t("contact", lang),
            href: "/contact-us",
            icon: Phone,
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <nav className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center w-full h-full"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="absolute top-0 w-8 h-1 bg-red-600 rounded-full"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}

                            <div className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? "text-red-600" : "text-gray-500 hover:text-gray-900"
                                }`}>
                                <item.icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} strokeWidth={isActive ? 2 : 1.5} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>
            {/* iOS Safe Area Spacer */}
            <div className="h-[env(safe-area-inset-bottom)] bg-white" />
        </div>
    );
}
