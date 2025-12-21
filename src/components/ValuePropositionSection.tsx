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
        <section className="bg-buddas-cream py-16 md:py-20 border-b border-buddas-brown/5">
            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12 text-center bg-white rounded-3xl p-8 shadow-sm border border-buddas-brown/5">
                    {pillars.map((pillar, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                            <div className="w-16 h-16 rounded-full bg-buddas-teal/10 flex items-center justify-center mb-6 text-buddas-teal group-hover:scale-110 group-hover:bg-buddas-teal group-hover:text-white transition-all duration-300">
                                <pillar.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-poppins font-semibold text-buddas-brown mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-buddas-brown/80 font-dm-sans leading-relaxed max-w-[200px]">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
