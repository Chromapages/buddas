"use client";

import { useState } from "react";
import { MapPin, Phone, Info, Map, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyLocationBarProps {
    location: any;
}

export function StickyLocationBar({ location }: StickyLocationBarProps) {
    const [showAddress, setShowAddress] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    if (!location) return null;

    const googleMapsUrl = location.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(`${location.addressLine1}, ${location.city}, ${location.state} ${location.zip}`)}`;
    const phoneUrl = location.phone ? `tel:${location.phone.replace(/\D/g, '')}` : undefined;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 font-display">
            <div className="mx-auto flex w-fit max-w-fit items-center justify-center gap-4 rounded-full bg-buddas-dark p-2 text-white shadow-2xl transition-all duration-300 ease-in-out dark:bg-white dark:text-buddas-brown">
                <div className="flex shrink-0 items-center gap-3 pl-4">
                    <p className="hidden text-base font-bold leading-normal text-white sm:block">
                        Buddas Bakery & Grill
                    </p>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-buddas-teal/20 px-3">
                        <div className="h-2 w-2 rounded-full bg-buddas-teal"></div>
                        <p className="text-xs font-medium leading-normal text-buddas-teal">Now Open</p>
                    </div>
                </div>

                <div className="hidden items-center gap-4 px-4 md:flex">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowAddress(!showAddress)}
                            className="focus:outline-none text-white/70 hover:text-white transition-colors"
                            aria-label="Toggle address visibility"
                        >
                            <MapPin className="w-[18px] h-[18px]" />
                        </button>
                        <div className={cn(
                            "grid transition-[grid-template-columns] duration-300 ease-in-out",
                            showAddress ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
                        )}>
                            <div className="overflow-hidden">
                                <p className="text-sm font-normal leading-normal text-white/90 whitespace-nowrap pl-1">
                                    {location.addressLine1}, {location.city}, {location.state} {location.zip}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="h-4 w-px bg-white/20"></div>

                    {phoneUrl && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowPhone(!showPhone)}
                                className="focus:outline-none text-white/70 hover:text-white transition-colors"
                                aria-label="Toggle phone visibility"
                            >
                                <Phone className="w-[18px] h-[18px]" />
                            </button>
                            <div className={cn(
                                "grid transition-[grid-template-columns] duration-300 ease-in-out",
                                showPhone ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
                            )}>
                                <div className="overflow-hidden">
                                    <a
                                        href={phoneUrl}
                                        className="text-sm font-normal leading-normal text-white/90 whitespace-nowrap hover:text-primary transition-colors pl-1 block"
                                    >
                                        {location.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-2 sm:flex-initial">
                    <button className="flex min-w-0 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-white/10 px-4 text-white transition-colors hover:bg-white/20 md:hidden">
                        <Info className="w-6 h-6" />
                    </button>

                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-white/10 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-white/20"
                    >
                        <Map className="w-5 h-5 mr-2 hidden sm:inline-block" />
                        <span className="truncate">Directions</span>
                    </a>

                    {location.orderingUrl && (
                        <a
                            href={location.orderingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-transform hover:scale-105"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2 hidden sm:inline-block" />
                            <span className="truncate">Order Now</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
