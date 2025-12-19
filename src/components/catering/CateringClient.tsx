"use client";

import {
    Sparkles,
    CalendarPlus,
    Download,
    Briefcase,
    Heart,
    PartyPopper,
    ArrowRight,
    Users,
    DollarSign,
    CheckCircle,
    ClipboardList,
    Calendar,
    ChefHat,
    Package,
    Quote,
    PlusCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface CateringClientProps {
    data: any;
}

export function CateringClient({ data }: CateringClientProps) {
    const {
        heroTitle,
        heroSubtitle,
        heroImage,
        heroCtaLabel,
        heroCtaLink,
        testimonial,
        serviceTypes,
        menuHighlights,
        howItWorks,
        trustedBy,
        faq
    } = data;

    // Use default image if none provided
    const heroImageUrl = heroImage?.asset ? urlFor(heroImage).width(2000).url() : 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop';
    const quoteBgUrl = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop';

    return (
        <div className="bg-buddas-cream min-h-screen font-sans text-buddas-brown">
            {/* Parallax Hero */}
            <header className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-buddas-brown">
                {/* Background Image with Parallax Effect */}
                <div className="absolute inset-0 z-0 opacity-40 select-none">
                    <Image
                        src={heroImageUrl}
                        alt="Catering Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <AnimatedSection className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8 mt-10">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-buddas-teal/10 border border-buddas-teal/20 text-buddas-teal-dark text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Catering & Events</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-semibold text-buddas-cream tracking-[-0.02em] leading-[1.1] font-poppins drop-shadow-md">
                        {heroTitle || "Feed the Whole Crew. Bring Aloha to the Table."}
                    </h1>

                    <p className="text-xl text-buddas-cream/80 max-w-2xl mx-auto leading-relaxed font-dm-sans">
                        {heroSubtitle || "Office lunches, private parties, or the big day—we bring the island to you."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href={heroCtaLink || "/contact"} className="w-full sm:w-auto">
                            <button className="w-full flex items-center justify-center gap-2 bg-buddas-teal text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wide transition-all shadow-[0_4px_0_0_#1C5F56,0_8px_20px_-4px_rgba(28,95,86,0.4)] hover:translate-y-[-2px] hover:shadow-[0_6px_0_0_#1C5F56,0_12px_24px_-4px_rgba(28,95,86,0.5)] active:translate-y-1 active:shadow-[0_0_0_0_#1C5F56,inset_0_2px_4px_rgba(0,0,0,0.2)] ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                                <CalendarPlus className="w-5 h-5" />
                                {heroCtaLabel || "Book an Event"}
                            </button>
                        </Link>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-buddas-teal text-buddas-teal px-8 py-3.5 rounded-lg font-bold uppercase tracking-wide transition-all hover:bg-buddas-teal/10 hover:scale-105 active:scale-95 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                            <Download className="w-5 h-5" />
                            Download Menu
                        </button>
                    </div>
                </AnimatedSection>
            </header>

            <AnimatedSection delay={100}>
                {/* Catering Trusted By Section */}
                {trustedBy?.partners && trustedBy.partners.length > 0 && (
                    <section className="py-12 bg-white border-b border-buddas-brown/10">
                        <div className="max-w-7xl mx-auto px-6">
                            <p className="text-center text-sm font-medium text-buddas-brown/60 mb-8 uppercase tracking-wider font-poppins">
                                {trustedBy.title || "Trusted by Leading Companies"}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                                {trustedBy.partners.map((partner: any, idx: number) => (
                                    <a
                                        key={partner._key || idx}
                                        href={partner.url || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="opacity-60 hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                                        aria-label={partner.name}
                                    >
                                        {partner.logo?.asset ? (
                                            <Image
                                                src={urlFor(partner.logo).width(240).url()}
                                                alt={partner.name}
                                                width={120}
                                                height={40}
                                                className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                            />
                                        ) : (
                                            <span className="text-buddas-brown/70 font-semibold font-poppins text-lg">
                                                {partner.name}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}


                {/* Services Grid */}
                <section className="py-24 relative z-10 bg-buddas-cream">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-semibold text-buddas-brown mb-4 tracking-[-0.01em] font-poppins drop-shadow-sm">
                                Catering for Every Occasion
                            </h2>
                            <p className="text-buddas-brown/80 text-lg font-dm-sans max-w-2xl mx-auto">
                                We provide tailored culinary experiences for events of all sizes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {serviceTypes?.map((service: any, idx: number) => {
                                const icons = [Briefcase, Heart, PartyPopper];
                                const Icon = icons[idx % icons.length];

                                return (
                                    <div key={service._key || idx} className="bg-white p-8 rounded-xl border border-buddas-brown/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group flex flex-col items-start">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-buddas-teal/10 text-buddas-teal-dark">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-buddas-brown mb-3 font-poppins leading-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-buddas-brown/70 leading-relaxed mb-6 font-dm-sans min-h-[4.5rem]">
                                            {service.description}
                                        </p>
                                        <Link href={service.ctaLink || "/contact"} className="mt-auto inline-flex items-center text-sm font-medium text-buddas-teal hover:text-buddas-teal-dark transition-colors group/link uppercase tracking-wider">
                                            View Packages <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Parallax Break Section */}
            <AnimatedSection delay={200}>
                <section className="py-20 relative flex items-center justify-center overflow-hidden bg-buddas-brown">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image
                            src={testimonial?.backgroundImage?.asset ? urlFor(testimonial.backgroundImage).width(2000).url() : quoteBgUrl}
                            alt="Background"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-buddas-brown/60 backdrop-blur-[2px]"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-buddas-cream">
                        <Quote className="w-10 h-10 text-buddas-gold mb-4 opacity-80 mx-auto fill-buddas-gold/20" />
                        <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-6 font-poppins drop-shadow-sm px-4">
                            "{testimonial?.quote || "The food was absolutely spectacular. Buddas turned our corporate retreat into a culinary adventure we will never forget."}"
                        </h3>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-buddas-cream/10 backdrop-blur overflow-hidden relative shadow-lg ring-2 ring-buddas-gold/20">
                                {testimonial?.authorImage?.asset ? (
                                    <Image
                                        src={urlFor(testimonial.authorImage).width(100).url()}
                                        alt={testimonial?.authorName || "Author"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-buddas-cream">
                                        {(testimonial?.authorName || "DM").split(' ').map((n: any) => n[0]).join('')}
                                    </div>
                                )}
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-buddas-cream font-poppins text-sm leading-tight">{testimonial?.authorName || "David Miller"}</p>
                                <p className="text-xs text-buddas-cream/70 font-dm-sans">{testimonial?.authorTitle || "CEO, TechStart Inc."}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Popular Packages (Menu Highlights) */}
            <AnimatedSection delay={200}>
                <section className="py-24 relative z-10 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <span className="text-buddas-gold font-bold tracking-widest uppercase text-xs mb-2 block font-poppins">Our Menus</span>
                                <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown tracking-tight font-poppins drop-shadow-sm">Popular Catering Packages</h2>
                            </div>
                            <button className="flex items-center gap-2 text-buddas-brown/60 hover:text-buddas-teal transition-colors font-medium group font-dm-sans">
                                View All Menus <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {menuHighlights?.map((item: any, idx: number) => {
                                const bgImage = item.image?.asset ? urlFor(item.image).width(800).url() : `https://images.unsplash.com/photo-1555244162-803834f70033?idx=${idx}`;

                                return (
                                    <div key={item._key || idx} className="bg-white rounded-xl overflow-hidden shadow-md border border-buddas-brown/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group flex flex-col h-full">
                                        <div className="h-64 relative overflow-hidden shrink-0">
                                            <Image
                                                src={bgImage}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-buddas-brown/80 to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 text-white right-6">
                                                {idx === 0 && <span className="bg-buddas-gold text-buddas-brown text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-sm">Bestseller</span>}
                                                <h3 className="text-2xl font-semibold leading-tight font-poppins drop-shadow-md">{item.name}</h3>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-4 mb-6 text-sm text-buddas-brown/60 font-medium font-dm-sans">
                                                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-buddas-teal" /> {item.guestCount || "10-20 ppl"}</span>
                                                <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-buddas-teal" /> {item.price || 'Contact for Pricing'}</span>
                                            </div>
                                            <div className="mb-8 flex-1">
                                                <p className="text-buddas-brown/80 text-sm leading-relaxed mb-4 font-dm-sans">{item.description}</p>
                                                {item.features && item.features.length > 0 && (
                                                    <ul className="space-y-3">
                                                        {item.features.map((feature: string, fIdx: number) => (
                                                            <li key={fIdx} className="flex items-start gap-3 text-buddas-brown/70 text-sm font-dm-sans">
                                                                <CheckCircle className="w-5 h-5 text-buddas-teal shrink-0" />
                                                                <span>{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <button className="w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 mt-auto bg-white border-2 border-buddas-brown/10 text-buddas-brown hover:border-buddas-teal hover:text-buddas-teal hover:bg-buddas-teal/5 active:scale-95 ease-[cubic-bezier(0.25,0.1,0.25,1)] uppercase tracking-wider text-xs">
                                                Select Package
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* How It Works */}
            <AnimatedSection delay={300}>
                <section className="py-24 bg-white relative z-10 border-t border-buddas-brown/10">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <span className="text-buddas-gold font-bold tracking-widest uppercase text-xs mb-2 block font-poppins">Process</span>
                            <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown font-poppins drop-shadow-sm">How It Works</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-buddas-brown/10 -z-10 bg-gradient-to-r from-transparent via-buddas-brown/20 to-transparent"></div>

                            {howItWorks?.map((step: any, idx: number) => {
                                const icons = [ClipboardList, Calendar, ChefHat, Package];
                                const Icon = icons[idx % icons.length];

                                return (
                                    <div key={step._key || idx} className="text-center md:bg-transparent pt-4 relative group">
                                        <div className="w-20 h-20 mx-auto bg-white border border-buddas-brown/10 rounded-full flex items-center justify-center text-buddas-teal shadow-lg shadow-buddas-brown/5 mb-8 relative z-10 group-hover:scale-110 group-hover:border-buddas-teal/30 group-hover:shadow-buddas-teal/10 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                                            <Icon className="w-9 h-9" />
                                        </div>
                                        <h3 className="font-semibold text-xl mb-3 text-buddas-brown font-poppins">{step.title}</h3>
                                        <p className="text-sm text-buddas-brown/70 leading-relaxed px-4 font-dm-sans">{step.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* FAQ Section */}
            {faq && faq.length > 0 && (
                <AnimatedSection delay={200}>
                    <section className="py-24 bg-buddas-cream relative z-10 border-t border-buddas-brown/10">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="text-center mb-16">
                                <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Common Questions</span>
                                <h2 className="text-3xl md:text-5xl font-bold text-buddas-brown tracking-tight font-poppins">Frequently Asked Questions</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                {faq.map((item: any, idx: number) => (
                                    <div key={item._key || idx} className="group bg-white rounded-xl border border-buddas-brown/10 p-6 hover:shadow-lg hover:border-buddas-teal/30 transition-all cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-buddas-brown">{item.question}</h3>
                                            <PlusCircle className="text-buddas-brown/40 w-6 h-6 group-hover:text-buddas-teal group-hover:rotate-45 transition-all" />
                                        </div>
                                        <p className="text-buddas-brown/70 text-sm mt-3 leading-relaxed hidden group-hover:block animate-in fade-in duration-300">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            )}
        </div>
    );
}
