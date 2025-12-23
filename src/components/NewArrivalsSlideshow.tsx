"use client";

import { urlFor } from "@/sanity/lib/image";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, PanInfo } from "framer-motion";
import { MICROCOPY } from "@/lib/microcopy";

interface NewArrivalsSlideshowProps {
    items: any[];
    isLoading?: boolean;
}

function NewArrivalsSlideshowSkeleton() {
    return (
        <section className="relative w-full h-[55svh] md:h-[800px] bg-buddas-teal-dark overflow-hidden text-white motion-safe:animate-pulse">
            <div className="w-full h-full flex flex-col md:flex-row">
                {/* Left Image Section Skeleton */}
                <div className="w-full md:w-1/2 h-[45%] md:h-full relative bg-buddas-teal-dark/80">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-zinc-950 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden" />
                </div>

                {/* Right Content Section Skeleton */}
                <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col justify-start pt-6 px-5 md:justify-center md:pt-12 md:px-20 lg:px-24 bg-buddas-teal-dark">
                    <div className="max-w-xl w-full">
                        {/* Badge Skeleton */}
                        <div className="w-24 h-6 mb-3 md:mb-8 bg-buddas-gold/10 rounded-full" />

                        {/* Title Skeleton */}
                        <div className="space-y-2 mb-2 md:mb-6">
                            <div className="w-3/4 h-8 md:h-16 bg-white/10 rounded-lg" />
                            <div className="w-1/2 h-8 md:h-16 bg-white/10 rounded-lg" />
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-2 mb-4 md:mb-12">
                            <div className="w-full h-4 md:h-5 bg-white/5 rounded" />
                            <div className="w-2/3 h-4 md:h-5 bg-white/5 rounded" />
                        </div>

                        {/* Price Skeleton (Mobile Stacked) */}
                        <div className="mb-4 md:hidden">
                            <div className="w-20 h-8 bg-buddas-gold/20 rounded" />
                        </div>

                        {/* Price & CTA Skeleton (Desktop: Row / Mobile: Stacked) */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                            {/* Desktop Price */}
                            <div className="hidden md:block space-y-2">
                                <div className="w-12 h-3 bg-buddas-cream/20 rounded" />
                                <div className="w-24 h-12 bg-buddas-gold/20 rounded" />
                            </div>
                            <div className="h-12 w-px bg-white/10 hidden md:block" />
                            {/* CTA Button Skeleton */}
                            <div className="w-full md:w-40 h-12 md:h-14 bg-buddas-gold/20 rounded-lg" />
                        </div>
                    </div>

                    {/* Pagination Skeleton (Dots) */}
                    <div className="flex justify-center items-center gap-1 mt-4 md:hidden">
                        <div className="w-2 h-2 rounded-full p-2 box-content bg-transparent">
                            <div className="w-full h-full bg-buddas-gold/50 rounded-full" />
                        </div>
                        <div className="w-2 h-2 rounded-full p-2 box-content bg-transparent">
                            <div className="w-full h-full bg-white/10 rounded-full" />
                        </div>
                        <div className="w-2 h-2 rounded-full p-2 box-content bg-transparent">
                            <div className="w-full h-full bg-white/10 rounded-full" />
                        </div>
                    </div>

                    {/* Desktop Pagination Skeleton */}
                    <div className="hidden md:flex items-end gap-4 mt-auto md:mt-16 pb-6 md:pb-0 justify-between md:justify-start w-full">
                        <div className="flex items-baseline gap-2">
                            <div className="w-8 h-8 bg-buddas-gold/20 rounded" />
                            <div className="w-12 h-4 bg-white/10 rounded" />
                        </div>
                        <div className="h-[2px] w-24 bg-white/10 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export function NewArrivalsSlideshow({ items, isLoading }: NewArrivalsSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Limit to 3 items
    const slides = items?.slice(0, 3) || [];

    // Auto-advance (Desktop Only)
    useEffect(() => {
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
        if (isPaused || slides.length <= 1 || !isDesktop) return;

        const interval = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(interval);
    }, [currentIndex, isPaused, slides.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            handleNext();
        } else if (info.offset.x > threshold) {
            handlePrev();
        }
    };

    if (isLoading || !hasMounted) {
        return <NewArrivalsSlideshowSkeleton />;
    }

    if (!slides.length) return null;
    const currentSlide = slides[currentIndex];

    // High-res image
    const imageUrl = currentSlide.image
        ? urlFor(currentSlide.image).width(1600).height(1600).fit("crop").url()
        : null;

    // Animation Variants
    const contentContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.15 }
        }
    };

    const textItemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    const imageVariants: Variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: { opacity: 0 }
    };

    return (
        <section
            role="region"
            aria-roledescription="carousel"
            aria-label="New menu arrivals"
            className="relative w-full h-[55svh] md:h-[800px] bg-buddas-teal-dark overflow-hidden text-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-10 mix-blend-overlay"></div>

            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentIndex}
                    className="w-full h-full flex flex-col md:flex-row relative z-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={onDragEnd}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {/* LEFT: IMAGE SECTION */}
                    <div className="w-full md:w-1/2 h-[45%] md:h-full relative overflow-hidden pointer-events-none select-none">
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={imageVariants}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-zinc-950 hidden md:block"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:hidden"></div>
                    </div>

                    {/* RIGHT: CONTENT SECTION */}
                    <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col justify-start pt-6 px-5 md:justify-center md:pt-12 md:px-20 lg:px-24 bg-buddas-teal-dark relative pointer-events-none select-none">

                        {/* Desktop Nav */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-8 hidden 2xl:flex flex-col gap-4 z-30 pointer-events-auto">
                            <button onClick={handlePrev} aria-label="Previous slide" className="p-4 rounded-full border border-white/10 text-white/50 hover:bg-white hover:text-buddas-teal-dark transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={handleNext} aria-label="Next slide" className="p-4 rounded-full border border-white/10 text-white/50 hover:bg-white hover:text-buddas-teal-dark transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                                className="p-3 rounded-full border border-white/20 text-white/60 hover:bg-white hover:text-buddas-teal-dark transition-all focus:outline-none focus:ring-2 focus:ring-white/50 mt-2"
                            >
                                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                            </button>
                        </div>

                        <motion.div
                            variants={contentContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            animate="visible"
                            exit="exit"
                            className="max-w-xl flex flex-col h-full md:block justify-start md:justify-center"
                        >
                            {/* Kicker Badge */}
                            <motion.div variants={textItemVariants} className="mb-3 md:mb-8">
                                <span className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-buddas-gold/10 text-buddas-gold border border-buddas-gold/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(233,197,89,0.15)]">
                                    <Sparkles className="w-3 h-3" />
                                    {MICROCOPY.newArrival}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h2 variants={textItemVariants} className="text-xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold font-poppins leading-tight md:leading-[1.1] mb-1 md:mb-6 text-white tracking-tight line-clamp-2 md:line-clamp-none">
                                {currentSlide.name}
                            </motion.h2>

                            {/* Description */}
                            <motion.p variants={textItemVariants} className="text-sm md:text-lg lg:text-xl text-buddas-cream/80 leading-relaxed mb-3 md:mb-12 max-w-lg font-dm-sans line-clamp-2 md:line-clamp-none">
                                {currentSlide.description || "Experience the bold flavors of Hawaii with our newest kitchen creation. Fresh, fiery, and full of aloha."}
                            </motion.p>

                            {/* Price & CTA Block */}
                            <motion.div variants={textItemVariants} className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pointer-events-auto">
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-xs text-buddas-cream/60 font-bold uppercase tracking-widest mb-1 md:mb-2 hidden md:block">Price</span>
                                    <span className="text-3xl md:text-5xl font-medium text-buddas-gold font-poppins tracking-tight">
                                        {formatPrice(currentSlide.price)}
                                    </span>
                                </div>
                                <div className="h-8 md:h-12 w-px bg-white/10 hidden md:block"></div>
                                <button className="group relative w-full md:w-auto px-6 py-4 md:px-10 md:py-5 bg-buddas-gold text-buddas-brown rounded-lg font-bold text-xs md:text-sm uppercase tracking-widest overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-buddas-gold focus:ring-offset-2 focus:ring-offset-buddas-teal-dark flex justify-center items-center">
                                    <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                                        {MICROCOPY.tasteItFirst} <ArrowRight className="w-4 h-4" />
                                    </span>
                                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Mobile Pagination (44px target) */}
                        <div className="flex xl:hidden justify-center items-center gap-1 mt-4 pointer-events-auto">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className="p-2 box-content rounded-full group focus:outline-none"
                                    aria-label={`Go to slide ${idx + 1}`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-6 bg-buddas-gold" : "bg-white/20 group-hover:bg-white/40"}`} />
                                </button>
                            ))}
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

