"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NewAboutSectionProps {
    aboutData?: {
        teaserTitle?: string;
        teaserSnippet?: string;
        teaserBackgroundImage?: string;
        stats?: { value: string; label: string }[];
        storyTitle?: string;
        storyContent?: any[];
    };
}

export function NewAboutSection({ aboutData }: NewAboutSectionProps) {
    // Fallback content if Sanity data is missing
    const title = aboutData?.teaserTitle || "Where Aloha Meets the Mountains";
    const snippet = aboutData?.teaserSnippet || "Founded in 2024, Buddas brought the authentic plate lunch culture of the North Shore to the valleys of Utah. We believe in big portions, fresh ingredients, and the kind of hospitality that makes you feel like family.";
    const stats = aboutData?.stats || [];

    // We can use a static fallback if no image is provided from Sanity
    const bgImage = aboutData?.teaserBackgroundImage;

    // Animation state
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section
            id="about"
            className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-cover bg-center overflow-hidden"
            style={{
                // Dark Cocoa Brown gradient overlay for text readability
                backgroundImage: `linear-gradient(rgba(90,58,31,0.65), rgba(90,58,31,0.75)), url(${bgImage})`,
                backgroundColor: '#5A3A1F' // Fallback color (brand brown)
            }}
        >
            <div className={`max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-8 xl:px-12 2xl:px-16 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }} // Aloha Motion
            >

                {/* Heading - Poppins SemiBold, White, Text Shadow */}
                <h2
                    className="text-4xl md:text-5xl font-poppins font-semibold text-white mb-6 tracking-tight drop-shadow-md"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)', letterSpacing: '-0.01em' }}
                >
                    {title}
                </h2>

                {/* Body Text - DM Sans, Buddas Cream for warmth */}
                <p className="text-lg md:text-xl text-buddas-cream leading-relaxed mb-8 font-dm-sans max-w-xl lg:max-w-3xl mx-auto drop-shadow-sm">
                    {snippet}
                </p>

                {/* Stats Bar - Premium Inline Design */}
                {stats.length > 0 && (
                    <div className="inline-flex items-center justify-center gap-0 mb-10 bg-buddas-brown/90 border border-buddas-gold/30 rounded-full px-2 py-2 shadow-lg">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex items-center">
                                {/* Stat Item */}
                                <div className="flex flex-col items-center px-5 py-1">
                                    <span className="text-2xl md:text-3xl font-poppins font-semibold text-buddas-gold leading-none tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-buddas-cream/80 font-dm-sans font-medium mt-1">
                                        {stat.label}
                                    </span>
                                </div>
                                {/* Gold Divider (except after last item) */}
                                {idx < stats.length - 1 && (
                                    <div className="h-8 w-px bg-buddas-gold/40" aria-hidden="true" />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA Button - Material Design Elevation with Aloha Motion */}
                <Link
                    href="/about"
                    className="group inline-flex items-center gap-3 bg-buddas-teal text-white px-8 py-4 rounded-lg font-dm-sans font-medium text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-buddas-teal/50 active:scale-95 active:shadow-md"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }} // Aloha Motion
                >
                    Read Our Story
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

            </div>

            {/* Decorative bottom fade to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </section>
    );
}
