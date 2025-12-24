"use client";

import { useRouter } from "next/navigation";

import { NewArrivalsSlideshow } from "./NewArrivalsSlideshow";
import { FeaturedSection } from "./menu/FeaturedSection";

interface MenuOffersSectionProps {
    featuredItems: any[];
    newItems: any[];
}

export function MenuOffersSection({ featuredItems, newItems }: MenuOffersSectionProps) {
    const router = useRouter();

    return (
        <div className="bg-white pb-24" id="menu-offers">
            {/* New Arrivals Slideshow (Full Width) */}
            <NewArrivalsSlideshow items={newItems} />



            {/* Featured Items Section (Switched to FeaturedSection and Swapped Order) */}
            <FeaturedSection
                items={featuredItems}
            />
        </div>
    );
}
