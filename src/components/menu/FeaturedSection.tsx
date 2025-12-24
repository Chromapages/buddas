"use client";

import { MenuCard } from "./MenuCard";
import { useRef, useState } from "react";
import { MenuModal } from "./MenuModal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedSectionProps {
    items: any[];
    onItemClick?: (item: any) => void;
    title?: string;
}

export function FeaturedSection({ items, onItemClick, title = "Customer Favorites" }: FeaturedSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleItemClick = (item: any) => {
        if (onItemClick) {
            onItemClick(item);
        } else {
            setSelectedItem(item);
        }
    };

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
            setScrollProgress((container.scrollLeft / maxScroll) * 100);
        }
    };

    // Safe fallback if no items to prevent useScroll error (ref must be attached)
    if (!items || items.length === 0) {
        return null;
    }

    // Mobile: Show limited items to prevent endless scrolling
    const mobileItems = items.slice(0, 5);
    // Desktop: Show all items (or reasonable limit)
    const desktopItems = items;

    return (
        <section className="py-16 md:py-20 bg-buddas-teal/5 border-b border-buddas-brown/5 relative overflow-hidden group/section">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-buddas-teal/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 2xl:px-16 relative z-10">
                <div className="w-full">
                    <div className="flex items-end justify-between mb-8 md:mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-buddas-brown tracking-tight">
                                {title}
                            </h2>
                            <p className="text-buddas-brown/60 font-dm-sans mt-1">
                                Tried and true local legends.
                            </p>
                        </div>



                        {/* View All Link (Always Visible) */}
                        <Link
                            href="/menu"
                            className="flex items-center gap-1.5 text-buddas-brown font-bold hover:text-buddas-teal transition-colors group/link text-sm md:text-base"
                        >
                            <span className="border-b border-transparent group-hover/link:border-buddas-teal transition-all">View All</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                    </div>

                    {/* Mobile Scroll Container */}
                    <div className="md:hidden relative">
                        <div
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 no-scrollbar"
                        >
                            {mobileItems.map((item, idx) => (
                                <div
                                    key={`mobile-${item._id}`}
                                    className="flex-shrink-0 w-[80vw] snap-center active:scale-[0.98] transition-transform"
                                >
                                    <MenuCard
                                        item={item}
                                        onClick={() => handleItemClick(item)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Live Progress Bar */}
                        <div className="h-1 w-full bg-buddas-brown/5 rounded-full mt-2 overflow-hidden max-w-[200px] mx-auto">
                            <div
                                className="h-full bg-buddas-teal transition-all duration-100"
                                style={{ width: `${scrollProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* Desktop Grid Container */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                        {desktopItems.map((item, idx) => (
                            <div
                                key={`desktop-${item._id}`}
                                className="transform transition-transform duration-300 hover:-translate-y-1"
                            >
                                <MenuCard
                                    item={item}
                                    onClick={() => handleItemClick(item)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Internal Modal for self-managed state */}
            <MenuModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </section>
    );
}
