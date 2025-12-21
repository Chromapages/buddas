"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AboutData {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: any;
    values?: { title: string; description: string }[];
    stats?: { value: string; label: string }[];
}

interface NewAboutSectionProps {
    aboutData?: AboutData;
}

function Counter({ value, label }: { value: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    // Parse number from string (e.g. "15+" -> 15)
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, ''); // Extract "+", "k", etc.

    // For demo simplicity, just animating opacity/y for now. 
    // Full number count-up would require a custom hook or library like countup.js

    return (
        <div ref={ref} className="text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-buddas-teal font-poppins mb-1"
            >
                {value}
            </motion.div>
            <div className="text-xs text-buddas-brown/60 font-dm-sans uppercase tracking-wide">
                {label}
            </div>
        </div>
    );
}

export function NewAboutSection({ aboutData }: NewAboutSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    if (!aboutData) return null;

    const imageUrl = aboutData.image
        ? urlFor(aboutData.image).width(800).height(600).url()
        : null;

    // Fallback stats if none provided
    const stats = aboutData.stats || [
        { value: "15+", label: "Years Serving" },
        { value: "50k+", label: "Happy Regulars" },
        { value: "4.8", label: "Avg Rating" },
        { value: "100%", label: "Aloha Spirit" }
    ];

    // Fallback values if none provided
    const values = aboutData.values || [
        { title: "Freshness", description: "Every ingredient hand-picked and prepared daily." },
        { title: "Ohana", description: "We treat every customer like they're family." },
        { title: "Consistency", description: "The same great taste you remember, every time." },
        { title: "Community", description: "Proudly supporting local schools and events since day one." }
    ];

    return (
        <section ref={containerRef} className="py-16 md:py-24 bg-buddas-cream overflow-hidden relative">
            {/* Subtle Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 2xl:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Image Column with Parallax */}
                    <div className="lg:sticky lg:top-32 lg:pb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {imageUrl ? (
                                <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                                    <Image
                                        src={imageUrl}
                                        alt={aboutData.title || "About Buddas Hawaiian"}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            ) : (
                                <div className="w-full h-full bg-buddas-teal/10 flex items-center justify-center">
                                    <Sparkles className="w-16 h-16 text-buddas-teal/30" />
                                </div>
                            )}

                            {/* Floating Stats Card (Desktop Only) */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="hidden lg:flex absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 gap-6"
                            >
                                {stats.map((stat, i) => (
                                    <Counter key={i} value={stat.value} label={stat.label} />
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <span className="text-sm font-dm-sans font-medium text-buddas-brown/60 uppercase tracking-wide">
                                Our Story
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold text-buddas-brown tracking-tight leading-tight"
                        >
                            {aboutData.title || "Bringing Aloha to the Table"}
                        </motion.h2>

                        {/* Description with Expandable "Read More" */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="relative"
                        >
                            <div className={`text-buddas-brown/70 font-dm-sans leading-relaxed text-lg transition-all duration-500 overflow-hidden ${!isExpanded ? 'max-h-[150px] md:max-h-none' : 'max-h-[1000px]'}`}>
                                {aboutData.description ||
                                    "We exist to share the specific warmth of island-inspired comfort food—fast, consistent, and family-friendly. Convenience shouldn't feel cold, and speed shouldn't cost you your wallet."}

                                {!isExpanded && (
                                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-buddas-cream to-transparent md:hidden" />
                                )}
                            </div>

                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-2 text-buddas-teal font-bold text-sm uppercase tracking-wider flex items-center gap-1 md:hidden"
                            >
                                {isExpanded ? 'Show Less' : 'Read Full Story'}
                            </button>
                        </motion.div>

                        {/* Mobile Stats Grid - Only show first 3 */}
                        <div className="lg:hidden py-6 my-2">
                            <div className="grid grid-cols-3 gap-4 bg-white/60 p-4 rounded-2xl border border-buddas-brown/5 backdrop-blur-sm shadow-sm">
                                {stats.slice(0, 3).map((stat, i) => (
                                    <Counter key={i} value={stat.value} label={stat.label} />
                                ))}
                            </div>
                        </div>

                        {/* Values Section: Horizontal Scroll on Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="space-y-6 pt-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-poppins font-semibold text-buddas-brown">Our Values</h3>
                                {/* Mobile Swipe Hint */}
                                <div className="flex md:hidden items-center gap-2 text-xs font-bold text-buddas-brown/40 uppercase tracking-widest animate-pulse">
                                    <span>Swipe</span>
                                    <div className="flex gap-0.5">
                                        <div className="w-1 h-1 rounded-full bg-buddas-brown/40" />
                                        <div className="w-1 h-1 rounded-full bg-buddas-brown/20" />
                                        <div className="w-1 h-1 rounded-full bg-buddas-brown/10" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 no-scrollbar md:grid md:grid-cols-2 lg:gap-6 md:pb-0 md:mx-0 md:px-0">
                                {values.map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex-shrink-0 w-[240px] md:w-auto snap-center p-6 rounded-2xl bg-white border border-buddas-brown/5 shadow-md hover:shadow-lg transition-all active:scale-[0.98] transform"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-buddas-teal/10 flex items-center justify-center text-buddas-teal mb-4">
                                            <span className="font-bold text-lg">{i + 1}</span>
                                        </div>
                                        <h4 className="font-poppins font-bold text-buddas-brown mb-2">{val.title}</h4>
                                        <p className="text-sm text-buddas-brown/60 leading-relaxed font-dm-sans">{val.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="pt-6"
                        >
                            <Link href="/about" className="block w-full sm:w-auto">
                                <Button className="w-full sm:w-fit gap-2 h-14 text-base font-bold shadow-lg shadow-buddas-teal/20 hover:shadow-xl hover:translate-y-[-2px] transition-all bg-buddas-teal text-white">
                                    Visit Our Full About Page
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
