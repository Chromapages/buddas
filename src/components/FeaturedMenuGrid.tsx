"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Plus, Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formatPrice } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface FeaturedMenuGridProps {
    items: any[];
}

export function FeaturedMenuGrid({ items }: FeaturedMenuGridProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const scrollInterval = useRef<NodeJS.Timeout | null>(null);

    // Smooth Scroll Logic
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = 340; // Approx card width + gap
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

            // Check boundaries for infinite feel loop or just bounce
            // For now, simple scroll. Infinite loop requires duplicating items which can be complex with React keys.
            // We'll stick to robust linear scroll with bounce back if at end.

            const newScrollLeft = container.scrollLeft + scrollAmount;

            // Simple boundary check
            if (direction === 'right' && container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Auto-scroll
    useEffect(() => {
        if (isPaused) return;
        scrollInterval.current = setInterval(() => {
            scroll('right');
        }, 5000); // 5s interval for better readability
        return () => {
            if (scrollInterval.current) clearInterval(scrollInterval.current);
        };
    }, [isPaused]);

    if (!items || items.length === 0) return null;

    return (
        <div className="w-full relative group/section py-10">
            {/* Header with futuristic control cluster */}
            <div className="flex items-end justify-between px-6 md:px-10 lg:px-16 mb-12">
                <div className="space-y-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buddas-orange/10 text-buddas-orange text-xs font-bold uppercase tracking-widest border border-buddas-orange/20">
                        <Flame className="w-3 h-3" />
                        Hot & Trending
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-buddas-brown leading-[0.9] tracking-tight">
                        Island Favorites
                    </h2>
                    <p className="text-buddas-brown/70 font-['Google_Sans_Flex'] text-lg">Locals can't get enough of these.</p>
                </div>

                {/* Glass Controls */}
                <div className="hidden md:flex gap-3">
                    <button
                        onClick={() => scroll('left')}
                        className="group/btn relative size-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-zinc-200/50"
                        aria-label="Scroll left"
                    >
                        <ArrowLeft className="w-6 h-6 text-zinc-700 group-hover/btn:text-white transition-colors" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="group/btn relative size-14 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-buddas-orange transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/20"
                        aria-label="Scroll right"
                    >
                        <ArrowRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>

            {/* Immersive Carousel */}
            <div
                ref={scrollContainerRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="flex overflow-x-auto gap-6 px-6 md:px-16 pb-20 pt-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.slice(0, 6).map((item, idx) => {
                    const isPopular = item.isSignature || item.tags?.includes('popular');
                    const isNew = item.tags?.includes('new');
                    const imageUrl = item.image ? urlFor(item.image).width(600).height(500).url() : null;

                    return (
                        <div
                            key={item._id || idx}
                            className="bg-white rounded-[2rem] min-w-[320px] md:min-w-[360px] relative snap-center group/card select-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block border border-zinc-100 overflow-hidden flex flex-col h-[520px]"
                        >
                            {/* Image Half */}
                            <div className="relative h-[280px] w-full overflow-hidden bg-zinc-100">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                        <div className="w-16 h-16 rounded-full bg-zinc-100"></div>
                                    </div>
                                )}

                                {/* Overlay Gradient for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>

                                {/* Top Badges */}
                                <div className="absolute top-5 left-5 flex gap-2">
                                    {isPopular && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-buddas-dark text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                            Bestseller
                                        </span>
                                    )}
                                    {isNew && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-buddas-teal text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                            New
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content Half */}
                            <div className="p-8 flex flex-col justify-between flex-1 bg-white relative">
                                <div>
                                    <h3 className="text-2xl font-[700] text-zinc-900 leading-[1.2] mb-2 font-['Google_Sans_Flex'] tracking-tight">
                                        {item.name}
                                    </h3>
                                    <p className="text-zinc-500 text-sm font-medium line-clamp-3 leading-relaxed">
                                        {item.description || "Fresh island flavors prepared daily in our kitchen."}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-2xl font-[700] text-zinc-900 font-['Google_Sans_Flex']">
                                        {formatPrice(item.price)}
                                    </span>

                                    <button className="size-12 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-buddas-orange transition-all duration-300 shadow-xl shadow-zinc-900/10 active:scale-95 group/btn">
                                        <Plus className="w-6 h-6 transition-transform group-hover/btn:rotate-90" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* View All Card */}
                <Link href="/menu" className="flex-none group/viewall h-[520px]">
                    <div className="bg-zinc-50 rounded-[2rem] w-[280px] h-full flex flex-col items-center justify-center gap-4 border-2 border-dashed border-zinc-200 hover:border-buddas-teal hover:bg-buddas-teal/5 transition-all duration-300 cursor-pointer">
                        <div className="size-16 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-400 group-hover/viewall:text-buddas-teal group-hover/viewall:scale-110 transition-all duration-300">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg text-zinc-500 group-hover/viewall:text-buddas-teal transition-colors font-['Google_Sans_Flex']">
                            View Menu
                        </span>
                    </div>
                </Link>
            </div>

            {/* Mobile Controls Hint */}
            <div className="md:hidden flex justify-center gap-2 mt-[-30px] opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300"></div>
            </div>
        </div>
    );
}

// Helper disabled - using standard img for now to ensure perfect sizing control in this complex layout
