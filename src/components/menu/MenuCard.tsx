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
    // const hasDiscount = false; // Placeholder - removed for now

    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${item.name}`}
            className="bg-white rounded-xl p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-buddas-brown/5 hover:shadow-[0_12px_20px_-5px_rgba(0,0,0,0.1)] hover:border-buddas-teal/20 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group hover:-translate-y-1 h-full flex flex-col cursor-pointer outline-none focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2"
        >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 shrink-0 bg-buddas-cream">
                {/* Badges */}
                {isPopular && (
                    <span className="absolute top-3 left-3 bg-buddas-gold text-buddas-brown text-[10px] font-bold px-3 py-1.5 rounded-full z-10 uppercase tracking-wide flex items-center gap-1 shadow-sm">
                        <Flame className="w-3 h-3 fill-buddas-teal" /> Popular
                    </span>
                )}
                {isNew && !isPopular && (
                    <span className="absolute top-3 left-3 bg-buddas-gold text-buddas-brown text-[10px] font-bold px-3 py-1.5 rounded-full z-10 uppercase tracking-wide flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-buddas-brown" /> New
                    </span>
                )}
                {isVegetarian && !isPopular && !isNew && (
                    <span className="absolute top-3 left-3 bg-buddas-teal/10 text-buddas-teal text-[10px] font-bold px-3 py-1.5 rounded-full z-10 uppercase tracking-wide flex items-center gap-1 border border-buddas-teal/30">
                        <Leaf className="w-3 h-3 fill-buddas-teal" /> Veggie
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
                        <span className="text-xs font-dm-sans">No Image</span>
                    </div>
                )}
            </div>

            <div className="px-1 flex-col flex flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-poppins font-semibold text-buddas-brown leading-tight group-hover:text-buddas-teal-dark transition-colors duration-300">{item.name}</h3>
                </div>
                <p className="text-sm text-buddas-brown/70 font-dm-sans line-clamp-2 mb-4 leading-relaxed">{item.description}</p>

                {/* Tags */}
                <div className="flex items-center gap-4 text-xs text-buddas-brown/50 font-medium mb-5 mt-auto font-dm-sans">
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

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-buddas-brown/10">
                    <div className="flex flex-col">
                        <span className="text-xl font-poppins font-medium text-buddas-gold tracking-tight">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                        </span>
                    </div>
                    <span className="text-xs text-buddas-teal font-dm-sans font-bold uppercase tracking-wide transition-transform duration-300 group-hover:translate-x-1">
                        View Details →
                    </span>
                </div>
            </div>
        </div>
    );
}
