"use client";

import { ArrowRight, CalendarDays, Utensils, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface CateringData {
    // Homepage Teaser Fields (from cateringPage schema)
    teaserBadge?: string;  // Catering badge
    eventsBadge?: string;
    communityBadge?: string;

    cateringTitle?: string;
    cateringDescription?: string;
    cateringImage?: string;
    cateringCtaLabel?: string;
    cateringCtaLink?: string;

    eventsTitle?: string;
    eventsDescription?: string;
    eventsImage?: string;
    eventsCtaLabel?: string;
    eventsCtaLink?: string;

    communityTitle?: string;
    communityDescription?: string;
    communityImage?: string;
    communityCtaLabel?: string;
    communityCtaLink?: string;
}

interface NewCateringSectionProps {
    cateringData?: CateringData;
}

export function NewCateringSection({ cateringData }: NewCateringSectionProps) {
    const scrollContainerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: scrollContainerRef });
    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const cards = [
        {
            key: 'catering',
            title: cateringData?.cateringTitle || "Feed the Whole Crew",
            desc: cateringData?.cateringDescription || "From office lunches to wedding receptions, bring the aloha spirit to your next gathering.",
            cta: cateringData?.cateringCtaLabel || "View Catering",
            link: cateringData?.cateringCtaLink || "/catering",
            badge: cateringData?.teaserBadge || "The Office Hero",
            image: cateringData?.cateringImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDQYJaoiTwhP4q_kxm7Du0BZuLRFyXPm8njF-PV_45BPyM1b2fMYTKjGLNXNwQkARvnpfxi3rE4ptNL1mTbZOJkootLsYKEH_yPTWB-FLiWPeZXA53mkJzc5affMKozg3CMXQhxUnVnnx12Em8HjqIz6flXwKoiYbEBw-JGIBgP7mHq0rjCZ4ZCSiF8pJJIqbWSO9JQa14hzj1K53XxTxh4_pcw8_XoQmgXFiVWoBo9AsrMqVcl7_mEMdsuB2xG--fM7uRPJUwT7nxs",
            theme: {
                bg: "bg-buddas-teal-dark",
                badge: "bg-buddas-teal/90 text-white border-buddas-teal-light/20",
                button: "bg-buddas-teal text-white hover:bg-white hover:text-buddas-teal",
                icon: Utensils
            }
        },
        {
            key: 'events',
            title: cateringData?.eventsTitle || "Celebrate with Us",
            desc: cateringData?.eventsDescription || "Reserve our dining area or outdoor patio for your special occasion.",
            cta: cateringData?.eventsCtaLabel || "Book an Event",
            link: cateringData?.eventsCtaLink || "/catering#events",
            badge: cateringData?.eventsBadge || "Private Parties",
            image: cateringData?.eventsImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuB-LhJKdKh1D38aStliQxZJylPplCRlVEScIIGYJD6yTH0xGNWDphmFcV9Vrj58n_vbjBLxtCG2b2C6iEMV80Sxg4Et4HPH-fVFRehpNB-udxFBtFCQfFTweRjYxnxWEXDd7-EcboKxTLUZJGr2W8DafFGBkMjkuP9RWc6q0o3Zn6a4Lla8HdsRV3B4GtbpeHshUjrAyp22xjiehOXhRVpR8CMx_UEBsswTelaCFcMGz9QzWEpOSXh6yhX7j5rcBXokOE-fF2ds3lXG",
            theme: {
                bg: "bg-buddas-gold",
                badge: "bg-white/90 text-buddas-brown border-white/20",
                button: "bg-buddas-brown text-white hover:bg-white hover:text-buddas-brown",
                icon: CalendarDays
            }
        },
        {
            key: 'community',
            title: cateringData?.communityTitle || "Fundraising & Community",
            desc: cateringData?.communityDescription || "Partner with us for benefit nights, school fundraisers, and community events.",
            cta: cateringData?.communityCtaLabel || "Learn More",
            link: cateringData?.communityCtaLink || "/benefit-nights",
            badge: cateringData?.communityBadge || "Benefit Nights",
            image: cateringData?.communityImage || "https://cdn.sanity.io/images/07198816/production/4b5b7b9f5b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b-1200x800.jpg",
            theme: {
                bg: "bg-buddas-brown",
                badge: "bg-buddas-cream/90 text-buddas-brown border-buddas-cream/20",
                button: "bg-buddas-gold text-buddas-brown hover:bg-white hover:text-buddas-brown",
                icon: HeartHandshake
            }
        }
    ];

    return (
        <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-16 2xl:py-24" id="catering-events">

            {/* Section Header */}
            <div className="flex items-center justify-between mb-8 md:mb-12 px-2 md:px-0">
                <div>
                    <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-buddas-brown tracking-tight">
                        Beyond the Menu
                    </h2>
                    <p className="text-buddas-brown/60 font-dm-sans mt-1">
                        Catering, events, and community partnerships.
                    </p>
                </div>


            </div>

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 lg:grid lg:grid-cols-3 lg:gap-6 2xl:gap-8 lg:pb-0 lg:mx-0 lg:px-0 no-scrollbar relative"
            >
                {cards.map((card) => (
                    <div key={card.key} className={`flex-shrink-0 w-[80vw] lg:w-auto snap-center group relative overflow-hidden rounded-3xl min-h-[420px] flex items-end p-8 shadow-sm hover:shadow-xl transition-all duration-300 active:scale-[0.98] hover:-translate-y-1 ${card.theme.bg}`}>

                        {/* Background Image with Gradient Overlay */}
                        <div className="absolute inset-0 z-0">
                            {card.image && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-overlay"
                                    style={{ backgroundImage: `url("${card.image}")` }}
                                ></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 w-full text-white pointer-events-none">
                            {/* Badge */}
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-bold mb-4 shadow-sm uppercase tracking-wider transform transition-transform duration-300 group-hover:scale-105 origin-left ${card.theme.badge}`}>
                                <card.theme.icon className="w-3.5 h-3.5" />
                                {card.badge}
                            </div>

                            <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-white font-[family-name:var(--font-poppins)] tracking-tight leading-tight">
                                {card.title}
                            </h3>

                            <p className="text-white/90 mb-8 w-full text-sm leading-relaxed font-[family-name:var(--font-dm-sans)] line-clamp-3">
                                {card.desc}
                            </p>

                            <Link
                                href={card.link}
                                className={`w-full h-12 px-6 rounded-lg font-bold transition-all shadow-sm hover:shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wide pointer-events-auto active:scale-95 ${card.theme.button}`}
                            >
                                {card.cta}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Live Progress Bar */}
            <div className="lg:hidden h-1 w-full bg-buddas-brown/5 rounded-full -mt-2 mb-4 overflow-hidden max-w-[200px] mx-auto">
                <motion.div
                    className="h-full bg-buddas-brown/40"
                    style={{ scaleX, transformOrigin: 'left' }}
                />
            </div>
        </section>
    );
}
