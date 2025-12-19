"use client";

import {
    Leaf,
    Star,
    Users,
    Quote,
    ChefHat,
    ArrowRight,
    Instagram,
    Twitter,
    Linkedin
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

interface AboutClientProps {
    data: any;
}

export function AboutClient({ data }: AboutClientProps) {
    const {
        heroTitle,
        heroSubtitle,
        heroImage,
        storyTitle,
        storyContent,
        storyImage,
        values,
        team
    } = data;

    // Use default image if none provided
    const heroImageUrl = heroImage?.asset ? urlFor(heroImage).width(2400).url() : 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2400&auto=format&fit=crop';
    const kitchenBgUrl = 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2000&auto=format&fit=crop';
    const testimonialBgUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop';

    // Helper for team images
    const getTeamImageUrl = (member: any, idx: number) => {
        if (member.image?.asset) return urlFor(member.image).width(800).url();
        // Placeholders based on position in array to vary them
        const placeholders = [
            'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?q=80&w=800&auto=format&fit=crop'
        ];
        return placeholders[idx % placeholders.length];
    };

    return (
        <div className="bg-white min-h-screen font-sans text-buddas-brown">
            {/* Parallax Hero */}
            <header className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-buddas-brown">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImageUrl}
                        alt="About Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-buddas-brown/40"></div>
                </div>

                <AnimatedSection className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 mt-16">
                    <span className="text-buddas-orange font-semibold tracking-widest uppercase text-sm bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 shadow-sm">Since 2010</span>
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] font-poppins drop-shadow-lg">
                        {heroTitle || <>Crafting Culinary <br /><span className="text-buddas-orange font-serif italic drop-shadow-md">Legacies</span></>}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
                        {heroSubtitle || "We believe that food is more than just sustenance—it's a language of connection, culture, and care."}
                    </p>
                </AnimatedSection>
            </header>

            <AnimatedSection delay={100}>
                <section className="py-24 relative z-10 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown tracking-tight font-poppins">{storyTitle || "From a Small Kitchen to a Global Table"}</h2>
                                <div className="space-y-6 text-lg text-zinc-500 leading-relaxed font-light">
                                    {storyContent ? (
                                        <PortableText value={storyContent} />
                                    ) : (
                                        <>
                                            <p>
                                                What started as a humble catering experiment in a small downtown apartment has grown into a movement. Our founder, Chef Elena, believed that high-quality, sustainable ingredients shouldn't be a luxury reserved for the few.
                                            </p>
                                            <p>
                                                Over the last decade, we've partnered with over 50 local farms, ensuring that every plate we serve supports our community and respects our environment.
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <div className="border-l-2 border-buddas-orange pl-6">
                                        <span className="block text-4xl font-semibold text-buddas-brown mb-1 font-poppins">15k+</span>
                                        <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">Events Served</span>
                                    </div>
                                    <div className="border-l-2 border-buddas-orange pl-6">
                                        <span className="block text-4xl font-semibold text-buddas-brown mb-1 font-poppins">100%</span>
                                        <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">Organic Sourcing</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl shadow-buddas-brown/10">
                                    {storyImage?.asset ? (
                                        <Image
                                            src={urlFor(storyImage).width(1200).url()}
                                            alt="Our Story"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop"
                                            alt="Our Story Placeholder"
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border border-zinc-100">
                                    <p className="font-serif italic text-xl text-buddas-brown">"Food is the ingredient that binds us together."</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden relative">
                                            <Image src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=200&auto=format&fit=crop" alt="Founder" fill className="object-cover" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-semibold text-buddas-brown">Elena Rossi</span>
                                            <span className="block text-xs text-zinc-500">Founder & Exec Chef</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection delay={200}>
                <section className="py-40 relative flex items-center justify-center mt-20 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={kitchenBgUrl}
                            alt="The Kitchen"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-buddas-brown/60 backdrop-blur-[1px]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
                        <ChefHat className="text-white/80 w-16 h-16 mb-6 mx-auto" />
                        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-8 font-poppins">Where Magic Happens</h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Our open-concept kitchens are designed to foster creativity and transparency. Every dish is prepared with passion and precision.
                        </p>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection delay={200}>
                <section className="py-24 bg-white relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Our Philosophy</span>
                            <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown tracking-tight font-poppins">Guided by Taste & Integrity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {values?.length > 0 ? (
                                values.map((value: any, idx: number) => {
                                    // Simple icon rotation logic
                                    const icons = [Leaf, Star, Users];
                                    const Icon = icons[idx % icons.length];

                                    return (
                                        <div key={idx} className="group p-8 rounded-xl bg-[#FFFBF2] hover:bg-orange-50 transition-all border border-zinc-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-2">
                                            <div className="w-14 h-14 bg-orange-100 text-buddas-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins">{value.title}</h3>
                                            <p className="text-zinc-500 leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    )
                                })
                            ) : (
                                // Default Fallbacks from design
                                <>
                                    <div className="group p-8 rounded-xl bg-[#FFFBF2] hover:bg-orange-50 transition-all border border-zinc-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-2">
                                        <div className="w-14 h-14 bg-orange-100 text-buddas-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                                            <Leaf className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins">Sustainability First</h3>
                                        <p className="text-zinc-500 leading-relaxed">
                                            We prioritize zero-waste cooking methods and biodegradable packaging. Our planet feeds us, so we must protect it.
                                        </p>
                                    </div>
                                    <div className="group p-8 rounded-xl bg-[#FFFBF2] hover:bg-orange-50 transition-all border border-zinc-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-2">
                                        <div className="w-14 h-14 bg-orange-100 text-buddas-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                                            <Star className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins">Uncompromised Quality</h3>
                                        <p className="text-zinc-500 leading-relaxed">
                                            We don't cut corners. From the olive oil to the salt, every ingredient is selected for its flavor profile and origin.
                                        </p>
                                    </div>
                                    <div className="group p-8 rounded-xl bg-[#FFFBF2] hover:bg-orange-50 transition-all border border-zinc-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-2">
                                        <div className="w-14 h-14 bg-orange-100 text-buddas-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                                            <Users className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins">Community Focused</h3>
                                        <p className="text-zinc-500 leading-relaxed">
                                            We donate 5% of our monthly proceeds to local food banks and host cooking classes for underprivileged youth.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection delay={300}>
                <section className="py-24 relative z-10 bg-[#FFFBF2]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown tracking-tight mb-4 font-poppins">Meet the Artisans</h2>
                                <p className="text-zinc-500 max-w-md">The talented individuals behind your favorite dishes.</p>
                            </div>
                            <Button variant="link" className="text-buddas-orange font-semibold flex items-center gap-2 hover:gap-3 transition-all p-0 h-auto">
                                Join our team <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team?.map((member: any, idx: number) => (
                                <div key={member._key || idx} className="group">
                                    <div className="relative overflow-hidden rounded-xl mb-6 aspect-[3/4]">
                                        <Image
                                            src={getTeamImageUrl(member, idx)}
                                            alt={member.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                            <div className="flex gap-4 text-white">
                                                <Instagram className="w-5 h-5 hover:text-buddas-orange cursor-pointer transition-colors" />
                                                {idx % 2 === 0 ? <Twitter className="w-5 h-5 hover:text-buddas-orange cursor-pointer transition-colors" /> : <Linkedin className="w-5 h-5 hover:text-buddas-orange cursor-pointer transition-colors" />}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-buddas-brown font-poppins">{member.name}</h3>
                                    <p className="text-sm text-zinc-500 font-medium">{member.role}</p>
                                </div>
                            ))}

                            {/* Fallback placeholders if no team data */}
                            {(!team || team.length === 0) && [
                                { name: 'Elena Rossi', role: 'Executive Chef & Founder' },
                                { name: 'Marcus Chen', role: 'Head of Pastry' },
                                { name: 'Sarah Johnson', role: 'Event Director' },
                                { name: 'David Miller', role: 'Sous Chef' }
                            ].map((member, idx) => (
                                <div key={idx} className="group">
                                    <div className="relative overflow-hidden rounded-xl mb-6 aspect-[3/4]">
                                        <Image
                                            src={[
                                                'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=800&auto=format&fit=crop',
                                                'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=800&auto=format&fit=crop',
                                                'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=800&auto=format&fit=crop',
                                                'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?q=80&w=800&auto=format&fit=crop'
                                            ][idx]}
                                            alt={member.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                            <div className="flex gap-4 text-white">
                                                <Instagram className="w-5 h-5 hover:text-buddas-orange cursor-pointer transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-buddas-brown font-poppins">{member.name}</h3>
                                    <p className="text-sm text-zinc-500 font-medium">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection delay={400}>
                <section className="py-32 relative flex items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={testimonialBgUrl}
                            alt="Testimonial Background"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-buddas-brown/80 backdrop-blur-[2px]"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                        <Quote className="text-white/30 w-16 h-16 mb-8 mx-auto" />
                        <h2 className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed mb-8">
                            "I have never seen a team so dedicated to the craft. Buddas didn't just cater our charity gala; they created an atmosphere of warmth that our guests are still talking about."
                        </h2>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-white font-bold tracking-wide uppercase font-poppins">Jonathan Doe</span>
                            <span className="text-white/60 text-sm">Director, Global Arts Foundation</span>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

        </div>
    );
}
