"use client";

import { urlFor } from "@/sanity/lib/image";
import { ArrowRight, Tag, Sparkles, MapPin, ExternalLink, Copy, Check, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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
}

export function PromoBanner({ promotions = [] }: PromoBannerProps) {
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

    if (!promotions || promotions.length === 0) return null;

    return (
        <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 xl:px-16 py-12 md:py-24">

            {/* Section Header */}
            <div className="mb-8 md:mb-12 px-2">
                <span className="text-xs font-bold uppercase tracking-widest text-buddas-teal mb-2 block">Don't Miss Out</span>
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-buddas-brown">Current Happenings</h2>
            </div>

            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:pb-0 md:mx-0 md:px-0 no-scrollbar"
            >
                {promotions.slice(0, 3).map((promo, idx) => (
                    <div key={promo._id || idx} className="flex-shrink-0 w-[80vw] md:w-auto snap-center h-full">
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
            bg: "bg-orange-50/30"
        },
        teal: {
            badge: "bg-buddas-teal/10 text-buddas-teal border-buddas-teal/20",
            button: "bg-buddas-teal hover:bg-buddas-teal-dark text-white",
            accent: "bg-buddas-teal",
            bg: "bg-teal-50/30"
        },
        gold: {
            badge: "bg-buddas-gold/20 text-buddas-gold-dark border-buddas-gold/30",
            button: "bg-buddas-gold hover:bg-buddas-gold-dark text-buddas-brown hover:text-white",
            accent: "bg-buddas-gold",
            bg: "bg-amber-50/30"
        },
        brown: {
            badge: "bg-buddas-brown/10 text-buddas-brown border-buddas-brown/20",
            button: "bg-buddas-brown hover:bg-buddas-brown-dark text-white",
            accent: "bg-buddas-brown",
            bg: "bg-stone-50/30"
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
        <div className={`group flex flex-col bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:shadow-sm hover:shadow-lg transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-[2px] active:scale-[0.98] md:active:scale-100 overflow-hidden border border-buddas-brown/5 relative ${layout.container}`}>

            {/* Image Section */}
            <div className={`relative w-full overflow-hidden bg-buddas-cream shrink-0 ${layout.imageHeight}`}>
                {imageUrl ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    ></div>
                ) : (
                    <div className={`absolute inset-0 flex items-center justify-center opacity-10 ${theme.accent}`}>
                        <Sparkles className="w-10 h-10" />
                    </div>
                )}

                {/* Floating Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border ${theme.badge}`}
                    >
                        <Tag className="w-3 h-3" />
                        {promo.badge || (ctaType === 'coupon' ? 'Exclusive Code' : 'Limited Time')}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className={`${layout.contentPadding} flex flex-col flex-1 relative`}>
                <h3 className={`${layout.headlineSize} font-semibold text-buddas-brown font-poppins mb-3 leading-tight transition-colors tracking-tight`}>
                    {promo.title}
                </h3>

                <p className="text-buddas-brown/80 font-dm-sans text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
                    {promo.description}
                </p>

                <div className="mt-auto w-full">
                    {/* CTA: Coupon Code */}
                    {ctaType === 'coupon' && promo.couponCode && (
                        <div className="flex flex-col gap-2">
                            <div className="text-xs font-bold text-buddas-brown/40 uppercase tracking-wider pl-1 font-[family-name:var(--font-poppins)]">Use Code at Checkout</div>
                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-between border px-5 py-4 rounded-lg font-mono font-bold transition-all duration-200 group/btn relative overflow-hidden active:scale-95 ${theme.badge} bg-white/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2`}
                            >
                                <span className="text-lg tracking-widest relative z-10">{promo.couponCode}</span>
                                <div className="flex items-center gap-2 relative z-10">
                                    <span className="text-[10px] font-sans font-bold uppercase opacity-60">
                                        {isCopied ? "Copied!" : "Click to Copy"}
                                    </span>
                                    {isCopied ? (
                                        <Check className="w-5 h-5 text-buddas-teal" />
                                    ) : (
                                        <Copy className="w-5 h-5 opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                                    )}
                                </div>
                            </button>
                        </div>
                    )}

                    {/* CTA: External Order (SpotOn) */}
                    {ctaType === 'external' && (
                        <Link
                            href={promo.link || "#"}
                            target="_blank"
                            className={`w-full flex items-center justify-center gap-3 px-5 py-4 rounded-lg font-bold shadow-lg transition-all duration-300 active:scale-95 group/btn ${theme.button} focus:outline-none focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2`}
                        >
                            <span className="text-sm uppercase tracking-wide">
                                {promo.buttonText || "Order on SpotOn"}
                            </span>
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    )}

                    {/* CTA: Internal Link */}
                    {ctaType === 'link' && (
                        <Link
                            href={promo.link || "/menu"}
                            className={`w-full flex items-center justify-between px-5 py-4 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group/btn ${theme.button} focus:outline-none focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2`}
                        >
                            <span className="text-sm uppercase tracking-wide">
                                {promo.buttonText || "View Details"}
                            </span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    )}

                    {/* CTA: Fallback */}
                    {!ctaType && !promo.link && !promo.couponCode && (
                        <Link
                            href="/contact"
                            className="w-full flex items-center justify-between bg-white/50 hover:bg-white text-buddas-brown px-5 py-4 rounded-lg font-bold transition-all duration-300 active:scale-95 group/btn border border-buddas-brown/10 focus:outline-none focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2"
                        >
                            <span className="text-sm uppercase tracking-wide">
                                Visit Location
                            </span>
                            <MapPin className="w-4 h-4 text-buddas-brown/40 group-hover/btn:text-buddas-teal transition-colors" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
