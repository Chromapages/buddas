"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

interface KeyInfoStripProps {
    primaryPhone?: string;
    locations?: any[];
}

export function KeyInfoStrip({ primaryPhone, locations = [] }: KeyInfoStripProps) {
    // Helper to format today's hours for primary location
    const getTodayHours = () => {
        if (!locations || locations.length === 0) return "Open Today: 10am - 9pm"; // Fallback

        const primaryLoc = locations.find((l: any) => l.isPrimaryLocation) || locations[0];
        if (!primaryLoc || !primaryLoc.hours) return "Open Daily";

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = days[new Date().getDay()];
        const todaySchedule = primaryLoc.hours.find((h: any) => h.dayOfWeek === today);

        if (!todaySchedule || todaySchedule.isClosed) return "Closed Today";
        return `Today: ${todaySchedule.openTime} - ${todaySchedule.closeTime}`;
    };

    return (
        <div className="bg-buddas-brown text-white py-3 lg:py-4 px-4 shadow-md relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 text-sm lg:text-base font-dm-sans font-medium tracking-wide">

                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-buddas-gold" />
                    <span>{getTodayHours()}</span>
                </div>

                <Link href="#locations" className="flex items-center gap-2 hover:text-buddas-icon-gold transition-colors group">
                    <MapPin className="w-4 h-4 text-buddas-gold group-hover:text-white transition-colors" />
                    <span className="border-b border-white/20 group-hover:border-white transition-colors">Find a Location</span>
                </Link>

                {primaryPhone && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-buddas-gold" />
                        <a href={`tel:${primaryPhone}`} className="hover:text-buddas-gold transition-colors">
                            {primaryPhone}
                        </a>
                    </div>
                )}

            </div>
        </div>
    );
}
