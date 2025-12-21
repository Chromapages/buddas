"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface AnnouncementProps {
    data: {
        isActive?: boolean;
        text?: string;
        link?: string;
        colorTheme?: "teal" | "dark-teal" | "gold" | "orange" | "brown";
    };
}

export function AnnouncementBar({ data }: AnnouncementProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!data?.isActive || !data?.text || !isVisible) {
        return null;
    }

    const getColorClasses = (theme?: string) => {
        switch (theme) {
            case "dark-teal":
                return { bg: "bg-buddas-teal-dark", text: "text-white" };
            case "gold":
                return { bg: "bg-buddas-gold", text: "text-buddas-brown" };
            case "orange":
                return { bg: "bg-buddas-orange", text: "text-white" };
            case "brown":
                return { bg: "bg-buddas-brown", text: "text-white" };
            case "teal":
            default:
                return { bg: "bg-buddas-teal", text: "text-white" };
        }
    };

    const colors = getColorClasses(data.colorTheme);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="announcement-bar"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`${colors.bg} ${colors.text} relative z-50 overflow-hidden`}
                role="banner"
            >
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between md:justify-center relative min-h-[40px] text-xs md:text-sm font-medium font-dm-sans">
                    <div className="flex-1 flex items-center justify-center gap-2 text-center px-4 md:px-8">
                        <span className="line-clamp-1 md:line-clamp-none">{data.text}</span>
                        {data.link && (
                            <Link
                                href={data.link}
                                className="hidden md:inline-flex items-center gap-1 hover:underline underline-offset-4 decoration-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                            >
                                Learn More <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors relative z-10 shrink-0"
                        aria-label="Dismiss announcement"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                {/* Mobile Link Overlay */}
                {data.link && (
                    <Link href={data.link} className="absolute inset-0 md:hidden" aria-label="View announcement link" />
                )}
            </motion.div>
        </AnimatePresence>
    );
}
