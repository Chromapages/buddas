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
    MapPin
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
import { EventInquiryForm } from "./EventInquiryForm";

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
        upcomingEvents,
        trustedBy,
        benefits,
        benefitsSectionTitle,
        benefitsSectionSubtitle,
        howItWorks,
        howItWorksSectionTitle,
        howItWorksSectionSubtitle,
        faq,
        statsSection,
        packages,
        closingCta
    } = data;

    // Use Sanity image if available, else fallback to the design's specific Unsplash image
    const heroImageUrl = heroImage?.asset ? urlFor(heroImage).width(2000).url() : 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop';

    // Parallax background for immersive break
    const breakBgUrl = statsSection?.image?.asset
        ? urlFor(statsSection.image).width(2000).url()
        : 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop';

    return (
        <div className="bg-buddas-cream min-h-screen font-sans text-buddas-brown">
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
                    <div className="absolute inset-0 bg-buddas-brown/60"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-8 mt-10">
                    <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-buddas-gold text-buddas-brown text-xs font-bold uppercase tracking-wider shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        <span>{heroBadge || "Full Service Event Planning"}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] font-poppins drop-shadow-lg">
                        {heroTitle || <>Events That <br /><span className="text-buddas-gold pr-2 drop-shadow-md">Taste</span> Extraordinary</>}
                    </h1>

                    <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
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
                </div>
            </header>

            {/* Trusted By Section */}
            {trustedBy?.partners?.length > 0 && (
                <div>
                    <section className="border-b border-zinc-200/60 bg-white relative z-10">
                        <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16 py-12">
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
                                            <span className="text-2xl font-black text-buddas-brown">{partner.name}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Upcoming Events Section (Only shows if events exist) */}
            {upcomingEvents?.length > 0 && (
                <div>
                    <section className="py-20 bg-white border-b border-buddas-brown/5 relative z-10">
                        <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                                <div>
                                    <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Join the Fun</span>
                                    <h2 className="text-3xl md:text-5xl font-semibold text-buddas-brown tracking-tight font-poppins">
                                        Upcoming Events
                                    </h2>
                                </div>
                                <div className="hidden md:block h-px flex-1 bg-buddas-brown/10 ml-12 mb-4"></div>
                                <Link href="/contact" className="text-buddas-teal font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    View Calendar <CalendarPlus className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {upcomingEvents.map((event: any, index: number) => (
                                    <div key={index} className="group bg-white rounded-2xl overflow-hidden border border-buddas-brown/10 hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <div className="absolute top-4 left-4 z-10 bg-white rounded-lg p-2 text-center min-w-[60px] shadow-md">
                                                <div className="text-xs font-bold text-buddas-brown/60 uppercase tracking-wider">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                                                <div className="text-2xl font-bold text-buddas-brown">{new Date(event.date).getDate()}</div>
                                            </div>
                                            {event.image && (
                                                <Image
                                                    src={urlFor(event.image).width(600).url()}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                                                />
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-xs text-buddas-brown/60 font-semibold uppercase tracking-wider mb-3">
                                                <MapPin className="w-3 h-3" />
                                                {event.location || "Buddas Hawaiian BBQ"}
                                            </div>
                                            <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins group-hover:text-buddas-teal transition-colors duration-300">
                                                {event.title}
                                            </h3>
                                            <p className="text-buddas-brown/70 text-sm mb-6 line-clamp-2">
                                                {event.description}
                                            </p>
                                            <Button asChild variant="outline" className="w-full border-buddas-teal text-buddas-teal hover:bg-buddas-teal hover:text-white transition-all uppercase tracking-wide font-bold duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                                                <a href={event.ctaLink || "#"} target="_blank">{event.ctaLabel || "RSVP Now"}</a>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Event Types Section */}
            <div>
                <section className="py-24 bg-buddas-cream relative z-10">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="text-center mb-16">
                            <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Ways to Celebrate</span>
                            <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown tracking-tight mb-6 font-poppins">
                                Find the Perfect Fit
                            </h2>
                            <p className="text-buddas-brown/80 text-lg max-w-2xl mx-auto">
                                From large-scale fundraisers to intimate family gatherings, we have a package designed for you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {(data.eventTypes?.length > 0 ? data.eventTypes : [
                                {
                                    title: "Benefit Nights",
                                    description: "Partner with us to raise money for your school or non-profit. We donate 20% of sales back to your cause.",
                                    ctaLabel: "Learn More",
                                    ctaLink: "/fundraising",
                                    image: null
                                },
                                {
                                    title: "Full-Service Catering",
                                    description: "Let us bring the Aloha to you. Complete buffet setup, service, and cleanup for weddings and corporate events.",
                                    ctaLabel: "View Menus",
                                    ctaLink: "/catering",
                                    image: null
                                },
                                {
                                    title: "Private Parties",
                                    description: "Reserve a section or the entire restaurant for your special occasion. Perfect for birthdays and anniversaries.",
                                    ctaLabel: "Inquire Now",
                                    ctaLink: "/contact",
                                    image: null
                                }
                            ]).map((type: any, index: number) => (
                                <div key={index} className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] shadow-xl hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                                    <div className="absolute inset-0">
                                        <Image
                                            src={type.image?.asset ? urlFor(type.image).width(800).url() : `https://images.unsplash.com/photo-${index === 0 ? '1511795409834-ef04bbd61622' : index === 1 ? '1555244162-803834f70033' : '1530103862676-de3c9a59aa28'}?q=80&w=800&auto=format&fit=crop`}
                                            alt={type.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-buddas-brown/90 via-buddas-brown/40 to-transparent"></div>
                                    </div>

                                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                        <h3 className="text-3xl font-semibold font-poppins mb-3">{type.title}</h3>
                                        <p className="text-white/80 mb-6 leading-relaxed">
                                            {type.description}
                                        </p>
                                        <div>
                                            <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm border-b border-buddas-gold pb-1 text-buddas-gold">
                                                {type.ctaLabel || "Learn More"}
                                                <Sparkles className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Fundraising Program Section */}
            <div>
                <section className="py-24 bg-white relative z-10 overflow-hidden">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500">
                            <Image
                                src={data.fundraisingProgram?.programImage?.asset ? urlFor(data.fundraisingProgram.programImage).width(1200).url() : "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"}
                                alt="Fundraising Event"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-6 left-6 bg-buddas-gold text-white font-bold text-xl py-2 px-4 rounded-lg shadow-lg rotate-[-2deg]">
                                {data.fundraisingProgram?.percentage || "20%"} Giveback
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-buddas-teal/10 text-buddas-teal font-semibold text-xs uppercase tracking-wider mb-6">
                                <Heart className="w-4 h-4" />
                                <span>Support Local</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown tracking-tight mb-6 font-poppins">
                                {data.fundraisingProgram?.title || "Fundraising Made Delicious"}
                            </h2>
                            <p className="text-buddas-brown/80 text-lg leading-relaxed mb-8">
                                {data.fundraisingProgram?.description || "Host a Benefit Night with us and we'll donate 20% of sales back to your cause. It's the easiest way to raise funds for your school, team, or non-profit organization."}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact">
                                    <Button size="lg" className="bg-buddas-teal text-white hover:bg-buddas-teal-dark font-bold uppercase tracking-wide shadow-lg shadow-buddas-teal/30 hover:translate-y-[-2px] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                                        Book a Benefit Night
                                    </Button>
                                </Link>
                                {data.fundraisingProgram?.flyerDownload && (
                                    <a href={data.fundraisingProgram.flyerDownload} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="lg" className="border-buddas-teal text-buddas-teal hover:bg-buddas-teal/10 font-bold uppercase tracking-wide transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                                            Download Info Packet
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>



            {/* Past Events Gallery */}
            <div>
                <section className="py-24 bg-white relative z-10">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown tracking-tight mb-4 font-poppins">
                                {data.pastEventsGallery?.title || "Memories Made with Buddas"}
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px] md:h-[500px]">
                            {(data.pastEventsGallery?.images?.length > 0 ? data.pastEventsGallery.images : [1, 2, 3, 4, 5]).map((img: any, index: number) => (
                                <div
                                    key={index}
                                    className={`relative rounded-xl overflow-hidden group ${index === 0 ? 'col-span-2 row-span-2' : ''} ${index === 1 ? 'col-span-1 row-span-1' : ''}`}
                                >
                                    <Image
                                        src={img?.asset ? urlFor(img).width(800).url() : `https://images.unsplash.com/photo-${index === 0 ? '1519741497674-611481863552' : index === 1 ? '1541532713592-79a0317b6b77' : '1520342868574-5fa3804e551c'}?q=80&w=800&auto=format&fit=crop`}
                                        alt="Gallery Image"
                                        fill
                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Benefits / Expertise Section */}
            <div>
                <section className="py-24 relative z-10 bg-buddas-cream">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="mb-20 text-center max-w-4xl mx-auto">
                            <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Our Expertise</span>
                            <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown tracking-tight mb-6 font-poppins">
                                {benefitsSectionTitle || "Designed for Every Occasion"}
                            </h2>
                            <p className="text-buddas-brown/80 text-lg">
                                {benefitsSectionSubtitle || "We don't just provide food; we provide an atmosphere. Choose the category that best fits your upcoming event."}
                            </p>
                        </div>

                        {/* Dynamic CMS Content if available, else fallback to hardcoded */}
                        {(true) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {(benefits?.length > 0 ? benefits : [
                                    {
                                        title: "Flavor & Freshness",
                                        description: "Real food, cooked fresh. Not sitting in catered warming trays for hours. The Katsu is crisp, and the rice is always hot.",
                                        icon: null
                                    },
                                    {
                                        title: "Hassle-Free Planning",
                                        description: "From setup to cleanup, we handle the logistics so you can focus on your guests. Our team is with you every step of the way.",
                                        icon: null
                                    },
                                    {
                                        title: "Community Impact",
                                        description: "Host a Benefit Night with us and we'll donate 20% of sales back to your cause. It's fundraising made delicious.",
                                        icon: null
                                    },
                                    {
                                        title: "Generous Portions",
                                        description: "We believe in feeding people properly. No tiny appetizers here—just plates that satisfy the whole crew.",
                                        icon: null
                                    }
                                ]).map((benefit: any, index: number) => (
                                    <div key={index} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-buddas-teal/10 rounded-xl flex items-center justify-center text-buddas-teal shadow-sm">
                                            {benefit.icon ? (
                                                <Image src={urlFor(benefit.icon).url()} alt="" width={24} height={24} />
                                            ) : (
                                                <CheckCircle className="w-6 h-6" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-buddas-brown mb-2 font-poppins">{benefit.title}</h3>
                                            <p className="text-buddas-brown/70 leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Stats / Immersive Break Section */}
            <div>
                <section className="py-40 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={breakBgUrl}
                            alt="Immersive Break"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-buddas-brown/90"></div>
                    </div>

                    <div className="relative z-10 max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="col-span-1 md:col-span-2 text-white">
                            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 font-poppins">
                                {statsSection?.title || "500+ Events, Countless Memories"}
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
            </div>

            {/* How It Works Section */}
            <div>
                <section className="py-24 bg-buddas-cream relative z-10">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown mb-4 tracking-tight font-poppins">
                                {howItWorksSectionTitle || "Everything You Need"}
                            </h2>
                            <p className="text-buddas-brown/70">
                                {howItWorksSectionSubtitle || "Comprehensive event services so you can enjoy the moment."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Service Items */}
                            {(howItWorks?.length > 0 ? howItWorks : [
                                {
                                    title: "Pick Your Date",
                                    description: "Choose a date that works for your group. We recommend booking at least 2 weeks in advance for large parties.",
                                    icon: null
                                },
                                {
                                    title: "Choose Your Menu",
                                    description: "Customize your order with our catering packages, or let our team curate the perfect spread for your budget.",
                                    icon: null
                                },
                                {
                                    title: "We Handle the Rest",
                                    description: "From setup to serving, our team takes care of the details so you can enjoy the celebration.",
                                    icon: null
                                }
                            ]).map((step: any, index: number) => (
                                <div
                                    key={index}
                                    className="group relative bg-white p-8 rounded-2xl border border-buddas-brown/10 shadow-sm hover:shadow-[0_20px_40px_-5px_rgba(84,191,165,0.15)] hover:border-buddas-teal/30 hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden"
                                >
                                    {/* Large Background Watermark Number */}
                                    <div className="absolute -right-6 -top-6 text-[10rem] font-bold text-buddas-teal/5 font-poppins leading-none select-none group-hover:text-buddas-teal/10 transition-colors duration-300 pointer-events-none">
                                        {index + 1}
                                    </div>

                                    {/* Content Container */}
                                    <div className="relative z-10 flex flex-col items-start h-full">
                                        {/* Icon Box */}
                                        <div className="w-16 h-16 bg-buddas-teal/10 rounded-2xl flex items-center justify-center text-buddas-teal mb-6 group-hover:scale-110 group-hover:bg-buddas-teal group-hover:text-white transition-all duration-300 shadow-sm border border-buddas-teal/20 group-hover:border-transparent">
                                            {step.icon ? (
                                                <Image src={urlFor(step.icon).url()} alt="" width={32} height={32} className="transition-transform duration-300" />
                                            ) : (
                                                <span className="text-2xl font-bold font-poppins">{index + 1}</span>
                                            )}
                                        </div>

                                        {/* Step Label */}
                                        <span className="text-buddas-orange text-xs font-bold uppercase tracking-widest mb-3 inline-block">
                                            Step 0{index + 1}
                                        </span>

                                        <h3 className="text-xl md:text-2xl font-semibold text-buddas-brown mb-3 font-poppins group-hover:text-buddas-teal-dark transition-colors duration-300">
                                            {step.title}
                                        </h3>

                                        <p className="text-buddas-brown/70 leading-relaxed font-dm-sans text-base">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Catering Packages Section */}
            <div>
                <section className="py-24 bg-white relative z-10">
                    <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                        <div className="text-center mb-16">
                            <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Simplicity & Value</span>
                            <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown tracking-tight mb-6 font-poppins">
                                Popular Catering Packages
                            </h2>
                            <p className="text-buddas-brown/70 max-w-2xl mx-auto">
                                Choose from our guest-favorite combinations. All packages include plates, utensils, and serving ware.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                            {(packages?.length > 0 ? packages : [
                                {
                                    name: "Island Boxed Lunch",
                                    price: "$18 / person",
                                    description: "Perfect for corporate meetings and office lunches. Individually packed for convenience.",
                                    features: ["Choice of Protein", "Steamed White Rice", "Macaroni Salad", "Drink Included"],
                                    highlight: false
                                },
                                {
                                    name: "Ohana Buffet Style",
                                    price: "$28 / person",
                                    description: "The full Hawaiian experience. Self-serve buffet setup perfect for weddings and large parties.",
                                    features: ["2 Protein Choices", "Steamed White Rice", "Macaroni Salad + Tossed Salad", "Fresh Fruit Platter", "Haupia Dessert"],
                                    highlight: true
                                },
                                {
                                    name: "Pupu (Appetizer) Party",
                                    price: "$22 / person",
                                    description: "Heavy appetizers for cocktail hours and casual get-togethers.",
                                    features: ["Spam Musubi Platter", "Chicken Katsu Skewers", "Poke Shooters", "Edamame", "Spring Rolls"],
                                    highlight: false
                                }
                            ]).map((pkg: any, index: number) => (
                                <div
                                    key={index}
                                    className={`relative bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 ${pkg.highlight ? 'border-buddas-teal shadow-lg scale-105 z-10' : 'border-buddas-brown/10'}`}
                                >
                                    {pkg.highlight && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-buddas-teal text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-md">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-semibold text-buddas-brown mb-2 font-poppins">{pkg.name}</h3>
                                    <div className="text-buddas-gold font-bold text-xl mb-4">{pkg.price}</div>
                                    <p className="text-buddas-brown/70 text-sm mb-8 leading-relaxed border-b border-buddas-brown/10 pb-6">
                                        {pkg.description}
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {pkg.features?.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-buddas-brown/80">
                                                <CheckCircle className="w-5 h-5 text-buddas-teal flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button asChild className={`w-full font-bold uppercase tracking-wide transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${pkg.highlight ? 'bg-buddas-teal hover:bg-buddas-teal-dark text-white shadow-lg shadow-buddas-teal/30 hover:-translate-y-[2px]' : 'bg-buddas-cream text-buddas-brown hover:bg-buddas-brown/10'}`}>
                                        <Link href="/contact">Inquire Now</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* FAQ Section */}
            {(true) && (
                <div>
                    <section className="py-24 bg-buddas-cream relative z-10">
                        <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown mb-4 tracking-tight font-poppins">Frequently Asked Questions</h2>
                                <p className="text-buddas-brown/70">Common questions about planning your event with us.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                {(faq?.length > 0 ? faq : [
                                    {
                                        question: "How does the 20% giveback work?",
                                        answer: "It's simple! You host a Benefit Night with us, and we donate 20% of all sales generated by your group back to your organization. We'll provide digital flyers to help you promote the event."
                                    },
                                    {
                                        question: "What is the minimum order for catering?",
                                        answer: "Our catering packages start at 10 people. For full-service events, we generally recommend a minimum of 50 guests to make it cost-effective."
                                    },
                                    {
                                        question: "Can I customize the menu?",
                                        answer: "Absolutely! While we have popular set packages, we're happy to work with you to build a menu that fits your dietary needs and budget."
                                    },
                                    {
                                        question: "How far in advance should I book?",
                                        answer: "For drop-off catering, we ask for 48 hours notice. For full-service events or Benefit Nights, we recommend booking at least 2-3 weeks in advance to ensure availability and proper promotion."
                                    }
                                ]).map((item: any, index: number) => (
                                    <div key={index} className="group bg-white rounded-xl border border-buddas-brown/10 p-6 hover:shadow-lg hover:border-buddas-teal/30 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer">
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
                </div>
            )}

            {/* Closing CTA & Inquiry Form */}
            <section className="py-24 relative bg-buddas-teal overflow-hidden" id="inquire">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="relative z-10 max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-white text-center lg:text-left">
                        <span className="inline-block px-4 py-2 rounded-full bg-buddas-gold border border-white/20 text-buddas-brown text-xs font-bold uppercase tracking-wider mb-8">
                            Let's Get The Party Started
                        </span>
                        <h2 className="text-4xl md:text-6xl font-semibold mb-6 font-poppins leading-tight">
                            {closingCta?.title || "Ready to Celebrate?"}
                        </h2>
                        <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {closingCta?.subtitle || "Fill out the form to check availability. Whether it's a fundraiser, party, or corporate lunch—we'll make it memorable."}
                        </p>

                        <div className="hidden lg:flex flex-col gap-6 text-white/80">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <PhoneIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest font-bold opacity-60">Call Us</div>
                                    <div className="font-semibold text-lg">555-0123</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <MailIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest font-bold opacity-60">Email Us</div>
                                    <div className="font-semibold text-lg">aloha@buddashawaiian.com</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <EventInquiryForm />
                    </div>
                </div>
            </section>
        </div>
    );
}

function PhoneIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}

function MailIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}
