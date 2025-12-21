"use client";

import { urlFor } from "@/sanity/lib/image";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MICROCOPY } from "@/lib/microcopy";

interface NewArrivalsSlideshowProps {
    items: any[];
}

export function NewArrivalsSlideshow({ items }: NewArrivalsSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Limit to 3 items
    const slides = items.slice(0, 3);

    // Auto-advance
    useEffect(() => {
        if (isPaused || slides.length <= 1) return;
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

    return (
        <section
            className="relative w-full min-h-[700px] md:h-[800px] bg-buddas-teal-dark overflow-hidden text-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Elements (Subtle Pattern) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-10 mix-blend-overlay"></div>

            <AnimatePresence mode="wait">
                <div key={currentIndex} className="w-full h-full flex flex-col md:flex-row relative z-0">

                    {/* LEFT: IMAGE SECTION (50%) */}
                    <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden">
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

                    {/* RIGHT: CONTENT SECTION (50%) */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-20 lg:px-24 py-12 bg-buddas-teal-dark relative">

                        {/* Floating Nav Arrows (Desktop) */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-8 hidden 2xl:flex flex-col gap-4 z-30">
                            <button onClick={handlePrev} className="p-4 rounded-full border border-white/10 text-white/50 hover:bg-white hover:text-buddas-teal-dark transition-all hover:scale-110 active:scale-95">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={handleNext} className="p-4 rounded-full border border-white/10 text-white/50 hover:bg-white hover:text-buddas-teal-dark transition-all hover:scale-110 active:scale-95">
                                <ChevronRight className="w-6 h-6" />
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
                            <motion.div variants={textItemVariants} className="mb-8">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-buddas-gold/10 text-buddas-gold border border-buddas-gold/20 text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(233,197,89,0.15)]">
                                    <Sparkles className="w-3 h-3" />
                                    {MICROCOPY.newArrival}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h2 variants={textItemVariants} className="text-4xl md:text-6xl lg:text-7xl font-semibold font-poppins leading-[1.1] mb-6 text-white tracking-tight">
                                {currentSlide.name}
                            </motion.h2>

                            {/* Description */}
                            <motion.p variants={textItemVariants} className="text-lg md:text-xl text-buddas-cream/80 leading-relaxed mb-12 max-w-lg font-dm-sans">
                                {currentSlide.description || "Experience the bold flavors of Hawaii with our newest kitchen creation. Fresh, fiery, and full of aloha."}
                            </motion.p>

                            {/* Price & CTA Block */}
                            <motion.div variants={textItemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                                <div className="flex flex-col">
                                    <span className="text-xs text-buddas-cream/60 font-bold uppercase tracking-widest mb-2">Price</span>
                                    <span className="text-5xl font-medium text-buddas-gold font-poppins tracking-tight">
                                        {formatPrice(currentSlide.price)}
                                    </span>
                                </div>
                                <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
                                <button className="group relative px-10 py-5 bg-buddas-gold text-buddas-brown rounded-lg font-bold text-sm uppercase tracking-widest overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-300 shadow-sm hover:shadow-md">
                                    <span className="relative z-10 flex items-center gap-3">
                                        {MICROCOPY.tasteItFirst} <ArrowRight className="w-4 h-4" />
                                    </span>
                                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
                                </button>
                            </motion.div>

                        </motion.div>

                        {/* Mobile Navigation Dots */}
                        <div className="flex 2xl:hidden gap-3 mt-16">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-buddas-gold' : 'w-2 bg-zinc-800'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                ></button>
                            ))}
                        </div>

                    </div>
                </div>
            </AnimatePresence>
        </section>
    );
}
