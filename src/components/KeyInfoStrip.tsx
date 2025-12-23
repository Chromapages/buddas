"use client";

import { Clock, MapPin, Phone, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface KeyInfoStripProps {
    primaryPhone?: string;
    locations?: any[];
}

function KeyInfoStripSkeleton() {
    return (
        <div className="hidden md:block bg-buddas-brown py-2 sm:py-3 lg:py-4 px-4 shadow-md relative z-20 motion-safe:animate-pulse">
            <div className="max-w-7xl mx-auto flex justify-center items-center gap-12">
                {/* Hours */}
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white/20 rounded-full" />
                    <div className="w-32 h-4 bg-white/20 rounded-md" />
                </div>
                {/* Location */}
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white/20 rounded-full" />
                    <div className="w-24 h-4 bg-white/20 rounded-md" />
                </div>
                {/* Phone */}
                <div className="w-36 h-8 bg-white/10 rounded-full" />
                {/* Order */}
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white/20 rounded-full" />
                    <div className="w-24 h-4 bg-white/20 rounded-md" />
                </div>
            </div>
        </div>
    );
}

// Grain texture for "Tactile" feel
const GRAIN_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

export function KeyInfoStrip({ primaryPhone, locations = [] }: KeyInfoStripProps) {
    if (!locations || locations.length === 0) {
        return <KeyInfoStripSkeleton />;
    }

    // State to hold the display string for hours
    const [hoursText, setHoursText] = useState("Open Daily");

    useEffect(() => {
        if (!locations || locations.length === 0) {
            setHoursText("Open Today: 10am - 9pm");
            return;
        }

        const primaryLoc = locations.find((l: any) => l.isPrimaryLocation) || locations[0];
        if (!primaryLoc || !primaryLoc.hours) {
            setHoursText("Open Daily");
            return;
        }

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = days[new Date().getDay()];
        const todaySchedule = primaryLoc.hours.find((h: any) => h.dayOfWeek === today);

        if (!todaySchedule || todaySchedule.isClosed) {
            setHoursText("Closed Today");
        } else {
            setHoursText(`Today: ${todaySchedule.openTime} - ${todaySchedule.closeTime}`);
        }
    }, [locations]);

    return (
        <div
            className="hidden md:block bg-buddas-brown text-white py-2 sm:py-3 lg:py-4 px-4 shadow-md relative z-20 animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden"
        >
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0 mix-blend-overlay" style={{ backgroundImage: GRAIN_TEXTURE }} />

            <div className="max-w-7xl mx-auto flex sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 text-sm sm:text-base font-dm-sans font-medium tracking-wide relative z-10">

                {/* Hours - with "Open Now" Pulse */}
                <div className="flex items-center gap-3 group cursor-default" title={hoursText}>
                    <div className="relative">
                        <Clock className="w-4 h-4 text-buddas-gold group-hover:scale-110 transition-transform duration-300" />
                        {/* Pulse Dot */}
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    </div>
                    <span className="hidden sm:inline group-hover:text-buddas-cream transition-colors">{hoursText}</span>
                    <span className="sm:hidden text-xs text-white/80">Open Daily</span>
                </div>

                {/* Separator */}
                <div className="h-4 w-px bg-buddas-gold/20"></div>

                {/* Location */}
                <Link href="#locations" className="flex items-center gap-2 hover:text-buddas-gold transition-colors group min-h-[44px] sm:min-h-0">
                    <MapPin className="w-4 h-4 text-buddas-gold group-hover:-translate-y-1 transition-transform duration-300" />
                    <span className="border-b border-transparent group-hover:border-buddas-gold transition-all">Find Us</span>
                </Link>

                {/* Separator */}
                <div className="h-4 w-px bg-buddas-gold/20"></div>

                {/* Phone - Prominent Pill CTA */}
                {primaryPhone && (
                    <div className="flex items-center">
                        <a
                            href={`tel:${primaryPhone}`}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-buddas-gold hover:text-buddas-brown border border-white/20 hover:border-buddas-gold transition-all duration-300 group"
                            aria-label={`Call us at ${primaryPhone}`}
                        >
                            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-buddas-gold group-hover:text-buddas-brown transition-colors" />
                            <span className="hidden sm:inline font-bold">{primaryPhone}</span>
                        </a>
                    </div>
                )}

                {/* Order Online - Ghost Button Upgrade */}
                <Link href="/menu" className="hidden lg:flex items-center gap-2 px-5 py-1.5 rounded-full border border-buddas-gold/30 text-buddas-gold hover:bg-buddas-gold hover:text-buddas-brown transition-all duration-300 group ml-4 shadow-sm hover:shadow-md active:scale-95">
                    <ShoppingBag className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-bold uppercase text-xs tracking-wider">Order Online</span>
                </Link>

            </div>
        </div>
    );
}
