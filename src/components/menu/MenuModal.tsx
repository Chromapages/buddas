"use client";

import { X, Flame, Leaf, Clock, Wheat } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatPrice } from "@/lib/utils";
import { useEffect } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";

interface MenuModalProps {
    item: any;
    isOpen: boolean;
    onClose: () => void;
}

export function MenuModal({ item, isOpen, onClose }: MenuModalProps) {
    // Only handle body scroll for Desktop modal (BottomSheet handles its own)
    useEffect(() => {
        if (window.innerWidth >= 768) {
            if (isOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "unset";
            }
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!item) return null;

    const imageUrl = item.image ? urlFor(item.image).width(1200).height(1200).url() : null;

    const ModalContent = () => (
        <div className="flex flex-col h-full font-sans">
            {/* Image Section - Compact for Mobile Sheet */}
            <div className="relative w-full h-56 shrink-0 overflow-hidden bg-buddas-cream rounded-xl mb-6">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-buddas-brown/20">
                        <span className="text-lg font-dm-sans">No Image</span>
                    </div>
                )}

                {/* Badges Over Image */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {item.isSignature && (
                        <div className="bg-buddas-gold text-buddas-brown font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-full shadow-sm">
                            Best Seller
                        </div>
                    )}
                    {item.tags?.includes('new') && !item.isSignature && (
                        <div className="bg-buddas-teal text-white font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-full shadow-sm">
                            New
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1 mb-4">
                <h3 className="font-poppins font-semibold text-2xl text-buddas-brown leading-tight">
                    {item.name}
                </h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-poppins font-bold text-buddas-gold tracking-tight">
                        {formatPrice(item.price)}
                    </span>
                    {item.comboPrice && (
                        <div className="text-sm text-buddas-brown/60 font-dm-sans">
                            / Combo: <span className="font-medium text-buddas-gold">{formatPrice(item.comboPrice)}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="prose prose-sm text-buddas-brown/80 leading-relaxed font-dm-sans mb-6">
                <p>{item.description}</p>
                {item.allergens?.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-buddas-brown/50 font-dm-sans bg-buddas-brown/5 p-2 rounded-lg inline-flex">
                        <Wheat className="w-3.5 h-3.5" />
                        <span>Contains: {item.allergens.join(', ')}</span>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-buddas-cream/50 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-buddas-brown/5">
                    <div className="flex items-center gap-1.5 mb-1 text-buddas-brown/40 text-[10px] font-bold uppercase tracking-wide font-dm-sans">
                        <Flame className="w-3.5 h-3.5 text-buddas-teal" />
                        Calories
                    </div>
                    <span className="text-buddas-brown font-semibold text-base font-poppins">
                        {item.calories || 'N/A'} <span className="text-xs font-normal opacity-50">kcal</span>
                    </span>
                </div>
                <div className="bg-buddas-cream/50 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-buddas-brown/5">
                    <div className="flex items-center gap-1.5 mb-1 text-buddas-brown/40 text-[10px] font-bold uppercase tracking-wide font-dm-sans">
                        <Clock className="w-3.5 h-3.5 text-buddas-teal" />
                        Prep
                    </div>
                    <span className="text-buddas-brown font-semibold text-base font-poppins">
                        {item.prepTime || '15-20'} <span className="text-xs font-normal opacity-50">min</span>
                    </span>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-4 pb- safe">
                <a
                    href="/order"
                    className="w-full flex items-center justify-center gap-2 bg-buddas-teal active:bg-buddas-teal-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-buddas-teal/20 transition-all active:scale-[0.98] text-base uppercase tracking-wide"
                >
                    Order Now
                </a>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Modal */}
            <div className={`fixed inset-0 z-[100] hidden md:flex items-center justify-center p-4 font-sans bg-buddas-brown/90 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {isOpen && (
                    <div className="relative w-full max-w-5xl group animate-in zoom-in-95 duration-300">
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-row min-h-[600px] w-full">

                            {/* Image Section */}
                            <div className="relative w-[45%] h-auto overflow-hidden bg-buddas-cream">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={item.name}
                                        fill
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-buddas-brown/20">
                                        <span className="text-lg font-dm-sans">No Image</span>
                                    </div>
                                )}

                                {/* Badges */}
                                {item.isSignature && (
                                    <div className="absolute top-6 left-6 bg-buddas-gold text-buddas-brown font-bold text-xs uppercase tracking-wider py-1.5 px-3 rounded-full shadow-sm">
                                        Best Seller
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-10 lg:p-12 flex flex-col relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 rounded-full text-buddas-brown/40 hover:text-buddas-teal hover:bg-buddas-teal/5 transition-colors duration-300"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="flex flex-col gap-2 mb-6">
                                    <h1 className="font-poppins font-semibold text-4xl lg:text-5xl text-buddas-brown leading-tight tracking-tight">
                                        {item.name}
                                    </h1>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <span className="text-3xl font-poppins font-medium text-buddas-gold tracking-tight">
                                            {formatPrice(item.price)}
                                        </span>
                                        {item.comboPrice && (
                                            <div className="text-sm text-buddas-brown/60 font-dm-sans">
                                                Combo: <span className="font-medium text-buddas-gold">{formatPrice(item.comboPrice)}</span>
                                                {item.comboPriceNote && <span className="ml-1">({item.comboPriceNote})</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="prose prose-sm mb-6 text-buddas-brown/80 leading-relaxed font-dm-sans text-lg">
                                    <p>{item.description}</p>
                                    {item.allergens?.length > 0 && (
                                        <div className="flex items-center gap-2 mt-4 text-xs text-buddas-brown/50 font-dm-sans">
                                            <Wheat className="w-4 h-4" />
                                            <span>Contains: {item.allergens.join(', ')}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-buddas-cream/50 rounded-2xl p-4 flex flex-col justify-center items-start border border-buddas-brown/5 transition-colors hover:border-buddas-teal/30">
                                        <div className="flex items-center gap-2 mb-1 text-buddas-brown/40 text-xs font-bold uppercase tracking-wide font-dm-sans">
                                            <Flame className="w-4 h-4 text-buddas-teal" />
                                            Calories
                                        </div>
                                        <span className="text-buddas-brown font-semibold text-lg font-poppins">
                                            {item.calories || 'N/A'} <span className="text-sm font-normal text-buddas-brown/50 font-dm-sans">kcal</span>
                                        </span>
                                    </div>
                                    <div className="bg-buddas-cream/50 rounded-2xl p-4 flex flex-col justify-center items-start border border-buddas-brown/5 transition-colors hover:border-buddas-teal/30">
                                        <div className="flex items-center gap-2 mb-1 text-buddas-brown/40 text-xs font-bold uppercase tracking-wide font-dm-sans">
                                            <Clock className="w-4 h-4 text-buddas-teal" />
                                            Prep time
                                        </div>
                                        <span className="text-buddas-brown font-semibold text-lg font-poppins">
                                            {item.prepTime || '15-20'} <span className="text-sm font-normal text-buddas-brown/50 font-dm-sans">min</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-dashed border-buddas-brown/10">
                                    <a
                                        href="/order"
                                        className="w-full flex items-center justify-center gap-2 bg-buddas-teal hover:bg-buddas-teal-dark text-white font-bold py-4 rounded-lg shadow-lg shadow-buddas-teal/30 transition-all transform active:scale-95 text-lg uppercase tracking-wide group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">Order Now</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Sheet */}
            <BottomSheet
                isOpen={isOpen}
                onClose={onClose}
                title="Item Details"
            >
                <ModalContent />
            </BottomSheet>
        </>
    );
}
