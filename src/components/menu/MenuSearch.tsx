"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface MenuSearchProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export function MenuSearch({ onSearch, placeholder = "Search menu..." }: MenuSearchProps) {
    const [query, setQuery] = useState("");

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-buddas-brown/40">
                <Search className="w-5 h-5" />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full py-3 pl-12 pr-10 bg-white border border-buddas-brown/10 rounded-full text-buddas-brown placeholder:text-buddas-brown/30 focus:outline-none focus:ring-2 focus:ring-buddas-teal/50 focus:border-buddas-teal transition-all shadow-sm font-dm-sans"
            />
            {query && (
                <button
                    onClick={() => setQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-buddas-brown/40 hover:text-buddas-teal transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
