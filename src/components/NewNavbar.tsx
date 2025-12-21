"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

    return (
        <div className="relative w-full bg-buddas-cream dark:bg-zinc-900 border-b-0 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.8)] transition-all duration-300">
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
                                        className="h-16 w-auto object-contain drop-shadow-sm"
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

                    {/* Desktop Nav */}
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-end items-center gap-6">
                        <AnimatePresence>
                            <nav className="flex items-center gap-2 p-1 bg-white rounded-2xl shadow-md border border-buddas-brown/10">
                                {navigation?.map((item: any) => {
                                    const active = isActive(item.url);
                                    return (
                                        <Link
                                            key={item.url}
                                            href={item.url}
                                            className={`relative px-5 py-2.5 rounded-xl text-base font-poppins font-semibold tracking-wide uppercase transition-all duration-200 group
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
                        <div className="h-8 w-px bg-stone-300 dark:bg-stone-700 mx-2" />

                        <Button
                            asChild
                            variant="default"
                            className={`h-12 px-8 rounded-xl text-sm font-bold uppercase tracking-wide shadow-lg active:scale-95 transition-all duration-300 ${ctaClasses}`}
                        >
                            <Link href={orderUrl || defaultOrderUrl} target="_blank">
                                Order Online
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 text-buddas-brown dark:text-white hover:bg-buddas-cream rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </header>
            </div >

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden fixed inset-x-0 top-[88px] bg-buddas-cream dark:bg-zinc-900 border-t border-white/50 dark:border-white/10 p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <MotionLink
                                    key={link.href}
                                    href={link.href}
                                    className={`text-lg font-poppins tracking-wide uppercase transition-all py-4 px-6 rounded-2xl block border flex items-center justify-between group
                                        ${isActive(link.href)
                                            ? "bg-white border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] text-buddas-teal-dark font-bold"
                                            : "border-transparent bg-white/40 text-buddas-brown hover:bg-white/80 hover:shadow-sm hover:translate-x-1 font-medium"}
                                    `}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variants={itemVariants}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {link.label}
                                    {isActive(link.href) && (
                                        <div className="w-2 h-2 rounded-full bg-buddas-teal-dark" />
                                    )}
                                </MotionLink>
                            ))}
                            <motion.div className="pt-6 pb-4" variants={itemVariants}>
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
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

