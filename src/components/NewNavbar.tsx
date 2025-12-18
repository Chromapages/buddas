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
                    <div className="hidden md:flex flex-1 justify-end items-center gap-6">
                        <nav className="flex items-center gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-white/5 shadow-inner">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-5 py-2.5 rounded-xl text-base font-poppins font-semibold tracking-wide uppercase transition-all duration-200 group
                                            ${active
                                                ? "text-buddas-teal-dark bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,1)] ring-1 ring-black/5"
                                                : "text-buddas-brown hover:text-buddas-teal-dark hover:bg-white/60 hover:shadow-sm"
                                            }
                                        `}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {link.label}
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

                        <div className="h-8 w-px bg-stone-300 dark:bg-stone-700 mx-2" />

                        <Button
                            asChild
                            variant="default"
                            className="h-12 px-8 rounded-xl text-sm font-bold uppercase tracking-wide shadow-lg hover:bg-buddas-teal-dark hover:shadow-teal-500/20 active:scale-95 transition-all duration-300"
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
                                    className="h-14 w-full rounded-2xl text-lg font-bold uppercase tracking-wider shadow-lg hover:bg-buddas-teal-dark hover:shadow-teal-500/20"
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

