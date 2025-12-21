"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Home, Utensils, ShoppingBag, MapPin } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NewNavbarProps {
    logoUrl?: string;
    orderUrl?: string;
    ctaStyle?: string;
    navigation?: any[];
}

// Remove MotionLink creation as we use standard components or motion.div
const MotionLink = motion.create(Link);

export function NewNavbar({ logoUrl, orderUrl, ctaStyle, navigation }: NewNavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const pathname = usePathname();
    const defaultOrderUrl = "https://order.toasttab.com/online/buddas-hawaiian-bbq-pleasant-grove-pg-123-state-st";

    const alohaEase = [0.25, 0.1, 0.25, 1] as any;

    const navLinks = navigation?.map(link => ({
        href: link.url,
        label: link.label
    })) || [];

    const isActive = (path: string) => pathname === path;

    const getHeaderCtaClasses = (style?: string) => {
        switch (style) {
            case "dark-teal":
                return "bg-buddas-teal-dark text-white hover:bg-buddas-teal hover:shadow-teal-500/20";
            case "gold":
                return "bg-buddas-gold text-buddas-brown hover:bg-buddas-gold-dark hover:text-white hover:shadow-gold-500/20";
            case "cream":
                return "bg-buddas-cream text-buddas-brown hover:bg-stone-200 hover:shadow-stone-500/10";
            case "brown":
                return "bg-buddas-brown text-white hover:bg-buddas-brown-dark hover:shadow-stone-900/20";
            case "orange":
                return "bg-buddas-orange text-white hover:bg-orange-700 hover:shadow-orange-500/20";
            case "teal":
            default:
                return "bg-buddas-teal text-white hover:bg-buddas-teal-dark hover:shadow-teal-500/20";
        }
    };

    const ctaClasses = getHeaderCtaClasses(ctaStyle);

    // Mobile Menu Variants
    const menuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 }
    };

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    return (
        <div className="sticky top-0 z-50 w-full bg-buddas-cream dark:bg-zinc-900 border-b-0 shadow-sm transition-all duration-300">
            <div className="w-full px-6 lg:px-12 xl:px-16">
                <header className="flex items-center justify-between py-4">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 text-black dark:text-white">
                        <Link href="/" className="flex items-center gap-2 group relative">
                            {/* Subtle logo lift on hover */}
                            <motion.div
                                whileHover={{ y: -1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {logoUrl && (
                                    <motion.img
                                        src={logoUrl}
                                        alt="Buddas Hawaiian"
                                        className="h-10 lg:h-12 w-auto object-contain drop-shadow-sm"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                            ease: alohaEase as any
                                        }}
                                    />
                                )}
                            </motion.div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-end items-center gap-6">
                        <AnimatePresence>
                            <nav aria-label="Main navigation" className="flex items-center gap-2 p-1 bg-white rounded-2xl shadow-md border border-buddas-brown/10">
                                {navigation?.map((item: any) => {
                                    const active = isActive(item.url);
                                    return (
                                        <Link
                                            key={item.url}
                                            href={item.url}
                                            className={`relative px-5 py-2.5 rounded-lg text-sm font-dm-sans font-medium tracking-wide transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2
                                            ${active
                                                    ? "text-buddas-teal-dark bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,1)] ring-1 ring-black/5"
                                                    : "text-buddas-brown hover:text-buddas-teal-dark hover:bg-white/60 hover:shadow-sm"
                                                }
                                        `}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {item.label}
                                                {active && (
                                                    <motion.div
                                                        layoutId="active-dot"
                                                        className="w-1.5 h-1.5 rounded-full bg-buddas-teal"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 500,
                                                            damping: 30,
                                                            ease: alohaEase as any
                                                        }}
                                                    />
                                                )}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </AnimatePresence>
                        <div className="hidden md:block h-8 w-px bg-stone-300 dark:bg-stone-700 mx-2" />

                        <Button
                            asChild
                            variant="default"
                            className={`hidden md:inline-flex h-12 px-8 rounded-lg text-sm font-bold uppercase tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2 ${ctaClasses}`}
                        >
                            <Link href={orderUrl || defaultOrderUrl} target="_blank">
                                Order Online
                            </Link>
                        </Button>
                    </div>

                    {/* Top Mobile Menu Button - HIDDEN in favor of Bottom Nav */}
                    {/* <motion.button ... /> */}
                </header>
            </div>

            {/* Mobile Menu Dropdown / Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                            id="mobile-menu"
                            className="md:hidden fixed inset-x-0 top-[88px] bottom-[80px] bg-buddas-cream dark:bg-zinc-900 border-t border-white/50 dark:border-white/10 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-y-auto z-40 flex flex-col"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={prefersReducedMotion ? {} : menuVariants}
                        >
                            <nav className="flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <MotionLink
                                        key={link.href}
                                        href={link.href}
                                        className={`text-lg font-dm-sans font-medium tracking-wide transition-all py-4 px-6 rounded-xl block border flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-buddas-teal
                                            ${isActive(link.href)
                                                ? "bg-white border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-buddas-teal-dark font-bold"
                                                : "border-transparent bg-white/40 text-buddas-brown hover:bg-white/80 hover:shadow-sm hover:translate-x-1 font-medium"}
                                        `}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        variants={prefersReducedMotion ? {} : itemVariants}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {link.label}
                                        {isActive(link.href) && (
                                            <div className="w-2 h-2 rounded-full bg-buddas-teal-dark" />
                                        )}
                                    </MotionLink>
                                ))}
                                <motion.div className="pt-6 pb-4" variants={prefersReducedMotion ? {} : itemVariants}>
                                    <Button
                                        asChild
                                        variant="default"
                                        className={`h-14 w-full rounded-2xl text-lg font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all duration-300 ${ctaClasses}`}
                                    >
                                        <Link href={orderUrl || defaultOrderUrl} target="_blank" onClick={() => setIsMobileMenuOpen(false)}>
                                            Order Online
                                        </Link>
                                    </Button>
                                </motion.div>

                                {/* Quick Contact Info */}
                                <motion.div variants={prefersReducedMotion ? {} : itemVariants} className="mt-auto pt-6 border-t border-buddas-brown/10">
                                    <a href="tel:801-555-1234" className="flex items-center justify-center gap-3 text-buddas-brown/70 hover:text-buddas-teal transition-colors py-2">
                                        <Phone className="w-5 h-5" />
                                        <span className="font-medium">Call Us</span>
                                    </a>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Sticky Mobile Bottom Navigation (Option A) */}
            <div className="md:hidden fixed bottom-0 inset-x-0 h-[80px] bg-white border-t border-stone-200 z-50 pb-safe grid grid-cols-5 items-center px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                {/* Home */}
                <Link href="/" className={`flex flex-col items-center justify-center gap-1 h-full w-full ${pathname === "/" ? "text-buddas-teal" : "text-buddas-brown/60 hover:text-buddas-brown"}`}>
                    <Home className="w-6 h-6" strokeWidth={pathname === "/" ? 2.5 : 2} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">Home</span>
                </Link>

                {/* Menu */}
                <Link href="/menu" className={`flex flex-col items-center justify-center gap-1 h-full w-full ${pathname === "/menu" ? "text-buddas-teal" : "text-buddas-brown/60 hover:text-buddas-brown"}`}>
                    <Utensils className="w-6 h-6" strokeWidth={pathname === "/menu" ? 2.5 : 2} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">Menu</span>
                </Link>

                {/* ORDER (Highlighted) */}
                <div className="relative -top-6">
                    <Link
                        href={orderUrl || defaultOrderUrl}
                        target="_blank"
                        className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-buddas-teal text-white shadow-lg shadow-buddas-teal/30 transform transition-transform active:scale-95 border-4 border-buddas-cream"
                    >
                        <ShoppingBag className="w-6 h-6 fill-white" />
                        <span className="text-[10px] font-bold uppercase mt-0.5">Order</span>
                    </Link>
                </div>

                {/* Locations */}
                <Link href="/#locations" className={`flex flex-col items-center justify-center gap-1 h-full w-full ${pathname === "/#locations" ? "text-buddas-teal" : "text-buddas-brown/60 hover:text-buddas-brown"}`}>
                    <MapPin className="w-6 h-6" strokeWidth={2} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">Find Us</span>
                </Link>

                {/* More / Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`flex flex-col items-center justify-center gap-1 h-full w-full outline-none ${isMobileMenuOpen ? "text-buddas-teal" : "text-buddas-brown/60 hover:text-buddas-brown"}`}
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" strokeWidth={2.5} />
                    ) : (
                        <Menu className="w-6 h-6" strokeWidth={2} />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-tight">More</span>
                </button>
            </div>
        </div>
    );
}

