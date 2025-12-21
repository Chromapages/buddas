"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
}

type HeaderCtaStyle =
    | "teal"
    | "gold"
    | "cream"
    | "brown"
    | "orange"
    | "dark"
    | "thanksgiving"
    | "christmas";

interface HeaderProps {
    navItems?: { label: string; url: string }[];
    ctaStyle?: HeaderCtaStyle;
}

const defaultNavItems = [
    { label: "Menu", href: "/menu" },
    { label: "Rewards", href: "/rewards" },
    { label: "Benefit Nights", href: "/benefit-nights" },
    { label: "Catering", href: "/catering" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export function Header({ navItems: _sanityNavItems, ctaStyle }: HeaderProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    // For reliability, always use the static default nav items for now.
    // This guarantees the nav and CTA render even if Sanity data is missing or malformed.
    const items: NavItem[] = defaultNavItems;

    const ctaColor = (style?: HeaderCtaStyle) => {
        switch (style) {
            case "gold":
                return "bg-buddas-gold text-buddas-brown hover:bg-buddas-gold/90";
            case "cream":
                return "bg-buddas-cream text-buddas-brown hover:bg-buddas-cream/90";
            case "brown":
                return "bg-buddas-brown text-white hover:bg-buddas-brown/90";
            case "orange":
                return "bg-buddas-orange text-white hover:bg-buddas-orange/90";
            case "dark":
                return "bg-buddas-dark text-white hover:bg-buddas-dark/90";
            case "thanksgiving":
                return "bg-amber-700 text-white hover:bg-amber-800";
            case "christmas":
                return "bg-red-600 text-white hover:bg-red-700";
            case "teal":
            default:
                return "bg-buddas-teal text-white hover:bg-buddas-teal/90";
        }
    };

    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-transparent bg-white shadow-sm py-4"
        >
            <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/BUDDAHAWAIIANLOGO.webp"
                            alt="Buddas Hawaiian logo"
                            width={220}
                            height={64}
                            priority
                            className="h-10 w-auto md:h-12"
                        />
                    </div>
                </Link>

                {/* Desktop Nav (force visible on all breakpoints for reliability) */}
                <nav className="flex items-center gap-6 lg:gap-8">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-bold text-buddas-brown hover:text-buddas-teal transition-colors relative group uppercase tracking-wide"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-buddas-teal transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Button
                        asChild
                        className={cn(
                            "ml-4 rounded-full px-6 lg:px-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 font-bold",
                            ctaColor(ctaStyle)
                        )}
                    >
                        <Link href="https://order.spoton.com/so-buddas-bakery-and-breakfast-23084/pleasant-grove-ut/67dda33e1b8098dc7af11099" target="_blank" rel="noopener noreferrer">Order Now</Link>
                    </Button>
                </nav>

                {/* Mobile Nav (temporarily hidden trigger; desktop nav is always visible) */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="hidden">
                        <Button variant="ghost" size="icon" className="text-buddas-brown hover:bg-buddas-cream/50">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-0 shadow-2xl">
                        <SheetTitle className="font-display text-2xl text-primary mb-8 text-left pl-2">Menu</SheetTitle>
                        <nav className="flex flex-col gap-2">
                            {items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 px-4 py-3 rounded-xl transition-all"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="mt-6 px-2">
                                <Button
                                    asChild
                                    className={cn(
                                        "w-full rounded-full h-12 text-base font-bold shadow-sm",
                                        ctaColor(ctaStyle)
                                    )}
                                >
                                    <Link href="https://order.spoton.com/so-buddas-bakery-and-breakfast-23084/pleasant-grove-ut/67dda33e1b8098dc7af11099" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>Order Now</Link>
                                </Button>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
