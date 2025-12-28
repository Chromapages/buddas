"use client";

import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { MICROCOPY } from "@/lib/microcopy";

interface NewHeroProps {
    heroSlides?: any[];
}

function NewHeroSkeleton() {
    return (
        <section className="relative w-full overflow-hidden min-h-[85svh] lg:min-h-[800px] 2xl:min-h-[900px] flex items-center bg-zinc-900 motion-safe:animate-pulse">
            <div className="absolute inset-0 bg-buddas-brown/20" />

            <div className="relative z-10 w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-24 pb-16 md:pb-48 md:pt-44 lg:pt-48 grid lg:grid-cols-2 gap-12 2xl:gap-16 items-center">
                <div className="space-y-8 max-w-2xl 2xl:max-w-3xl p-6 sm:p-0">
                    {/* Badge */}
                    <div className="w-32 h-6 bg-buddas-gold/20 rounded-full" />

                    {/* Title */}
                    <div className="space-y-4">
                        <div className="w-3/4 h-12 sm:h-16 lg:h-20 bg-white/10 rounded-xl" />
                        <div className="w-1/2 h-12 sm:h-16 lg:h-20 bg-white/10 rounded-xl" />
                    </div>

                    {/* Subtitle */}
                    <div className="space-y-3 pt-2">
                        <div className="w-full sm:w-2/3 h-6 bg-white/5 rounded-lg" />
                        <div className="w-3/4 sm:w-1/2 h-6 bg-white/5 rounded-lg" />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <div className="w-full sm:w-40 h-14 bg-buddas-teal/20 rounded-lg" />
                        <div className="w-full sm:w-40 h-14 bg-white/10 rounded-lg" />
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-buddas-gold/20 border-2 border-transparent" />
                            ))}
                        </div>
                        <div className="w-32 h-4 bg-white/10 rounded" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export function NewHero({ heroSlides }: NewHeroProps) {
    if (!heroSlides || heroSlides.length === 0) {
        return <NewHeroSkeleton />;
    }

    // Use data from the first slide as primary content, or default to null
    const slide = heroSlides && heroSlides.length > 0 ? heroSlides[0] : null;

    // Sanity Data Mapping with Explicit Fallbacks only if slide is null
    // Sanity Data Mapping with Explicit Fallbacks only if slide is null
    const heroTitle = slide?.title ?? "Island-Fresh Comfort. Served with Aloha.";
    const heroSubtitle = slide?.subtitle ?? "We Prepare Delicious Food For You We Are Always here to serve you the best healthy meals.";
    const heroBadge = slide?.badge ?? "Authentic Hawaiian";

    // Dynamic Greeting Logic (Mobile Only)
    const [greeting, setGreeting] = useState(heroBadge);

    useEffect(() => {
        // Only override if it's the default/static badge, or if we want to enforce time-based greetings
        // consistently. Here we'll append time context if badge is generic.
        const hour = new Date().getHours();
        let timeGreeting = "Aloha!";
        if (hour < 11) timeGreeting = "Good Morning!";
        else if (hour < 14) timeGreeting = "Lunch is Served!"; // 11am-2pm
        else if (hour < 17) timeGreeting = "Afternoon Snack?"; // 2pm-5pm
        else timeGreeting = "Dinner Ready!"; // 5pm+

        // If no custom badge from Sanity, or it's the default, use dynamic greeting
        if (!slide?.badge || slide?.badge === "Authentic Hawaiian") {
            setGreeting(timeGreeting);
        }
    }, [slide?.badge]);

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
        <section className="relative w-full overflow-hidden min-h-[85svh] lg:min-h-[800px] 2xl:min-h-[900px] flex items-center bg-zinc-900">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 select-none"
            >
                <Image
                    src={mainImageSrc}
                    alt={slide?.image?.alt || "Buddas Hawaiian hero background - island comfort food"}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-90"
                    priority
                />
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-buddas-brown/85 via-buddas-brown/50 to-transparent" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-24 pb-16 md:pb-48 md:pt-44 lg:pt-48 grid lg:grid-cols-2 gap-12 2xl:gap-16 items-center">

                {/* Left Column: Text (Frosted Glass Container - Mobile Only) */}
                <div className="space-y-8 max-w-2xl 2xl:max-w-3xl backdrop-blur-sm bg-black/10 sm:backdrop-blur-none sm:bg-transparent p-6 sm:p-0 rounded-2xl sm:rounded-none border border-white/5 sm:border-none">

                    {/* Badge: Dynamic on Mobile, Static on Desktop */}
                    <span className="sm:hidden inline-flex items-center px-4 py-1.5 rounded-full bg-buddas-gold text-buddas-brown text-xs font-bold shadow-sm uppercase tracking-wide">
                        {greeting}
                    </span>
                    <span className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-buddas-gold text-buddas-brown text-xs font-bold shadow-sm uppercase tracking-wide">
                        {heroBadge}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-semibold text-buddas-cream tracking-[-0.02em] leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] font-poppins">
                        {heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl 2xl:text-3xl text-buddas-cream/80 font-dm-sans font-medium leading-relaxed max-w-sm sm:max-w-xl lg:max-w-2xl opacity-95 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                        {heroSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            asChild
                            variant="default" // Teal Primary
                            size="xl"
                            className="w-full sm:w-auto rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500/20 hover:bg-buddas-teal-dark focus:ring-2 focus:ring-buddas-teal"
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
                            className="w-full sm:w-auto rounded-lg border-2 border-white/50 text-white bg-transparent hover:bg-white hover:text-buddas-brown shadow-lg transition-all focus:ring-2 focus:ring-white"
                        >
                            <Link href={secondaryCtaLink}>
                                <span>{secondaryCtaLabel || MICROCOPY.viewMenu}</span>
                                <ShoppingBag className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className="w-6 h-6 rounded-full bg-buddas-gold flex items-center justify-center border-2 border-buddas-brown">
                                    <Star className="w-3 h-3 text-buddas-brown fill-buddas-brown" />
                                </div>
                            ))}
                        </div>
                        <p className="text-teal-100/90 text-sm font-medium drop-shadow-sm">
                            <span className="font-bold text-white">4.9/5</span> from 2,000+ Happy Locals
                        </p>
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
