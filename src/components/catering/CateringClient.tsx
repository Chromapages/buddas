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
    PlusCircle,
    Leaf,
    Utensils,
    Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CateringQuoteForm } from "./CateringQuoteForm";

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
        faq,
        closingCta,
        menuPdfUrl,
        gallery,
        pricingSection,
        valueProposition,
        testimonials
    } = data;

    // Use default image if none provided
    const heroImageUrl = heroImage?.asset ? urlFor(heroImage).width(2000).url() : 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop';
    const quoteBgUrl = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop';

    // Phase 2: Unify Testimonials (Use array 0 or singular)
    const activeTestimonial = testimonials && testimonials.length > 0 ? testimonials[0] : testimonial;

    // Helper for Icon Mapping
    const getIcon = (iconName: string, fallback: any) => {
        const map: any = {
            briefcase: Briefcase,
            heart: Heart,
            party: PartyPopper,
            chef: ChefHat,
            clipboard: ClipboardList,
            calendar: Calendar,
            package: Package
        };
        return map[iconName] || fallback;
    };



    return (
        <div className="bg-buddas-cream min-h-screen font-sans text-buddas-brown">
            {/* Parallax Hero */}
            <header className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-buddas-brown">
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

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8 mt-10">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-buddas-gold text-buddas-brown text-xs font-bold uppercase tracking-wider shadow-sm">
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
                        <Link href={heroCtaLink || "#quote-form"} onClick={(e) => {
                            if (!heroCtaLink) {
                                e.preventDefault();
                                document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }} className="w-full sm:w-auto">
                            <button className="w-full flex items-center justify-center gap-2 bg-buddas-teal text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wide transition-all shadow-[0_4px_0_0_#1C5F56,0_8px_20px_-4px_rgba(28,95,86,0.4)] hover:translate-y-[-2px] hover:shadow-[0_6px_0_0_#1C5F56,0_12px_24px_-4px_rgba(28,95,86,0.5)] active:translate-y-1 active:shadow-[0_0_0_0_#1C5F56,inset_0_2px_4px_rgba(0,0,0,0.2)] ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                                <CalendarPlus className="w-5 h-5" />
                                {heroCtaLabel || "Book an Event"}
                            </button>
                        </Link>
                        <a
                            href={menuPdfUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                            onClick={(e) => !menuPdfUrl && e.preventDefault()}
                        >
                            <button className={`w-full flex items-center justify-center gap-2 bg-transparent border-2 border-buddas-teal text-buddas-teal px-8 py-3.5 rounded-lg font-bold uppercase tracking-wide transition-all hover:bg-buddas-teal/10 hover:scale-105 active:scale-95 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${!menuPdfUrl ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <Download className="w-5 h-5" />
                                Download Menu
                            </button>
                        </a>
                    </div>

                    <p className="text-buddas-cream/80 text-sm mt-6 font-dm-sans">
                        Or call for immediate assistance: <a href="tel:8017855555" className="font-bold underline hover:text-white transition-colors decoration-buddas-gold/50 hover:decoration-white">(801) 785-5555</a>
                    </p>
                </div>
            </header>

            {/* Catering Trusted By Section */}
            {trustedBy?.partners && trustedBy.partners.length > 0 && (
                <section className="py-12 bg-white border-b border-buddas-brown/10">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
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

            {/* Value Proposition Section */}
            {valueProposition && valueProposition.length > 0 && (
                <section className="py-16 bg-white border-b border-buddas-brown/10">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {valueProposition.map((prop: any, idx: number) => {
                                let Icon = ChefHat;
                                if (prop.icon === 'fresh') Icon = Leaf;
                                if (prop.icon === 'authentic') Icon = Heart; // Fallback or specific icon
                                if (prop.icon === 'flexible') Icon = Clock;
                                if (prop.icon === 'dietary') Icon = Utensils;

                                return (
                                    <div key={idx} className="flex flex-col items-center text-center p-4">
                                        <div className="w-12 h-12 rounded-full bg-buddas-teal/10 flex items-center justify-center text-buddas-teal mb-4">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-semibold text-lg text-buddas-brown font-poppins mb-2">{prop.title}</h3>
                                        <p className="text-sm text-buddas-brown/70 font-dm-sans">{prop.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Services Grid */}
            <section className="py-24 relative z-10 bg-buddas-cream">
                <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
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
                            const Icon = getIcon(service.icon, icons[idx % icons.length]);

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

            {/* Parallax Break Section */}
            <div>
                <section className="py-20 relative flex items-center justify-center overflow-hidden bg-buddas-brown">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image
                            src={activeTestimonial?.backgroundImage?.asset ? urlFor(activeTestimonial.backgroundImage).width(2000).url() : quoteBgUrl}
                            alt="Background"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-buddas-brown/85"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-buddas-cream">
                        <Quote className="w-10 h-10 text-buddas-gold mb-4 opacity-80 mx-auto fill-buddas-gold/20" />
                        <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-6 font-poppins drop-shadow-sm px-4">
                            "{activeTestimonial?.quote || "The food was absolutely spectacular. Buddas turned our corporate retreat into a culinary adventure we will never forget."}"
                        </h3>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-buddas-cream/20 overflow-hidden relative shadow-lg ring-2 ring-buddas-gold/20">
                                {activeTestimonial?.authorImage?.asset ? (
                                    <Image
                                        src={urlFor(activeTestimonial.authorImage).width(100).url()}
                                        alt={activeTestimonial?.authorName || "Author"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-buddas-cream">
                                        {(activeTestimonial?.authorName || "DM").split(' ').map((n: any) => n[0]).join('')}
                                    </div>
                                )}
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-buddas-cream font-poppins text-sm leading-tight">{activeTestimonial?.authorName || "David Miller"}</p>
                                <p className="text-xs text-buddas-cream/70 font-dm-sans">{activeTestimonial?.authorTitle || "CEO, TechStart Inc."}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Popular Packages (Menu Highlights) */}
            <div>
                <section className="py-24 relative z-10 bg-white">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <span className="text-buddas-gold font-bold tracking-widest uppercase text-xs mb-2 block font-poppins">Our Menus</span>
                                <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown tracking-tight font-poppins drop-shadow-sm">Popular Catering Packages</h2>
                            </div>
                            <Link href="/menu" className="flex items-center gap-2 text-buddas-brown/60 hover:text-buddas-teal transition-colors font-medium group font-dm-sans">
                                View Full Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                            </Link>
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
                                                {item.isBestseller && <span className="bg-buddas-gold text-buddas-brown text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-sm">Bestseller</span>}
                                                <h3 className="text-2xl font-semibold leading-tight font-poppins drop-shadow-md">{item.name}</h3>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-4 mb-4 text-sm text-buddas-brown/60 font-medium font-dm-sans">
                                                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-buddas-teal" /> {item.guestCount || "10-20 ppl"}</span>
                                                <span className="flex items-center gap-1.5 text-buddas-gold-dark font-bold"><DollarSign className="w-4 h-4 text-buddas-teal" /> {item.price || 'Contact for Pricing'}</span>
                                            </div>

                                            {/* Dietary Tags */}
                                            {item.dietaryTags && item.dietaryTags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {item.dietaryTags.map((tag: string, tIdx: number) => (
                                                        <span key={tIdx} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-buddas-brown/5 text-buddas-brown/60 rounded-full border border-buddas-brown/10">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

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
                                            <button
                                                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 mt-auto bg-white border-2 border-buddas-brown/10 text-buddas-brown hover:border-buddas-teal hover:text-buddas-teal hover:bg-buddas-teal/5 active:scale-95 ease-[cubic-bezier(0.25,0.1,0.25,1)] uppercase tracking-wider text-xs"
                                            >
                                                Request Quote
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>

            {/* How It Works */}
            <div>
                <section className="py-24 bg-white relative z-10 border-t border-buddas-brown/10">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="text-center mb-20">
                            <span className="text-buddas-gold font-bold tracking-widest uppercase text-xs mb-2 block font-poppins">Process</span>
                            <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown font-poppins drop-shadow-sm">How It Works</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-buddas-brown/10 -z-10 bg-gradient-to-r from-transparent via-buddas-brown/20 to-transparent"></div>

                            {howItWorks?.map((step: any, idx: number) => {
                                const icons = [ClipboardList, Calendar, ChefHat, Package];
                                const Icon = getIcon(step.icon, icons[idx % icons.length]);

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
            </div>

            {/* Pricing Section */}
            {
                pricingSection && (
                    <section className="py-24 bg-white relative z-10 border-t border-buddas-brown/10">
                        <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                            <div className="text-center mb-16">
                                <span className="text-buddas-gold font-bold tracking-widest uppercase text-xs mb-2 block font-poppins">Pricing</span>
                                <h2 className="text-3xl md:text-5xl font-semibold text-buddas-brown tracking-tight font-poppins">{pricingSection.title || "Flexible Packages"}</h2>
                                {pricingSection.subtitle && <p className="text-buddas-brown/80 mt-4 max-w-2xl mx-auto font-dm-sans">{pricingSection.subtitle}</p>}
                            </div>
                            {/* Render packages if any */}
                            {pricingSection.packages && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {pricingSection.packages.map((pkg: any, idx: number) => (
                                        <div key={idx} className="border border-buddas-brown/10 rounded-xl p-8 hover:border-buddas-teal transition-colors">
                                            <h3 className="text-2xl font-semibold text-buddas-brown font-poppins mb-2">{pkg.name}</h3>
                                            <p className="text-3xl font-semibold text-buddas-teal font-poppins mb-4">{pkg.price}</p>
                                            <p className="text-buddas-brown/70 mb-6 font-dm-sans">{pkg.description}</p>
                                            {pkg.features && (
                                                <ul className="space-y-3 mb-8">
                                                    {pkg.features.map((feat: string, fIdx: number) => (
                                                        <li key={fIdx} className="flex items-center gap-2 text-sm text-buddas-brown/80">
                                                            <CheckCircle className="w-4 h-4 text-buddas-gold" /> {feat}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <button
                                                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="w-full mt-auto py-3 bg-buddas-teal/10 text-buddas-teal font-bold rounded-lg hover:bg-buddas-teal hover:text-white transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] uppercase text-xs tracking-wider"
                                            >
                                                Get Quote
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {pricingSection.minimumNote && (
                                <div className="text-center mt-12 text-sm text-buddas-brown/60 font-medium italic">
                                    * {pricingSection.minimumNote}
                                </div>
                            )}
                        </div>
                    </section>
                )
            }

            {/* Gallery Section */}
            {
                gallery && gallery.length > 0 && (
                    <section className="py-24 bg-buddas-cream relative z-10 border-t border-buddas-brown/10">
                        <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-semibold text-buddas-brown tracking-tight font-poppins">Our Events</h2>
                                <p className="text-buddas-brown/80 mt-4 max-w-2xl mx-auto font-dm-sans">See how we bring the Aloha spirit to events of all sizes.</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {gallery.map((img: any, idx: number) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                        <Image
                                            src={img.url}
                                            alt={img.alt || "Catering Event"}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Trust Credentials Section */}
            <section className="py-16 bg-buddas-cream border-t border-buddas-brown/10">
                <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-buddas-brown/5">
                            <div className="w-16 h-16 rounded-full bg-buddas-gold/10 flex items-center justify-center mb-4 text-buddas-gold-dark">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-semibold text-buddas-brown font-poppins mb-1">10+ Years</h3>
                            <p className="text-buddas-brown/70 font-dm-sans">Serving the Community</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-buddas-brown/5">
                            <div className="w-16 h-16 rounded-full bg-buddas-teal/10 flex items-center justify-center mb-4 text-buddas-teal">
                                <Utensils className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-semibold text-buddas-brown font-poppins mb-1">500+ Events</h3>
                            <p className="text-buddas-brown/70 font-dm-sans">Catered with Aloha</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-buddas-brown/5">
                            <div className="w-16 h-16 rounded-full bg-buddas-orange/10 flex items-center justify-center mb-4 text-buddas-orange">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-semibold text-buddas-brown font-poppins mb-1">98% Happy</h3>
                            <p className="text-buddas-brown/70 font-dm-sans">Client Satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {
                faq && faq.length > 0 && (
                    <div>
                        <section className="py-24 bg-buddas-cream relative z-10 border-t border-buddas-brown/10">
                            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                                <div className="text-center mb-16">
                                    <span className="text-buddas-gold font-bold tracking-widest uppercase text-xs mb-3 block">Common Questions</span>
                                    <h2 className="text-3xl md:text-5xl font-semibold text-buddas-brown tracking-tight font-poppins">Frequently Asked Questions</h2>
                                </div>

                                <div className="max-w-3xl mx-auto">
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {faq.map((item: any, idx: number) => (
                                            <AccordionItem
                                                key={item._key || idx}
                                                value={`item-${idx}`}
                                                className="bg-white rounded-xl border border-buddas-brown/10 px-6 data-[state=open]:border-buddas-teal/30 hover:shadow-md transition-all shadow-sm"
                                            >
                                                <AccordionTrigger className="w-full py-6 text-left hover:no-underline font-semibold text-buddas-brown group">
                                                    <span className="text-lg">{item.question}</span>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-buddas-brown/80 leading-relaxed pb-6 text-base font-dm-sans">
                                                    {item.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }

            {/* Quote Request Section */}
            <div id="quote-form">
                <section className="py-24 bg-white relative z-10 border-t border-buddas-brown/10 scroll-mt-20">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="text-buddas-teal font-bold tracking-widest uppercase text-xs mb-3 block font-poppins">Get a Quote</span>
                                <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown mb-6 font-poppins leading-tight">
                                    Let's Plan Your Event
                                </h2>
                                <p className="text-lg text-buddas-brown/80 mb-10 font-dm-sans leading-relaxed">
                                    Fill out the form to receive a custom quote. Our catering team will check availability and get back to you within 24 hours.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-buddas-gold/10 flex items-center justify-center shrink-0 text-buddas-gold-dark mt-1">
                                            <ChefHat className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg text-buddas-brown font-poppins mb-1">Authentic Flavors</h4>
                                            <p className="text-buddas-brown/70 font-dm-sans">Real Hawaiian comfort food made from scratch.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-buddas-teal/10 flex items-center justify-center shrink-0 text-buddas-teal mt-1">
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg text-buddas-brown font-poppins mb-1">Flexible Packages</h4>
                                            <p className="text-buddas-brown/70 font-dm-sans">From drop-off trays to full-service setup.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-buddas-orange/10 flex items-center justify-center shrink-0 text-buddas-orange mt-1">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg text-buddas-brown font-poppins mb-1">Reliable Service</h4>
                                            <p className="text-buddas-brown/70 font-dm-sans">On time, fresh, and ready to serve.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 md:p-10 rounded-2xl border border-buddas-brown/5">
                                <CateringQuoteForm />
                            </div>
                        </div>

                        <div className="text-center mt-12 text-buddas-brown/70 max-w-md mx-auto">
                            <p className="font-dm-sans text-sm uppercase tracking-wider font-bold mb-2 text-buddas-teal">Prefer to talk to a human?</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-8 h-px bg-buddas-brown/20"></span>
                                <a href="tel:8017855555" className="text-3xl font-poppins font-bold text-buddas-brown hover:text-buddas-teal transition-colors tracking-tight">
                                    (801) 785-5555
                                </a>
                                <span className="w-8 h-px bg-buddas-brown/20"></span>
                            </div>
                            <p className="text-xs mt-2 opacity-60">Mon-Sat 11am - 9pm</p>
                        </div>
                    </div>

                    {/* Closing CTA Section */}
                    <section className="py-20 bg-buddas-brown relative overflow-hidden text-center px-6">
                        {/* Background Pattern/Image Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
                        </div>

                        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                            <Quote className="w-12 h-12 text-buddas-gold mx-auto opacity-50 rotate-180" />

                            <h2 className="text-4xl md:text-5xl font-semibold text-buddas-cream font-poppins tracking-tight">
                                Ready to Make Your Event Unforgettable?
                            </h2>

                            <p className="text-xl text-buddas-cream/80 font-dm-sans leading-relaxed">
                                Whether it's a corporate lunch or a wedding feast, we bring the Aloha spirit to every plate.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <button
                                    onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full sm:w-auto bg-buddas-gold text-buddas-brown px-10 py-4 rounded-xl font-bold uppercase tracking-wide shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] transform"
                                >
                                    Get a Quote
                                </button>
                                <a href="tel:8017855555" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-auto border-2 border-buddas-cream/30 text-buddas-cream px-10 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-buddas-cream/10 hover:border-buddas-cream transition-all duration-300">
                                        Call Now
                                    </button>
                                </a>
                            </div>
                        </div>
                    </section>
                </section>
            </div>


        </div >
    );
}
