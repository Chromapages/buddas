"use client";

import { MapPin, Clock, ArrowRight, Phone, Navigation } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LocationsSectionProps {
    locations?: any[];
}

export function LocationsSection({ locations = [] }: LocationsSectionProps) {
    if (!locations || locations.length === 0) return null;

    // Helper to format today's hours
    const getTodayHours = (hours: any[]) => {
        if (!hours) return "Call for hours";

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = days[new Date().getDay()];
        const todaySchedule = hours.find((h: any) => h.dayOfWeek === today);

        if (!todaySchedule || todaySchedule.isClosed) return "Closed Today";
        return `Open Today: ${todaySchedule.openTime} - ${todaySchedule.closeTime}`;
    };

    return (
        <section className="bg-white py-16 md:py-24 lg:py-28 xl:py-32 border-b border-buddas-brown/5" id="locations">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-buddas-gold font-dm-sans font-bold tracking-widest uppercase text-sm mb-4 block">
                        Find Your Nearest
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-poppins font-semibold text-buddas-brown mb-6 tracking-tight">
                        Visit Us Today
                    </h2>
                    <p className="text-lg text-buddas-brown/80 font-dm-sans leading-relaxed">
                        Stop by for a plate lunch, pick up a catering order, or just come say aloha.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                    {locations.map((loc) => {
                        const todayHours = getTodayHours(loc.hours);

                        return (
                            <div key={loc._id} className="group bg-buddas-cream/30 rounded-3xl p-8 border border-buddas-brown/5 hover:border-buddas-teal/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-poppins font-semibold text-buddas-brown mb-2 group-hover:text-buddas-teal transition-colors">
                                            {loc.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-buddas-gold font-medium text-sm">
                                            <div className="w-2 h-2 rounded-full bg-buddas-gold animate-pulse" />
                                            {todayHours}
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-buddas-teal shadow-sm group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8 flex-grow">
                                    <div className="flex items-start gap-3 text-buddas-brown/80">
                                        <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-buddas-teal" />
                                        <p className="font-dm-sans leading-relaxed">
                                            {loc.addressLine1}<br />
                                            {loc.city}, {loc.state} {loc.zip}
                                        </p>
                                    </div>

                                    {loc.phone && (
                                        <div className="flex items-center gap-3 text-buddas-brown/80">
                                            <Phone className="w-5 h-5 shrink-0 text-buddas-teal" />
                                            <a href={`tel:${loc.phone}`} className="font-dm-sans hover:text-buddas-teal transition-colors">
                                                {loc.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                    {loc.orderingUrl && (
                                        <Button asChild size="lg" className="w-full">
                                            <Link href={loc.orderingUrl} target="_blank">
                                                Order
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        </Button>
                                    )}

                                    <Button asChild variant="outline" size="lg" className="w-full">
                                        <a href={loc.mapUrl || `https://maps.google.com/?q=${loc.addressLine1},${loc.city}`} target="_blank" rel="noopener noreferrer">
                                            Directions
                                            <Navigation className="w-4 h-4 ml-2" />
                                        </a>
                                    </Button>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
