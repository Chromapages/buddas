"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";

interface MenuCategoryNavProps {
    categories: any[];
}

export function MenuCategoryNav({ categories }: MenuCategoryNavProps) {
    const [activeCategory, setActiveCategory] = React.useState<string>("");

    React.useEffect(() => {
        const handleScroll = () => {
            // Simple scroll spy logic
            const sections = categories.map(c => document.getElementById(c.slug));
            const scrollPosition = window.scrollY + 200; // Offset

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveCategory(categories[i].slug);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [categories]);

    const scrollToCategory = (slug: string) => {
        const element = document.getElementById(slug);
        if (element) {
            const headerOffset = 140; // Height of header + nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveCategory(slug);
        }
    };

    if (!categories || categories.length === 0) return null;

    return (
        <div className="sticky top-[136px] z-40 bg-buddas-cream/95 backdrop-blur border-b border-buddas-brown/10 py-4 overflow-x-auto no-scrollbar">
            <div className="container mx-auto px-4">
                <div className="flex gap-2 min-w-max mx-auto justify-center py-2">
                    {categories.map((category) => (
                        <Button
                            key={category._id}
                            variant={activeCategory === category.slug ? "default" : "ghost"}
                            onClick={() => scrollToCategory(category.slug)}
                            className={cn(
                                "rounded-full transition-all pl-1 pr-4",
                                activeCategory === category.slug
                                    ? "bg-buddas-teal text-white hover:bg-buddas-teal/90"
                                    : "text-buddas-brown hover:bg-buddas-brown/5 hover:text-buddas-teal"
                            )}
                        >
                            {category.icon && (
                                <div className="relative w-6 h-6 mr-2 rounded-full overflow-hidden bg-buddas-cream">
                                    <Image
                                        src={urlFor(category.icon).width(64).height(64).url()}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <span className={cn(!category.icon && "pl-3")}>{category.title}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
