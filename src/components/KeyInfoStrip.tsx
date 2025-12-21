"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface KeyInfoStripProps {
    primaryPhone?: string;
    locations?: any[];
}

export function KeyInfoStrip({ primaryPhone, locations = [] }: KeyInfoStripProps) {
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
        <div className="hidden md:block bg-buddas-brown text-white py-2 sm:py-3 lg:py-4 px-4 shadow-md relative z-20">
            <div className="max-w-7xl mx-auto flex sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 text-sm sm:text-base font-dm-sans font-medium tracking-wide">

                {/* Hours - Icon only mobile, text desktop */}
                <div className="flex items-center gap-2" title={hoursText}>
                    <Clock className="w-4 h-4 text-buddas-gold" />
                    <span className="hidden sm:inline">{hoursText}</span>
                    <span className="sm:hidden text-xs text-white/80">Open Daily</span>
                </div>

                {/* Location */}
                <Link href="#locations" className="flex items-center gap-2 hover:text-buddas-icon-gold transition-colors group min-h-[44px] sm:min-h-0">
                    <MapPin className="w-4 h-4 text-buddas-gold group-hover:text-white transition-colors" />
                    <span className="border-b border-white/20 group-hover:border-white transition-colors">Find Us</span>
                </Link>

                {/* Phone - CTA Button on Mobile */}
                {primaryPhone && (
                    <div className="flex items-center">
                        <a
                            href={`tel:${primaryPhone}`}
                            className="flex items-center gap-2 sm:hover:text-buddas-gold transition-colors bg-buddas-gold/15 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-full sm:rounded-none border border-buddas-gold/30 sm:border-0"
                            aria-label={`Call us at ${primaryPhone}`}
                        >
                            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-buddas-gold" />
                            <span className="sm:hidden font-bold text-xs text-buddas-gold">Call</span>
                            <span className="hidden sm:inline">{primaryPhone}</span>
                        </a>
                    </div>
                )}

            </div>
        </div>
    );
}
