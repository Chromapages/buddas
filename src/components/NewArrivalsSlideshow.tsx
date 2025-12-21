"use client";

import { urlFor } from "@/sanity/lib/image";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, PanInfo } from "framer-motion";
import { MICROCOPY } from "@/lib/microcopy";

interface NewArrivalsSlideshowProps {
    items: any[];
}

export function NewArrivalsSlideshow({ items }: NewArrivalsSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Limit to 3 items
    const slides = items.slice(0, 3);

    // Auto-advance (Desktop Only)
    useEffect(() => {
        // Check if window exists (client-side) and is desktop width (> 768px)
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

    // Elastic Drag Logic
    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            handleNext();
        } else if (info.offset.x > threshold) {
            handlePrev();
        }
    };

    if (!slides.length) return null;
    const currentSlide = slides[currentIndex];

    // High-res image for full split
    const imageUrl = currentSlide.image
        ? urlFor(currentSlide.image).width(1600).height(1600).fit("crop").url()
        : null;

    // --- Animation Variants ---

    // Staggers the text elements
    const contentContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    // "Fade in, slide in, blur in" effect
    const textItemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1] // Aloha Motion Ease
            }
        }
    };

    const imageVariants: Variants = {
        initial: { scale: 1.1, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: "easeOut" }
        },
        exit: { opacity: 0 }
    };

    // Container variants for the slide entry/exit
    const slideVariants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section
            role="region"
            aria-roledescription="carousel"
            aria-label="New menu arrivals"
            className="relative w-full h-[85svh] md:h-[800px] bg-buddas-teal-dark overflow-hidden text-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Elements (Subtle Pattern) */}
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

                    {/* LEFT: IMAGE SECTION (40% Mobile / 50% Desktop) */}
                    <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden pointer-events-none select-none">
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={imageVariants}
                        />
                        {/* Gradient Overlays for Seamless Blending */}
                        {/* Desktop: Fade to Black on Right edge */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-zinc-950 hidden md:block"></div>
                        {/* Mobile: Fade to Black on Bottom edge */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden"></div>
                    </div>

                    {/* RIGHT: CONTENT SECTION (60% Mobile / 50% Desktop) */}
                    <div className="w-full md:w-1/2 h-[60%] md:h-full flex flex-col justify-center px-6 md:px-20 lg:px-24 py-8 md:py-12 bg-buddas-teal-dark relative pointer-events-none select-none">

                        {/* Floating Nav Arrows (Desktop - Enable Pointer Events) */}
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

                        {/* Staggered Content */}
                        <motion.div
                            variants={contentContainerVariants}
                            initial="hidden"
                            whileInView="visible" // Triggers animation when section enters viewport
                            viewport={{ once: true }}
                            animate="visible" // Ensures it runs on slide change too (due to key change)
                            exit="exit"
                            className="max-w-xl"
                        >
                            {/* Kicker Badge */}
                            <motion.div variants={textItemVariants} className="mb-4 md:mb-8">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-buddas-gold/10 text-buddas-gold border border-buddas-gold/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(233,197,89,0.15)]">
                                    <Sparkles className="w-3 h-3" />
                                    {MICROCOPY.newArrival}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h2 variants={textItemVariants} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold font-poppins leading-[1.1] mb-4 md:mb-6 text-white tracking-tight">
                                {currentSlide.name}
                            </motion.h2>

                            {/* Description */}
                            <motion.p variants={textItemVariants} className="text-base md:text-lg lg:text-xl text-buddas-cream/80 leading-relaxed mb-8 md:mb-12 max-w-lg font-dm-sans line-clamp-3 md:line-clamp-none">
                                {currentSlide.description || "Experience the bold flavors of Hawaii with our newest kitchen creation. Fresh, fiery, and full of aloha."}
                            </motion.p>

                            {/* Price & CTA Block (Enable Pointer Events for Button) */}
                            <motion.div variants={textItemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pointer-events-auto">
                                <div className="flex flex-col">
                                    <span className="text-xs text-buddas-cream/60 font-bold uppercase tracking-widest mb-2">Price</span>
                                    <span className="text-4xl md:text-5xl font-medium text-buddas-gold font-poppins tracking-tight">
                                        {formatPrice(currentSlide.price)}
                                    </span>
                                </div>
                                <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
                                <button className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-buddas-gold text-buddas-brown rounded-lg font-bold text-xs md:text-sm uppercase tracking-widest overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-buddas-gold focus:ring-offset-2 focus:ring-offset-buddas-teal-dark">
                                    <span className="relative z-10 flex items-center gap-3">
                                        {MICROCOPY.tasteItFirst} <ArrowRight className="w-4 h-4" />
                                    </span>
                                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
                                </button>
                            </motion.div>

                        </motion.div>

                        {/* Mobile Editorial Pagination (Pointer Events Auto to allow clicks if really needed, but mostly visual) */}
                        <div className="flex 2xl:hidden items-end gap-4 mt-auto md:mt-16 pb-6 md:pb-0 justify-between md:justify-start w-full pointer-events-auto">
                            {/* Custom Number Pagination */}
                            <div className="flex items-baseline gap-2 font-poppins font-medium text-buddas-gold/80">
                                <span className="text-2xl">0{currentIndex + 1}</span>
                                <span className="text-sm opacity-40">/</span>
                                <span className="text-sm opacity-40">0{slides.length}</span>
                            </div>

                            {/* Progress Line */}
                            <div className="h-[2px] w-24 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-buddas-gold"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 6, ease: "linear" }} // Sync with auto-play if desktop, or just visual filler
                                    key={currentIndex}
                                />
                            </div>
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

