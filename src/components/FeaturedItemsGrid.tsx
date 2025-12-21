"use client";

import { useRouter } from "next/navigation";
import { MenuCard } from "@/components/menu/MenuCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";

interface FeaturedItemsGridProps {
    items: any[];
}

export function FeaturedItemsGrid({ items }: FeaturedItemsGridProps) {
    const router = useRouter();

    if (!items || items.length === 0) return null;

    // Use only top 6 items
    const displayItems = items.slice(0, 6);

    return (
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-16 lg:py-20 xl:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-buddas-gold/10 p-3 rounded-xl border border-buddas-gold/20 text-buddas-brown shadow-sm">
                        <Flame className="w-6 h-6 fill-buddas-gold text-buddas-orange" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-buddas-brown tracking-tight">
                            Customer Favorites
                        </h2>
                        <p className="text-buddas-brown/60 font-dm-sans mt-1">
                            Tried and true local legends.
                        </p>
                    </div>
                </div>

                <Button asChild variant="outline" className="hidden md:flex border-buddas-teal text-buddas-teal">
                    <Link href="/menu">
                        View Full Menu
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                {displayItems.map((item) => (
                    <MenuCard
                        key={item._id || item.id}
                        item={item}
                        onClick={() => router.push('/menu')} // Navigate to menu on click
                    />
                ))}
            </div>

            {/* Mobile-only CTA */}
            <div className="mt-8 flex justify-center md:hidden">
                <Button asChild size="lg" className="w-full sm:w-auto bg-buddas-teal text-white">
                    <Link href="/menu">
                        View Full Menu
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
