"use client";

import {
    Sparkles,
    CalendarPlus,
    PlusCircle,
    CheckCircle,
    Heart,
    Briefcase,
    GlassWater,
    ChefHat,
    HandPlatter,
    Armchair,
    Wine,
    Leaf,
    MapPin,
    Phone,
    Mail
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

interface EventsClientProps {
    data: any;
}

export function EventsClient({ data }: EventsClientProps) {
    const {
        heroTitle,
        heroSubtitle,
        heroImage,
        heroBadge,
        heroCtaLabel,
        heroCtaLink,
        trustedBy,
        benefits,
        benefitsSectionTitle,
        benefitsSectionSubtitle,
        howItWorks,
        howItWorksSectionTitle,
        howItWorksSectionSubtitle,
        faq,
        statsSection
    } = data;

    // Use Sanity image if available, else fallback to the design's specific Unsplash image
    const heroImageUrl = heroImage?.asset ? urlFor(heroImage).width(2000).url() : 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop';

    // Parallax background for immersive break
    const breakBgUrl = statsSection?.image?.asset
        ? urlFor(statsSection.image).width(2000).url()
        : 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop';

    return (
        <div className="bg-buddas-cream min-h-screen font-sans text-buddas-brown-dark">
            {/* Parallax Hero Section */}
            <header className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-buddas-brown">
                {/* Parallax Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImageUrl}
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-buddas-brown/40 backdrop-blur-[1px]"></div>
                </div>

                <AnimatedSection className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-8 mt-10">
                    <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        <span>{heroBadge || "Full Service Event Planning"}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] font-poppins drop-shadow-lg">
                        {heroTitle || <>Events That <br /><span className="text-buddas-gold pr-2 drop-shadow-md">Taste</span> Extraordinary</>}
                    </h1>

                    <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        {heroSubtitle || "Whether it's an intimate gathering or a gala for thousands, we craft immersive culinary experiences tailored to your vision."}
                    </p>

                    <div className="pt-8">
                        <Link href={heroCtaLink || "/contact"}>
                            <button className="bg-buddas-teal text-white px-10 py-4 rounded-lg font-bold uppercase tracking-wide transition-all shadow-[0_4px_0_0_#1C5F56,0_8px_20px_-4px_rgba(84,191,165,0.4)] hover:translate-y-[-2px] hover:shadow-[0_6px_0_0_#1C5F56,0_12px_24px_-4px_rgba(84,191,165,0.5)] active:translate-y-1 active:shadow-[0_0_0_0_#1C5F56,inset_0_2px_4px_rgba(0,0,0,0.2)] flex items-center gap-2 mx-auto">
                                <CalendarPlus className="w-5 h-5" />
                                {heroCtaLabel || "Start Planning"}
                            </button>
                        </Link>
                    </div>
                </AnimatedSection>

            </header>

            {trustedBy?.partners?.length > 0 && (
                <AnimatedSection delay={100}>
                    <section className="border-b border-zinc-200/60 bg-white relative z-10">
                        <div className="max-w-7xl mx-auto px-6 py-12">
                            <p className="text-center text-xs font-bold text-buddas-brown/60 uppercase tracking-widest mb-10">
                                {trustedBy.title || "Event Partners & Corporate Clients"}
                            </p>
                            <div className="flex flex-wrap justify-center gap-16 md:gap-24 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {trustedBy.partners.map((partner: any, index: number) => (
                                    <div key={index} className="relative h-12 w-32 md:w-40">
                                        {partner.logo ? (
                                            <Image
                                                src={urlFor(partner.logo).url()}
                                                alt={partner.name || "Partner Logo"}
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <span className="text-2xl font-black text-buddas-brown-dark">{partner.name}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            )}

            <AnimatedSection delay={200}>
                <section className="py-24 relative z-10 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-20 text-center max-w-3xl mx-auto">
                            <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Our Expertise</span>
                            <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown-dark tracking-tight mb-6 font-poppins">
                                {benefitsSectionTitle || "Designed for Every Occasion"}
                            </h2>
                            <p className="text-buddas-brown/80 text-lg">
                                {benefitsSectionSubtitle || "We don't just provide food; we provide an atmosphere. Choose the category that best fits your upcoming event."}
                            </p>
                        </div>

                        {/* Dynamic CMS Content if available, else fallback to hardcoded */}
                        {/* Dynamic CMS Content */}
                        {benefits?.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {benefits.map((benefit: any, index: number) => (
                                    <div key={index} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-buddas-teal shadow-md">
                                            {benefit.icon ? (
                                                <Image src={urlFor(benefit.icon).url()} alt="" width={24} height={24} />
                                            ) : (
                                                <CheckCircle className="w-6 h-6" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-buddas-brown-dark mb-2 font-poppins">{benefit.title}</h3>
                                            <p className="text-buddas-brown/70 leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection delay={200}>
                <section className="py-40 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={breakBgUrl}
                            alt="Immersive Break"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-buddas-brown-dark/60 backdrop-blur-[2px]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="col-span-1 md:col-span-2 text-white">
                            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 font-poppins">
                                {statsSection?.title || "Experience the Art of Food"}
                            </h2>
                            <p className="text-white/80 text-xl leading-relaxed max-w-xl">
                                {statsSection?.description || "Our team of world-class chefs uses only the freshest, locally sourced ingredients to create masterpieces on every plate."}
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-6">
                            <div className="flex items-baseline text-white">
                                <span className="text-6xl font-bold text-buddas-gold">
                                    {statsSection?.stat1Value || "500+"}
                                </span>
                                <span className="text-white/70 uppercase tracking-widest text-sm font-semibold ml-2">
                                    {statsSection?.stat1Label || "Events Annually"}
                                </span>
                            </div>

                            <div className="w-full h-px bg-white/20 my-2"></div>

                            <div className="flex items-baseline text-white">
                                <span className="text-6xl font-bold text-buddas-gold">
                                    {statsSection?.stat2Value || "4.9"}
                                </span>
                                <span className="text-white/70 uppercase tracking-widest text-sm font-semibold ml-2">
                                    {statsSection?.stat2Label || "/ 5 Client Satisfaction"}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection delay={300}>
                <section className="py-24 bg-buddas-cream relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown-dark mb-4 tracking-tight font-poppins">
                                {howItWorksSectionTitle || "Everything You Need"}
                            </h2>
                            <p className="text-buddas-brown/70">
                                {howItWorksSectionSubtitle || "Comprehensive event services so you can enjoy the moment."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Service Items */}
                            {/* Service Items */}
                            {howItWorks?.length > 0 && (
                                howItWorks.map((step: any, index: number) => (
                                    <div key={index} className="bg-white p-8 rounded-xl border border-buddas-brown/10 shadow-[0_4px_6px_-1px_rgba(90,58,31,0.05)] hover:shadow-[0_20px_25px_-5px_rgba(90,58,31,0.15)] hover:-translate-y-2 transition-all duration-300">
                                        <div className="w-12 h-12 bg-buddas-cream rounded-xl flex items-center justify-center text-buddas-teal mb-6 shadow-sm">
                                            {step.icon ? (
                                                <Image src={urlFor(step.icon).url()} alt="" width={24} height={24} />
                                            ) : (
                                                <div className="font-bold text-xl">{index + 1}</div>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-buddas-brown-dark mb-2">{step.title}</h3>
                                        <p className="text-buddas-brown/70 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection delay={400}>
                <section className="py-24 relative overflow-hidden z-10 bg-buddas-brown">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                    {/* Animated Background Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-buddas-orange/20 rounded-full blur-[100px] animate-pulse"></div>

                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight font-poppins">Ready to Create a Memorable Event?</h2>
                        <p className="text-buddas-cream/80 text-lg mb-10 max-w-2xl mx-auto">
                            Contact our event specialists today to discuss your vision and receive a complimentary tasting consultation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <button className="w-full bg-buddas-teal text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wide transition-all shadow-lg hover:translate-y-[-2px] hover:shadow-xl active:translate-y-1 flex items-center justify-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    Schedule Call
                                </button>
                            </Link>
                            <button className="w-full sm:w-auto bg-transparent border-2 border-buddas-teal text-buddas-teal bg-white/5 px-8 py-4 rounded-lg font-bold uppercase tracking-wide hover:bg-buddas-teal/10 transition-colors flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-lg active:translate-y-0">
                                <Mail className="w-5 h-5" />
                                Request Quote
                            </button>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* FAQ Section */}
            {faq?.length > 0 && (
                <AnimatedSection delay={500}>
                    <section className="py-24 bg-buddas-cream relative z-10">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown-dark mb-4 tracking-tight font-poppins">Frequently Asked Questions</h2>
                                <p className="text-buddas-brown/70">Common questions about planning your event with us.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                {faq.map((item: any, index: number) => (
                                    <div key={index} className="group bg-white rounded-xl border border-buddas-brown/10 p-6 hover:shadow-lg hover:border-buddas-teal/30 transition-all cursor-pointer">
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
