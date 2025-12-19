"use client";

import { X, Flame, Leaf, Clock, Wheat } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatPrice } from "@/lib/utils";
import { useEffect } from "react";

interface MenuModalProps {
    item: any;
    isOpen: boolean;
    onClose: () => void;
}

export function MenuModal({ item, isOpen, onClose }: MenuModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !item) return null;

    const imageUrl = item.image ? urlFor(item.image).width(1200).height(1200).url() : null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans bg-buddas-brown/60 backdrop-blur-md transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
            <div className="relative w-full max-w-5xl group perspective-1000 animate-in zoom-in-95 duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] w-full transform transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:border dark:border-white/5">

                    {/* Close Button Mobile */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black transition-all duration-200 shadow-sm md:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Image Section */}
                    <div className="relative w-full md:w-[45%] h-64 md:h-auto overflow-hidden bg-buddas-cream dark:bg-zinc-800">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={item.name}
                                fill
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-buddas-brown/20">
                                <span className="text-lg font-dm-sans">No Image</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>

                        {/* Tags / Best Seller Badge */}
                        {item.isSignature && (
                            <div className="absolute top-6 left-6 bg-buddas-cream border border-buddas-teal/10 text-buddas-teal-dark font-bold text-xs uppercase tracking-wider py-1.5 px-3 rounded-full shadow-lg backdrop-blur-sm">
                                Best Seller
                            </div>
                        )}
                        {item.tags?.includes('new') && !item.isSignature && (
                            <div className="absolute top-6 left-6 bg-buddas-gold text-buddas-brown font-bold text-xs uppercase tracking-wider py-1.5 px-3 rounded-full shadow-lg">
                                New Arrival
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col relative">
                        {/* Close Button Desktop */}
                        <button
                            onClick={onClose}
                            className="hidden md:flex absolute top-6 right-6 p-2 rounded-full text-buddas-brown/40 hover:text-buddas-teal hover:bg-buddas-teal/5 transition-colors duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col gap-2 mb-6">
                            <div className="flex items-start justify-between w-full pr-8">
                                <h1 className="font-poppins font-semibold text-3xl md:text-4xl lg:text-5xl text-buddas-brown dark:text-white leading-tight tracking-tight drop-shadow-sm">
                                    {item.name}
                                </h1>
                            </div>
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

                        <div className="prose prose-sm dark:prose-invert mb-6 text-buddas-brown/80 dark:text-gray-300 leading-relaxed font-dm-sans text-base md:text-lg">
                            <p>{item.description}</p>

                            {item.allergens?.length > 0 && (
                                <div className="flex items-center gap-2 mt-4 text-xs text-buddas-brown/50 font-dm-sans">
                                    <Wheat className="w-4 h-4" />
                                    <span>Contains: {item.allergens.join(', ')}</span>
                                </div>
                            )}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-buddas-cream/50 dark:bg-white/5 rounded-2xl p-4 flex flex-col justify-center items-start border border-buddas-brown/5 dark:border-white/5 transition-colors hover:border-buddas-teal/30 dark:hover:border-buddas-teal/30 shadow-inner">
                                <div className="flex items-center gap-2 mb-1 text-buddas-brown/40 dark:text-gray-500 text-xs font-bold uppercase tracking-wide font-dm-sans">
                                    <Flame className="w-4 h-4 text-buddas-teal" />
                                    Calories
                                </div>
                                <span className="text-buddas-brown dark:text-white font-bold text-lg font-poppins">
                                    {item.calories || 'N/A'} <span className="text-sm font-normal text-buddas-brown/50 font-dm-sans">kcal</span>
                                </span>
                            </div>
                            <div className="bg-buddas-cream/50 dark:bg-white/5 rounded-2xl p-4 flex flex-col justify-center items-start border border-buddas-brown/5 dark:border-white/5 transition-colors hover:border-buddas-teal/30 dark:hover:border-buddas-teal/30 shadow-inner">
                                <div className="flex items-center gap-2 mb-1 text-buddas-brown/40 dark:text-gray-500 text-xs font-bold uppercase tracking-wide font-dm-sans">
                                    <Clock className="w-4 h-4 text-buddas-teal" />
                                    Prep time
                                </div>
                                <span className="text-buddas-brown dark:text-white font-bold text-lg font-poppins">
                                    {item.prepTime || '15-20'} <span className="text-sm font-normal text-buddas-brown/50 font-dm-sans">min</span>
                                </span>
                            </div>
                        </div>

                        {/* Order Now CTA */}
                        <div className="mt-4 mb-8">
                            <a
                                href="/order"
                                className="w-full flex items-center justify-center gap-2 bg-buddas-teal hover:bg-buddas-teal-dark text-white font-bold py-4 rounded-lg shadow-lg shadow-teal-500/20 transition-all duration-300 transform active:scale-95 text-lg uppercase tracking-wide group"
                            >
                                <span className="group-hover:translate-x-1 transition-transform">Order Now</span>
                                <span className="sr-only">Order {item.name}</span>
                            </a>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-buddas-brown/5 dark:bg-zinc-800 border-b border-dashed border-buddas-brown/10 dark:border-zinc-700 mb-auto"></div>

                        {/* Info Footer */}
                        <div className="mt-8 p-6 bg-buddas-cream/50 rounded-xl border border-buddas-brown/5">
                            <p className="text-sm font-dm-sans text-buddas-brown/70 text-center leading-relaxed">
                                Available for pickup at our Pleasant Grove location.<br />
                                <a href="/locations" className="text-buddas-teal font-medium hover:text-buddas-teal-dark transition-colors inline-flex items-center gap-1 mt-2">
                                    Get directions & hours <span aria-hidden="true">→</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
