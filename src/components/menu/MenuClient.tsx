"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuCard } from "./MenuCard";
import { MenuModal } from "./MenuModal";
import { useScroll, useMotionValueEvent } from "framer-motion";
import {
    ChefHat,
    Sandwich,
    Pizza,
    Leaf,
    Coffee,
    Cookie
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

import { MenuSearch } from "./MenuSearch";
import { MenuFilters } from "./MenuFilters";
import { FeaturedSection } from "./FeaturedSection";

interface MenuClientProps {
    categories: any[];
    featuredItems?: any[];
    pageSettings?: any;
}

export function MenuClient({ categories, featuredItems = [], pageSettings }: MenuClientProps) {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [isAllItemsView, setIsAllItemsView] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>("");

    // Filter Logic
    const filteredCategories = useMemo(() => {
        // 1. Deep clone to avoid mutating props
        let filtered = JSON.parse(JSON.stringify(categories));

        // 2. Filter items within categories
        filtered = filtered.map((cat: any) => {
            const validItems = cat.items?.filter((item: any) => {
                // Search Match
                const query = searchQuery.toLowerCase();
                const matchesSearch = !query ||
                    item.name.toLowerCase().includes(query) ||
                    item.description?.toLowerCase().includes(query) ||
                    item.tags?.some((t: string) => t.toLowerCase().includes(query));

                // Filter Match (ALL selected filters must be present)
                const matchesFilters = activeFilters.every(filter => {
                    if (filter === 'vegetarian') return item.tags?.includes('vegetarian') || item.tags?.includes('vegan');
                    if (filter === 'glutenFriendly') return item.tags?.includes('glutenFriendly');
                    if (filter === 'spicy') return item.tags?.includes('spicy');
                    if (filter === 'keikiFriendly') return item.tags?.includes('keikiFriendly');
                    if (filter === 'signature') return item.isSignature;
                    return true;
                });

                return matchesSearch && matchesFilters;
            });

            return { ...cat, items: validItems };
        });

        // 3. Remove empty categories
        return filtered.filter((cat: any) => cat.items && cat.items.length > 0);
    }, [categories, searchQuery, activeFilters]);

    // Scroll Spy
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id);
                }
            });
        }, { rootMargin: "-15% 0px -50% 0px", threshold: 0 });

        categories.forEach(cat => {
            const id = cat.slug?.current || cat.title;
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [categories, filteredCategories]);

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    // Logic for Hero Image
    const heroImageUrl = pageSettings?.heroImage
        ? urlFor(pageSettings.heroImage).width(2000).url()
        : "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop";

    // Helper to get icon for category
    const getCategoryIcon = (title: string, iconName?: string) => {
        // Dynamic Map
        const ICON_MAP: any = {
            ChefHat, Sandwich, Pizza, Leaf, Coffee, Cookie
        };

        if (iconName && ICON_MAP[iconName]) {
            const IconComponent = ICON_MAP[iconName];
            return <IconComponent className="w-5 h-5" />;
        }

        // Fallback
        const t = title.toLowerCase();
        if (t.includes("burger")) return <Sandwich className="w-5 h-5" />;
        if (t.includes("pizza")) return <Pizza className="w-5 h-5" />;
        if (t.includes("healthy") || t.includes("vegan") || t.includes("salad")) return <Leaf className="w-5 h-5" />;
        if (t.includes("drink") || t.includes("coffee") || t.includes("tea")) return <Coffee className="w-5 h-5" />;
        if (t.includes("dessert") || t.includes("sweet")) return <Cookie className="w-5 h-5" />;
        return <ChefHat className="w-5 h-5" />; // Default
    };

    const scrollToSection = (id: string) => {
        setIsAllItemsView(false); // Exit "All Items" view when navigating to a section
        setActiveCategory(id); // Optimistic update
        const element = document.getElementById(id);
        if (element) {
            const offset = 180; // Adjusted offset for new sticky header layout
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

    // Scroll Detection for Collapsible Header
    const { scrollY } = useScroll();
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest - lastScrollY.current;
        if (Math.abs(direction) < 50) return; // Debounce small scrolls

        if (direction > 0 && latest > 200) {
            setIsHeaderVisible(false); // Hide on scroll down
        } else {
            setIsHeaderVisible(true); // Show on scroll up
        }
        lastScrollY.current = latest;
    });

    return (
        <div className="bg-buddas-cream min-h-screen">
            {/* Modal */}
            <MenuModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />

            {/* Hero Section - Hidden on mobile */}
            <header className="relative hidden md:flex min-h-[65vh] items-center justify-center overflow-hidden bg-buddas-brown">
                {/* Parallax Background Image */}
                <div className="absolute inset-0 z-0 opacity-40 select-none">
                    <Image
                        src={heroImageUrl}
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 relative z-10 text-center flex flex-col items-center mt-10">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-buddas-gold text-buddas-brown text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                        Island Favorites
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-buddas-cream tracking-tight font-poppins drop-shadow-md leading-tight mb-4">
                        {pageSettings?.heroTitle || "The Buddas Menu"}
                    </h1>
                    <p className="text-lg md:text-xl text-buddas-cream/80 max-w-2xl mx-auto font-dm-sans leading-relaxed">
                        {pageSettings?.heroSubtitle || "Steaming rice. Crisp Katsu. Real Aloha. Explore our plates."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Button
                            asChild
                            size="lg"
                            className="bg-buddas-teal text-white hover:bg-buddas-teal-dark transition-colors font-medium uppercase tracking-wide rounded-lg px-8 py-4 h-auto text-base shadow-lg shadow-buddas-teal/30 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-1 active:shadow-sm ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-300"
                        >
                            <Link href={pageSettings?.heroCta?.link || "/order"}>
                                {pageSettings?.heroCta?.label || "Order Online"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Sticky Navigation & Search */}
            <div className="sticky top-[70px] md:top-[80px] lg:top-[90px] z-40 bg-white border-b border-buddas-brown/5 shadow-md">
                <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16 py-4 flex flex-col gap-4">

                    {/* Search & Filters Row - Always Visible */}
                    <div className="flex flex-row items-center justify-between gap-3 w-full">
                        <div className="flex-1 md:max-w-lg xl:max-w-xl">
                            <MenuSearch onSearch={setSearchQuery} />
                        </div>
                        <div className="shrink-0">
                            <MenuFilters activeFilters={activeFilters} onToggleFilter={toggleFilter} />
                        </div>
                    </div>

                    {/* Category Pills Row */}
                    <div className="flex items-center gap-3 lg:gap-4 overflow-x-auto no-scrollbar mask-fade-right pb-1">
                        <button
                            onClick={() => {
                                setIsAllItemsView(true);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 whitespace-nowrap group shrink-0 ${isAllItemsView && !searchQuery
                                ? "bg-buddas-teal text-white border-buddas-teal shadow-lg shadow-buddas-teal/20"
                                : "bg-white text-buddas-brown hover:border-buddas-teal-dark hover:text-buddas-teal-dark border-buddas-brown/10"
                                }`}
                        >
                            <div className={`p-1 rounded-full ${isAllItemsView && !searchQuery ? "bg-buddas-teal-dark" : "bg-buddas-teal/10 text-buddas-teal group-hover:bg-buddas-teal group-hover:text-white transition-colors"}`}>
                                <ChefHat className="w-4 h-4" />
                            </div>
                            <span className="font-dm-sans font-medium">View All</span>
                        </button>

                        {filteredCategories.map((category: any) => {
                            const Icon = getCategoryIcon(category.title, category.iconName);
                            const isActive = activeCategory === (category.slug?.current || category.title);

                            return (
                                <button
                                    key={category._id}
                                    onClick={() => scrollToSection(category.slug?.current || category.title)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 whitespace-nowrap group shrink-0 ${isActive
                                        ? "bg-buddas-teal text-white border-buddas-teal shadow-md"
                                        : "bg-white text-buddas-brown border-buddas-brown/10 hover:border-buddas-teal-dark hover:text-buddas-teal-dark"
                                        }`}
                                >
                                    <div className={`p-1 rounded-full ${isActive ? "bg-buddas-teal-dark text-white" : "bg-buddas-teal/10 text-buddas-teal group-hover:bg-buddas-teal group-hover:text-white transition-colors"}`}>
                                        {Icon}
                                    </div>
                                    <span className={`font-dm-sans font-medium ${isActive ? "text-white" : ""}`}>{category.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Featured Items Section */}
            {(!searchQuery && !activeFilters.length && !isAllItemsView && featuredItems.length > 0) && (
                <FeaturedSection
                    items={featuredItems}
                    onItemClick={setSelectedItem}
                    title={pageSettings?.featuredItemsTitle}
                />
            )}

            {/* Menu Sections */}
            <div className="flex flex-col">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category: any, idx: number) => {
                        const Icon = getCategoryIcon(category.title, category.iconName);
                        // Alternating backgrounds
                        const isEven = idx % 2 === 0;

                        return (
                            <section
                                key={category._id}
                                id={category.slug?.current || category.title}
                                className={`py-16 relative z-10 ${isEven ? 'bg-buddas-cream/30' : 'bg-white'}`}
                            >
                                <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 2xl:px-16">
                                    <div className="w-full">
                                        {/* Section Header */}
                                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-buddas-brown/5">
                                            <span className="text-buddas-teal p-3 bg-buddas-teal/5 rounded-xl">
                                                {Icon}
                                            </span>
                                            <div>
                                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold text-buddas-brown tracking-tight">
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
                                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
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
                                                <p>No items match your search in {category.title}.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        );
                    })
                ) : (
                    <div className="py-24 text-center">
                        <div className="inline-block p-6 rounded-full bg-buddas-cream mb-4 text-buddas-teal">
                            <Leaf className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold text-buddas-brown mb-2">No items found</h3>
                        <p className="text-buddas-brown/60 font-dm-sans">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveFilters([]); }}
                            className="mt-6 text-buddas-teal font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Allergen Statement */}
            {pageSettings?.allergenStatement && (
                <div className="bg-buddas-cream border-t border-buddas-brown/10 py-12 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-sm md:text-base text-buddas-brown/60 font-dm-sans leading-relaxed">
                            {pageSettings.allergenStatement}
                        </p>
                    </div>
                </div>
            )}

            {/* Closing CTA */}
            <section className="py-24 relative bg-buddas-teal overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6 font-poppins">
                        {pageSettings?.closingCta?.title || "Ready to Order?"}
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {pageSettings?.closingCta?.subtitle || "Skip the line and order ahead for pickup, or get authentic Hawaiian flavors delivered to your door."}
                    </p>
                    <div className="flex flex-col items-center gap-6">
                        <Button
                            asChild
                            size="lg"
                            className="bg-buddas-cream text-buddas-brown hover:bg-white hover:text-buddas-teal transition-all font-bold uppercase tracking-wide rounded-lg px-10 py-5 h-auto text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-[1px] active:shadow-sm ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-300"
                        >
                            <Link href={pageSettings?.closingCta?.buttonLink || "/order"}>
                                {pageSettings?.closingCta?.buttonLabel || "Order Now"}
                            </Link>
                        </Button>
                        <div className="text-white/80 font-dm-sans">
                            {pageSettings?.closingCta?.phone && (
                                <p>Prefer to call? <a href={`tel:${pageSettings.closingCta.phone}`} className="text-white font-bold hover:underline">{pageSettings.closingCta.phone}</a></p>
                            )}
                            <p className="text-sm mt-1 opacity-70">Open Daily 11:00 AM - 9:00 PM</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
