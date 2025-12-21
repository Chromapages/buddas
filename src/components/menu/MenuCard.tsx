"use client";

import { urlFor } from "@/sanity/lib/image";
import { Flame, Clock, Leaf, Star } from "lucide-react";
import Image from "next/image";

interface MenuCardProps {
    item: any;
    onClick?: () => void;
}

export function MenuCard({ item, onClick }: MenuCardProps) {
    const imageUrl = item.image ? urlFor(item.image).width(600).height(600).url() : null;

    // Determine badges
    const isPopular = item.isSignature;
    const isNew = item.tags?.includes('new');
    const isVegetarian = item.tags?.includes('vegetarian') || item.tags?.includes('vegan');
    const isSpicy = item.tags?.includes('spicy');

    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${item.name}`}
            className="bg-white rounded-2xl p-2.5 sm:p-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] border border-buddas-brown/5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12)] hover:border-buddas-teal/20 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group hover:-translate-y-1 h-full flex flex-col cursor-pointer outline-none focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2"
        >
            <div className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden mb-2 sm:mb-4 shrink-0 bg-buddas-cream">
                {/* Badges */}
                {isPopular && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-buddas-gold text-buddas-brown text-[8px] sm:text-[10px] font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full z-10 uppercase tracking-wide flex items-center gap-1 shadow-sm">
                        <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-buddas-teal" /> <span className="hidden xs:inline">Popular</span>
                    </span>
                )}
                {isNew && !isPopular && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-buddas-gold text-buddas-brown text-[8px] sm:text-[10px] font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full z-10 uppercase tracking-wide flex items-center gap-1 shadow-sm">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-buddas-brown" /> <span className="hidden xs:inline">New</span>
                    </span>
                )}
                {isVegetarian && !isPopular && !isNew && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-buddas-teal/10 text-buddas-teal text-[8px] sm:text-[10px] font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full z-10 uppercase tracking-wide flex items-center gap-1 border border-buddas-teal/30">
                        <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-buddas-teal" /> <span className="hidden xs:inline">Veggie</span>
                    </span>
                )}

                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-buddas-brown/20 bg-buddas-cream">
                        <span className="text-[10px] sm:text-xs font-dm-sans">No Image</span>
                    </div>
                )}
            </div>

            <div className="px-1 flex-col flex flex-1">
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <h3 className="text-sm sm:text-xl font-poppins font-bold text-buddas-brown leading-tight group-hover:text-buddas-teal-dark transition-colors duration-300 line-clamp-2">{item.name}</h3>
                </div>
                <p className="hidden sm:block text-sm text-buddas-brown/70 font-dm-sans line-clamp-2 mb-4 leading-relaxed">{item.description}</p>

                {/* Tags - Desktop Only */}
                <div className="hidden sm:flex items-center gap-4 text-xs text-buddas-brown/50 font-medium mb-5 mt-auto font-dm-sans">
                    {isSpicy && (
                        <div className="flex items-center gap-1 text-buddas-orange">
                            <Flame className="w-3.5 h-3.5" />
                            <span>Spicy</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-buddas-teal" />
                        <span>{item.prepTime || '15-20'} min</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-dashed border-buddas-brown/10">
                    <div className="flex flex-col">
                        <span className="text-base sm:text-xl font-poppins font-bold text-buddas-brown tracking-tight">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                        </span>
                    </div>

                    {/* Action Button */}
                    <button
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-buddas-teal/10 text-buddas-teal flex items-center justify-center transition-all duration-300 group-hover:bg-buddas-teal group-hover:text-white"
                        aria-label="View Details"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
