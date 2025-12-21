"use client";

import { Flame, Soup, Clock, Heart } from "lucide-react";

export function ValuePropositionSection() {
    const pillars = [
        {
            icon: Flame,
            title: "Fresh Daily",
            description: "Made from scratch every morning in our kitchen."
        },
        {
            icon: Soup, // Using Soup as proxy for authentic food/bowl
            title: "Authentic Hawaiian",
            description: "Traditional family recipes passed down for generations."
        },
        {
            icon: Clock,
            title: "Order Ahead",
            description: "Skip the line and pick up your meal in minutes."
        },
        {
            icon: Heart,
            title: "Real Value",
            description: "Generous portions that leave you full and happy."
        }
    ];

    return (
        <section className="bg-buddas-cream py-12 md:py-24 border-b border-buddas-brown/5">
            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
                {/* Section Header */}
                <div className="mb-8 text-center">
                    <span className="text-xs uppercase text-buddas-teal font-bold tracking-widest block mb-2">The Buddas Difference</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-semibold text-buddas-brown">Why Choose Us</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10 xl:gap-12 text-center bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-buddas-brown/5">
                    {pillars.map((pillar, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-buddas-teal/10 flex items-center justify-center mb-4 sm:mb-6 text-buddas-teal group-hover:scale-110 group-hover:bg-buddas-teal group-hover:text-white transition-all duration-300">
                                <pillar.icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-poppins font-semibold text-buddas-brown mb-2 sm:mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-sm sm:text-base text-buddas-brown/80 font-dm-sans leading-relaxed max-w-[200px] line-clamp-2 sm:line-clamp-none">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
