


import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { TrustedBy } from "./TrustedBy";
import { NewArrivalsSlideshow } from "./NewArrivalsSlideshow";
import { FeaturedItemsGrid } from "@/components/FeaturedItemsGrid";

interface MenuOffersSectionProps {
    featuredItems: any[];
    popularItems: any[];
    newItems: any[];
    promotions?: any[];
    trustedByData?: any;
}

export function MenuOffersSection({ featuredItems, popularItems, newItems, promotions, trustedByData }: MenuOffersSectionProps) {
    return (
        <div className="bg-white pb-24" id="menu-offers">

            {/* Trusted By Section (New) */}
            <TrustedBy trustedByData={trustedByData} />

            {/* Featured Items Grid (New) */}
            <FeaturedItemsGrid items={featuredItems} />

            {/* Part A: Values Section (Swapped) */}
            <ValuePropositionSection />





            {/* New Arrivals Slideshow (Full Width) */}
            <NewArrivalsSlideshow items={newItems} />

        </div>
    );
}
