"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { MICROCOPY } from "@/lib/microcopy";

interface NewHeroProps {
    heroSlides?: any[];
}

export function NewHero({ heroSlides }: NewHeroProps) {
    // Use data from the first slide as primary content, or default to null
    const slide = heroSlides && heroSlides.length > 0 ? heroSlides[0] : null;

    // Sanity Data Mapping with Explicit Fallbacks only if slide is null
    const heroTitle = slide?.title ?? "Island-Fresh Comfort. Served with Aloha.";
    const heroSubtitle = slide?.subtitle ?? "We Prepare Delicious Food For You We Are Always here to serve you the best healthy meals.";
    const heroBadge = slide?.badge ?? "Authentic Hawaiian";

    // Buttons
    const primaryCtaLabel = slide?.primaryCtaLabel ?? "Explore Now";
    const primaryCtaLink = slide?.primaryCtaLink ?? "/menu";

    // Main Hero Image
    // Use direct asset.url since query expands asset->
    const getHeroImageSrc = (): string => {
        // Check if we have a direct URL from expanded asset
        if (slide?.image?.asset?.url) {
            // Append Sanity CDN parameters for optimized delivery
            // This prevents timeouts with large images by resizing and converting format
            const baseUrl = slide.image.asset.url;
            return `${baseUrl}?w=1920&q=80&auto=format`;
        }
        // Fallback to Unsplash
        return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200";
    };
    const mainImageSrc = getHeroImageSrc();

    const secondaryCtaLabel = slide?.secondaryCtaLabel ?? "View Specials";
    const secondaryCtaLink = slide?.secondaryCtaLink ?? "/menu";

    return (
        <section className="relative w-full overflow-hidden min-h-[650px] lg:min-h-[800px] 2xl:min-h-[900px] flex items-center bg-zinc-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src={mainImageSrc}
                    alt={slide?.image?.alt || "Buddas Hawaiian hero background - island comfort food"}
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-buddas-brown/85 via-buddas-brown/50 to-transparent" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-36 pb-32 md:pb-48 md:pt-44 lg:pt-48 grid lg:grid-cols-2 gap-12 2xl:gap-16 items-center">

                {/* Left Column: Text */}
                <div className="space-y-8 max-w-2xl 2xl:max-w-3xl">
                    {/* Badge (Brand Guidelines: Display above headline) */}
                    {heroBadge && (
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-buddas-gold text-buddas-brown text-sm font-bold shadow-sm uppercase tracking-wider animate-in fade-in duration-300 delay-100">
                            {heroBadge}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-semibold text-white tracking-[-0.02em] leading-[1.1] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] font-[family-name:var(--font-poppins)] animate-in slide-in-from-bottom-8 fade-in duration-300 delay-200">
                        {heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl 2xl:text-3xl text-white/90 font-medium leading-relaxed max-w-lg 2xl:max-w-2xl opacity-95 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-6 fade-in duration-300 delay-300">
                        {heroSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in slide-in-from-bottom-4 fade-in duration-300 delay-400">
                        <Button
                            asChild
                            variant="default" // Teal Primary
                            size="xl"
                            className="rounded-lg shadow-lg hover:shadow-teal-500/20 hover:bg-buddas-teal-dark"
                        >
                            <Link href={primaryCtaLink}>
                                <span>{primaryCtaLabel || MICROCOPY.orderNow}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        {/* 
                            EXCEPTION: Secondary button uses 'outline' style (White Glass) instead of strict Teal Border 
                            to ensure readability against the dark hero background. 
                        */}
                        <Button
                            asChild
                            variant="outline" // Outline style (Exception for Hero contrast)
                            size="xl"
                            className="rounded-lg border-2 border-white/50 text-white bg-transparent hover:bg-white hover:text-buddas-brown shadow-lg transition-all"
                        >
                            <Link href={secondaryCtaLink}>
                                <span>{secondaryCtaLabel || MICROCOPY.viewMenu}</span>
                                <ShoppingBag className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 pt-4 text-teal-100/80 text-base font-medium animate-in fade-in duration-300 delay-500">
                        <p className="drop-shadow-sm border-l-2 border-buddas-orange pl-4">{MICROCOPY.socialProof}</p>
                    </div>
                </div>

                {/* Right Column: Empty (Spacer for Background Visibility) */}
                <div className="hidden lg:block relative h-full min-h-[400px]">
                    {/* Content removed to let background shine through, as requested */}
                </div>
            </div >

            {/* Wave Dividers */}
        </section >
    );
}
