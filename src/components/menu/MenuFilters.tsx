"use client";

import { cn } from "@/lib/utils";
import { Check, SlidersHorizontal } from "lucide-react";

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
    return (
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 mask-fade-right">
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
    );
}
