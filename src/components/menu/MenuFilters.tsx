"use client";

import { cn } from "@/lib/utils";
import { Check, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";

interface MenuFiltersProps {
    activeFilters: string[];
    onToggleFilter: (filter: string) => void;
}

const FILTERS = [
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Gluten-Friendly", value: "glutenFriendly" },
    { label: "Spicy", value: "spicy" },
    { label: "Keiki Friendly", value: "keikiFriendly" },
    { label: "Signature", value: "signature" },
];

export function MenuFilters({ activeFilters, onToggleFilter }: MenuFiltersProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <>
            {/* Desktop: Horizontal List */}
            <div className="hidden md:flex items-center gap-3 overflow-x-auto no-scrollbar py-2 mask-fade-right">
                <div className="flex items-center gap-2 text-sm font-medium text-buddas-brown/60 px-2 shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Filters:</span>
                </div>
                {FILTERS.map((filter) => {
                    const isActive = activeFilters.includes(filter.value);
                    return (
                        <button
                            key={filter.value}
                            onClick={() => onToggleFilter(filter.value)}
                            className={cn(
                                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border shrink-0 whitespace-nowrap",
                                isActive
                                    ? "bg-buddas-teal text-white border-buddas-teal shadow-md shadow-buddas-teal/20"
                                    : "bg-white text-buddas-brown/70 border-buddas-brown/10 hover:border-buddas-teal-dark/50 hover:text-buddas-teal-dark"
                            )}
                        >
                            {isActive && <Check className="w-3.5 h-3.5" />}
                            {filter.label}
                        </button>
                    );
                })}
                {activeFilters.length > 0 && (
                    <button
                        onClick={() => activeFilters.forEach(f => onToggleFilter(f))}
                        className="text-xs text-buddas-brown/50 hover:text-buddas-orange underline underline-offset-2 px-2 shrink-0 transition-colors"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Mobile: Filter Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsSheetOpen(true)}
                    className={cn(
                        "flex items-center justify-center gap-2 h-12 w-12 rounded-full border transition-all duration-300 relative",
                        activeFilters.length > 0
                            ? "bg-buddas-teal text-white border-buddas-teal shadow-md"
                            : "bg-white text-buddas-brown border-buddas-brown/10"
                    )}
                    aria-label="Open filters"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    {activeFilters.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-buddas-gold text-buddas-brown text-[10px] font-bold flex items-center justify-center rounded-full border border-white shadow-sm">
                            {activeFilters.length}
                        </div>
                    )}
                </button>
            </div>

            {/* Mobile Filters Sheet */}
            <BottomSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                title="Filter Menu"
            >
                <div className="flex flex-col gap-3 font-dm-sans">
                    {/* Filter Options */}
                    <div className="grid grid-cols-1 gap-3">
                        {FILTERS.map((filter) => {
                            const isActive = activeFilters.includes(filter.value);
                            return (
                                <button
                                    key={filter.value}
                                    onClick={() => onToggleFilter(filter.value)}
                                    className={cn(
                                        "flex items-center justify-between px-5 py-4 rounded-xl text-base font-medium transition-all duration-200 border w-full",
                                        isActive
                                            ? "bg-buddas-teal/5 border-buddas-teal text-buddas-teal-dark"
                                            : "bg-zinc-50 border-zinc-100 text-buddas-brown"
                                    )}
                                >
                                    <span className="flex items-center gap-3">
                                        {/* Optional icons could go here */}
                                        {filter.label}
                                    </span>
                                    {isActive && (
                                        <div className="w-6 h-6 bg-buddas-teal text-white rounded-full flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-dashed border-zinc-200">
                        {activeFilters.length > 0 && (
                            <button
                                onClick={() => activeFilters.forEach(f => onToggleFilter(f))}
                                className="flex-1 py-3 text-buddas-brown/60 font-medium hover:text-buddas-brown transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                        <button
                            onClick={() => setIsSheetOpen(false)}
                            className="flex-1 bg-buddas-brown text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform"
                        >
                            View Results
                        </button>
                    </div>
                </div>
            </BottomSheet>
        </>
    );
}
