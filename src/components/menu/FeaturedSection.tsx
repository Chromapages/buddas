"use client";

import { Flame } from "lucide-react";
import { MenuCard } from "./MenuCard";

interface FeaturedSectionProps {
    items: any[];
    onItemClick: (item: any) => void;
    title?: string;
}

export function FeaturedSection({ items, onItemClick, title = "Customer Favorites" }: FeaturedSectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-16 md:py-20 bg-buddas-teal/5 border-b border-buddas-brown/5 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-buddas-teal/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 2xl:px-16 relative z-10">
                <div className="w-full">
                    <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
                        <div className="bg-buddas-gold/10 p-3 rounded-xl border border-buddas-gold/20 text-buddas-brown shadow-sm">
                            <Flame className="w-6 h-6 fill-buddas-gold text-buddas-orange" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-buddas-brown tracking-tight">
                                {title}
                            </h2>
                            <p className="text-buddas-brown/60 font-dm-sans mt-1">
                                Tried and true local legends.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <MenuCard
                                key={item._id}
                                item={item}
                                onClick={() => onItemClick(item)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
