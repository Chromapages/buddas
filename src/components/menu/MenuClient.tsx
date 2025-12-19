"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuCard } from "./MenuCard";
import { MenuModal } from "./MenuModal";
import {
    ChefHat,
    Sandwich,
    Pizza,
    Leaf,
    Coffee,
    Cookie
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface MenuClientProps {
    categories: any[];
    // We might want to pass all items flattened if we want "All Items" to work easily, 
    // or we can extract them from categories if the structure is nested.
    // Based on previous code, categories contained items.
}

export function MenuClient({ categories }: MenuClientProps) {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Helper to get icon for category (Mapping approx to user request)
    const getCategoryIcon = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes("burger")) return <Sandwich className="w-5 h-5" />;
        if (t.includes("pizza")) return <Pizza className="w-5 h-5" />;
        if (t.includes("healthy") || t.includes("vegan") || t.includes("salad")) return <Leaf className="w-5 h-5" />;
        if (t.includes("drink") || t.includes("coffee") || t.includes("tea")) return <Coffee className="w-5 h-5" />;
        if (t.includes("dessert") || t.includes("sweet")) return <Cookie className="w-5 h-5" />;
        return <ChefHat className="w-5 h-5" />; // Default
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 210; // Account for sticky header + announcement + menu nav
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-buddas-cream min-h-screen">
            {/* Modal */}
            <MenuModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />

            {/* Hero Section */}
            <header className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-buddas-brown">
                {/* Parallax Background Image */}
                <div className="absolute inset-0 z-0 opacity-40 select-none">
                    <Image
                        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <AnimatedSection className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center mt-10">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-buddas-teal/10 text-buddas-teal-light text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border border-buddas-teal/20 backdrop-blur-sm">
                        Island Favorites
                    </span>
                    <h1 className="text-5xl md:text-7xl font-semibold text-buddas-cream tracking-tight font-poppins drop-shadow-md leading-tight mb-4">
                        The Buddas <span className="text-buddas-teal drop-shadow-sm">Menu</span>
                    </h1>
                    <p className="text-xl text-buddas-cream/80 max-w-2xl mx-auto font-dm-sans leading-relaxed">
                        Steaming rice. Crisp Katsu. Real Aloha. Explore our plates.
                    </p>
                </AnimatedSection>
            </header>

            {/* Quick Nav (Sticky) */}
            <div className="sticky top-[136px] z-40 bg-buddas-cream/95 backdrop-blur-md border-b border-buddas-brown/5 shadow-sm transition-all duration-300 w-full">
                <div className="w-full px-4 md:px-8 lg:px-12 py-2">
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mask-fade-right py-2">
                        {categories.map((category) => (
                            <button
                                key={category._id}
                                onClick={() => scrollToSection(category.slug?.current || category.title)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] text-sm md:text-base font-dm-sans bg-white border border-buddas-brown/10 text-buddas-brown/70 hover:border-buddas-teal hover:text-buddas-teal hover:-translate-y-[1px] shadow-sm hover:shadow-md active:bg-buddas-teal/5"
                            >
                                {getCategoryIcon(category.title)}
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="pb-32">
                {categories.map((category, index) => (
                    <section
                        key={category._id}
                        id={category.slug?.current || category.title}
                        className={`py-16 relative z-10 ${index % 2 === 0 ? 'bg-buddas-cream' : 'bg-white'}`}
                    >
                        <div className="max-w-[1920px] mx-auto px-6 md:px-10">
                            <AnimatedSection delay={100}>
                                {/* Section Header */}
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-buddas-brown/5">
                                    <span className="text-buddas-teal p-3 bg-buddas-teal/5 rounded-xl">
                                        {getCategoryIcon(category.title)}
                                    </span>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-buddas-brown tracking-tight">
                                            {category.title}
                                        </h2>
                                        {category.description && (
                                            <p className="text-base text-buddas-brown/60 font-dm-sans mt-1">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Items Grid */}
                                {category.items && category.items.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {category.items.map((item: any) => (
                                            <MenuCard
                                                key={item._id}
                                                item={item}
                                                onClick={() => setSelectedItem(item)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-buddas-brown/40 font-dm-sans bg-buddas-brown/5 rounded-2xl border border-dashed border-buddas-brown/10">
                                        <p>No items currently available in {category.title}.</p>
                                    </div>
                                )}
                            </AnimatedSection>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
