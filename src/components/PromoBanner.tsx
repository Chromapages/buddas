"use client";

import { urlFor } from "@/sanity/lib/image";
import { ArrowRight, Tag, Sparkles, MapPin, ExternalLink, Copy, Check, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Texture Pattern for "Tactile" feel
const GRAIN_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

interface Promotion {
    _id: string;
    title: string;
    description: string;
    badge?: string;
    image?: any;
    link?: string;
    buttonText?: string;
    ctaType?: 'link' | 'coupon' | 'external';
    couponCode?: string;
    colorTheme?: 'orange' | 'teal' | 'gold' | 'brown';
    campaignType?: 'conversion' | 'crave' | 'community';
}

interface PromoBannerProps {
    promotions?: Promotion[];
    isLoading?: boolean;
}

function PromoBannerSkeleton() {
    return (
        <section className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 xl:px-16 py-12 md:py-24 relative motion-safe:animate-pulse">
            <div>
                {/* Header Skeleton */}
                <div className="mb-8 md:mb-12 px-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="w-24 h-3 bg-buddas-teal/20 rounded mb-2" />
                        <div className="w-56 h-10 bg-buddas-brown/10 rounded-lg" />
                    </div>
                    <div className="hidden md:block h-px flex-1 bg-buddas-brown/10 mx-8" />
                </div>

                {/* Cards Skeleton */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:pb-0 md:mx-0 md:px-0 no-scrollbar">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[85vw] md:w-auto snap-center h-full bg-white rounded-2xl shadow-sm border border-buddas-brown/5 overflow-hidden"
                        >
                            <div className="h-[160px] md:h-[180px] bg-buddas-cream" />
                            <div className="p-6 space-y-4">
                                <div className="w-3/4 h-6 bg-buddas-brown/10 rounded" />
                                <div className="space-y-2">
                                    <div className="w-full h-4 bg-buddas-brown/5 rounded" />
                                    <div className="w-2/3 h-4 bg-buddas-brown/5 rounded" />
                                </div>
                                <div className="w-full h-12 bg-buddas-teal/10 rounded-xl mt-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Progress Skeleton */}
                <div className="flex md:hidden flex-col gap-2 mt-6 px-2">
                    <div className="w-full h-1 bg-buddas-brown/10 rounded-full" />
                </div>
            </div>
        </section>
    );
}

export function PromoBanner({ promotions = [], isLoading }: PromoBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Track scroll position to update dots
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollPosition = container.scrollLeft;
        const itemWidth = container.offsetWidth * 0.85; // Approximately card width (85vw) or close to it
        // Simple approximation for snap index
        const index = Math.round(scrollPosition / (container.firstElementChild?.clientWidth || itemWidth));

        // Clamp index
        const clampedIndex = Math.min(Math.max(index, 0), Math.min(promotions.length - 1, 2));
        if (clampedIndex !== currentIndex) {
            setCurrentIndex(clampedIndex);
        }

        // Calculate smooth progress percentage
        if (container.scrollWidth > container.clientWidth) {
            const maxScroll = container.scrollWidth - container.clientWidth;
            const progress = (scrollPosition / maxScroll) * 100;
            setScrollProgress(Math.min(Math.max(progress, 0), 100));
        }
    };

    // Show skeleton if explicitly loading
    if (isLoading) {
        return <PromoBannerSkeleton />;
    }

    if (!promotions || promotions.length === 0) return null;

    // Dynamic Grid Logic
    const gridClass = promotions.length === 1
        ? "md:grid-cols-1 md:max-w-2xl md:mx-auto"
        : promotions.length === 2
            ? "md:grid-cols-2 md:max-w-5xl md:mx-auto"
            : "md:grid-cols-3";

    return (
        <section className="w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16 py-12 md:py-24 relative">
            <div>
                {/* Section Header */}
                <div
                    className="mb-8 md:mb-12 px-2 flex flex-col md:flex-row md:items-end justify-between gap-4"
                >
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-buddas-teal mb-2 block">Don't Miss Out</span>
                        <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-buddas-brown">Current Happenings</h2>
                    </div>

                    {/* Desktop Scroll/Swipe Hint (Optional visual balance) */}
                    <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-buddas-brown/20 to-transparent mx-8 md:mb-4" />
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className={`flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 md:grid md:gap-6 lg:gap-8 md:pb-0 md:mx-0 md:px-0 no-scrollbar ${gridClass}`}
                >
                    {promotions.slice(0, 3).map((promo, idx) => (
                        <div
                            key={promo._id || idx}
                            className="flex-shrink-0 w-[85vw] md:w-auto snap-center h-full"
                        >
                            <PromoCard promo={promo} />
                        </div>
                    ))}
                </div>

                {/* Mobile Scroll Progress Bar & Hint */}
                <div className="flex md:hidden flex-col gap-2 mt-6 px-2">
                    <div className="w-full h-1 bg-buddas-brown/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-buddas-teal transition-all duration-100 ease-out rounded-full"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>

                    {currentIndex === 0 && (
                        <div className="flex justify-end items-center gap-1 text-[10px] font-bold text-buddas-teal/60 animate-pulse uppercase tracking-wider">
                            <span>Swipe for more</span>
                            <ArrowRight className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function PromoCard({ promo }: { promo: Promotion }) {
    const [isCopied, setIsCopied] = useState(false);

    // Robust Image Logic
    let imageUrl: string | null = null;
    try {
        if (typeof promo.image === 'string') {
            imageUrl = promo.image;
        } else if (promo.image?.asset?.url) {
            imageUrl = promo.image.asset.url;
        } else if (promo.image) {
            imageUrl = urlFor(promo.image).width(800).height(600).url();
        }
    } catch (e) {
        console.error("Error resolving image for promo:", promo.title);
    }

    // Determine CTA Type Strategy
    const ctaType = promo.ctaType || (promo.couponCode ? 'coupon' : (promo.link?.includes('spoton') || promo.link?.startsWith('http') ? 'external' : 'link'));

    const handleCopy = () => {
        if (promo.couponCode) {
            navigator.clipboard.writeText(promo.couponCode);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    // Theme Mapping
    const themeStyles = {
        orange: {
            badge: "bg-buddas-orange/10 text-buddas-orange border-buddas-orange/20",
            button: "bg-buddas-orange hover:bg-buddas-orange/90 text-white",
            accent: "bg-buddas-orange",
            bg: "bg-orange-50/30",
            text: "text-buddas-orange"
        },
        teal: {
            badge: "bg-buddas-teal/10 text-buddas-teal border-buddas-teal/20",
            button: "bg-buddas-teal hover:bg-buddas-teal-dark text-white",
            accent: "bg-buddas-teal",
            bg: "bg-teal-50/30",
            text: "text-buddas-teal"
        },
        gold: {
            badge: "bg-buddas-gold/20 text-buddas-gold-dark border-buddas-gold/30",
            button: "bg-buddas-gold hover:bg-buddas-gold-dark text-buddas-brown hover:text-white",
            accent: "bg-buddas-gold",
            bg: "bg-amber-50/30",
            text: "text-buddas-gold-dark"
        },
        brown: {
            badge: "bg-buddas-brown/10 text-buddas-brown border-buddas-brown/20",
            button: "bg-buddas-brown hover:bg-buddas-brown-dark text-white",
            accent: "bg-buddas-brown",
            bg: "bg-stone-50/30",
            text: "text-buddas-brown"
        }
    };

    const theme = themeStyles[promo.colorTheme as keyof typeof themeStyles] || themeStyles.teal;

    // Layout Logic (Campaign Type Ratios)
    const layoutStyles = {
        crave: {
            imageHeight: "h-[200px] md:h-[320px]", // Reduced for mobile
            contentPadding: "p-5 md:p-6",
            headlineSize: "text-lg md:text-xl",
            container: "h-full"
        },
        conversion: {
            imageHeight: "h-[160px] md:h-[180px]", // Reduced for mobile
            contentPadding: "p-6 md:p-8",
            headlineSize: "text-xl md:text-2xl lg:text-3xl",
            container: "h-full"
        },
        community: {
            imageHeight: "h-[180px] md:h-[240px]", // Balanced
            contentPadding: "p-5 md:p-6 lg:p-8",
            headlineSize: "text-lg md:text-xl lg:text-2xl",
            container: "h-full"
        }
    };
    // Default to 'conversion' if undefined (safe fallback)
    const layout = layoutStyles[promo.campaignType || 'conversion'];

    return (
        <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`group flex flex-col bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-buddas-brown/10 transition-all duration-200 overflow-hidden border border-buddas-brown/5 relative h-full`}
        >
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-multiply" style={{ backgroundImage: GRAIN_TEXTURE }} />

            {/* Image Section */}
            <div className={`relative w-full overflow-hidden shrink-0 ${layout.imageHeight}`}>
                {imageUrl ? (
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        whileHover={{ scale: 1.05 }}
                    />
                ) : (
                    <div className={`absolute inset-0 flex items-center justify-center opacity-10 ${theme.accent}`}>
                        <Sparkles className="w-10 h-10" />
                    </div>
                )}

                {/* Gradient Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>

                {/* Floating Glassmorphic Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-md bg-white/90 border border-white/50 ${themeStyles[promo.colorTheme as keyof typeof themeStyles]?.badge ? themeStyles[promo.colorTheme as keyof typeof themeStyles].text : "text-buddas-brown"}`}>
                        <Tag className="w-3 h-3" />
                        {promo.badge || (ctaType === 'coupon' ? 'Exclusive Code' : 'Limited Time')}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className={`${layout.contentPadding} flex flex-col flex-1 relative z-10 bg-white/50`}>
                <h3 className={`${layout.headlineSize} font-bold text-buddas-brown font-poppins mb-2 leading-tight tracking-tight group-hover:text-buddas-teal-dark transition-colors`}>
                    {promo.title}
                </h3>

                <p className="text-buddas-brown/70 font-dm-sans text-sm md:text-base leading-relaxed mb-8 line-clamp-3 flex-1">
                    {promo.description}
                </p>

                <div className="mt-auto w-full">
                    {/* CTA: Coupon Code */}
                    {ctaType === 'coupon' && promo.couponCode && (
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleCopy}
                                className={`w-full relative flex items-center justify-between border px-6 py-4 rounded-full font-mono font-bold transition-all duration-200 overflow-hidden active:scale-95 group/btn ${isCopied ? "bg-green-50 border-green-200 text-green-700" : "bg-white/80 border-dashed border-buddas-brown/20 hover:border-buddas-teal hover:bg-buddas-teal/5 hover:shadow-md"}`}
                            >
                                <AnimatePresence mode="wait">
                                    {isCopied ? (
                                        <motion.div
                                            key="copied"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center gap-2 font-poppins font-bold uppercase tracking-widest text-sm text-green-600"
                                        >
                                            <Check className="w-4 h-4" />
                                            <span>Copied!</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="code"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full flex items-center justify-between"
                                        >
                                            <span className="text-base tracking-widest text-buddas-brown font-bold">{promo.couponCode}</span>
                                            <span className="flex items-center gap-2 text-xs font-bold uppercase text-buddas-teal opacity-60 group-hover/btn:opacity-100 transition-opacity">
                                                Copy <Copy className="w-4 h-4" />
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    )}

                    {/* CTA: External Order (SpotOn) */}
                    {ctaType === 'external' && (
                        <Link
                            href={promo.link || "#"}
                            target="_blank"
                            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95 active:translate-y-0 ${theme.button}`}
                        >
                            <span className="text-sm uppercase tracking-wider font-bold">
                                {promo.buttonText || "Order on SpotOn"}
                            </span>
                            <ExternalLink className="w-4 h-4 opacity-80" />
                        </Link>
                    )}

                    {/* CTA: Internal Link */}
                    {ctaType === 'link' && (
                        <Link
                            href={promo.link || "/menu"}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95 active:translate-y-0 group/link ${theme.button}`}
                        >
                            <span className="text-sm uppercase tracking-wider font-bold">
                                {promo.buttonText || "View Details"}
                            </span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                    )}

                    {/* CTA: Fallback */}
                    {!ctaType && !promo.link && !promo.couponCode && (
                        <Link
                            href="/contact"
                            className="w-full flex items-center justify-between bg-white hover:bg-zinc-50 text-buddas-brown px-6 py-4 rounded-full font-bold border border-buddas-brown/10 hover:border-buddas-brown/30 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                        >
                            <span className="text-sm uppercase tracking-wider font-bold">
                                Visit Location
                            </span>
                            <MapPin className="w-4 h-4 opacity-50" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
