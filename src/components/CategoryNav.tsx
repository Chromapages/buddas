"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const CATEGORIES = [
    { id: "featured", label: "Featured" },
    { id: "new", label: "New Arrivals" },
];

export function CategoryNav() {
    const [activeId, setActiveId] = useState("featured");
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 800) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setActiveId(id);
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 180;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav className={cn(
            "sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm transition-all duration-300",
            isSticky ? "shadow-md" : ""
        )}>
            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => scrollToSection(cat.id)}
                            className={cn(
                                "flex-shrink-0 px-5 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap",
                                activeId === cat.id
                                    ? "flex items-center gap-2 bg-teal-800 text-white shadow-md ring-2 ring-teal-800 ring-offset-2"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-teal-600 hover:text-teal-800"
                            )}
                        >
                            {activeId === cat.id && <Star className="w-4 h-4" />}
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
