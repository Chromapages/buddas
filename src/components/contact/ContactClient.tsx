"use client";

import {
    Mail,
    MapPin,
    Phone,
    User,
    Wine,
    ChevronDown,
    Send,
    Instagram,
    Linkedin,
    Twitter,
    Plus,
    Building2,
    Clock,
    PlusCircle,
    Check
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { MICROCOPY } from "@/lib/microcopy";
import { Button } from "@/components/ui/button";

import { urlFor } from "@/sanity/lib/image";

interface ContactClientProps {
    primaryLocation: any;
    pageData?: {
        heroTitle?: string;
        heroSubtitle?: string;
        heroImage?: any;
        formTitle?: string;
        formSubtitle?: string;
        eventTypes?: string[];
        faq?: Array<{
            question: string;
            answer: string;
        }>;
    };
}

export function ContactClient({ primaryLocation, pageData }: ContactClientProps) {
    const [guestCount, setGuestCount] = useState<number>(50);
    const [eventType, setEventType] = useState<string>(pageData?.eventTypes?.[0] || "Wedding Catering");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const eventTypes = pageData?.eventTypes || ["Wedding Catering", "Corporate Event", "Social Party", "Private Chef", "Other"];

    return (
        <div className="bg-buddas-cream min-h-screen font-sans text-buddas-brown">
            {/* Parallax Hero */}
            <header className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-buddas-brown">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={pageData?.heroImage?.asset ? urlFor(pageData.heroImage).url() : "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2400&auto=format&fit=crop"}
                        alt="Contact Hero"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-buddas-brown/50"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-4 mt-10">
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight font-poppins drop-shadow-md">
                        {pageData?.heroTitle ? (
                            pageData.heroTitle
                        ) : (
                            <>
                                Questions? <br />
                                <span className="text-buddas-teal italic font-serif drop-shadow-sm">We're Here, Ohana.</span>
                            </>
                        )}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto font-light drop-shadow-sm">
                        {pageData?.heroSubtitle || "From catering your big day to answering your questions, we're ready to help bring the Aloha spirit to your table."}
                    </p>
                </div>
            </header>

            {/* Main Content Card */}
            <main className="relative z-20 -mt-24 px-4 pb-20">
                <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl shadow-zinc-900/5 border border-zinc-100 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">

                        <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16">
                            <div className="mb-10">
                                <h2 className="text-3xl font-semibold text-buddas-brown tracking-tight mb-2 font-poppins">
                                    {pageData?.formTitle || "Send us a message"}
                                </h2>
                                <p className="text-buddas-brown/60">
                                    {pageData?.formSubtitle || "Fill out the form below and we'll get back to you within 24 hours."}
                                </p>
                            </div>

                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* First Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-buddas-brown/70 ml-1">First Name</label>
                                        <input type="text" placeholder="Jane" className="w-full px-4 py-3.5 rounded-lg bg-white border border-buddas-brown/20 shadow-inner text-buddas-brown placeholder:text-buddas-brown/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-buddas-teal/20 focus:border-buddas-teal transition-all" />
                                    </div>
                                    {/* Last Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-buddas-brown/70 ml-1">Last Name</label>
                                        <input type="text" placeholder="Doe" className="w-full px-4 py-3.5 rounded-lg bg-white border border-buddas-brown/20 shadow-inner text-buddas-brown placeholder:text-buddas-brown/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-buddas-teal/20 focus:border-buddas-teal transition-all" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-buddas-brown/70 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-buddas-brown/40 w-5 h-5" />
                                        <input type="email" placeholder="jane@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-white border border-buddas-brown/20 shadow-inner text-buddas-brown placeholder:text-buddas-brown/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-buddas-teal/20 focus:border-buddas-teal transition-all" />
                                    </div>
                                </div>

                                {/* Custom Dropdown Trigger (Event Type) */}
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-buddas-brown/70 ml-1">Event Type</label>
                                    <div
                                        className="relative group cursor-pointer"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <div className={`w-full px-4 py-3.5 rounded-lg bg-white border ${isDropdownOpen ? 'border-buddas-teal ring-2 ring-buddas-teal/20' : 'border-buddas-brown/20 shadow-sm'} text-buddas-brown flex items-center justify-between hover:border-buddas-teal/50 transition-all`}>
                                            <span className="flex items-center gap-2">
                                                <Wine className="text-buddas-teal w-5 h-5" />
                                                {eventType}
                                            </span>
                                            <ChevronDown className={`text-buddas-brown/40 w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-zinc-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                            {eventTypes.map((type) => (
                                                <div
                                                    key={type}
                                                    className="px-4 py-3 hover:bg-buddas-cream cursor-pointer text-buddas-brown hover:text-buddas-teal-dark transition-colors flex items-center gap-2"
                                                    onClick={() => {
                                                        setEventType(type);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    {eventType === type && <Check className="w-4 h-4 text-buddas-teal" />}
                                                    <span className={eventType === type ? "font-semibold ml-0" : "ml-6"}>{type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Custom Slider (Guest Count) */}
                                <div className="space-y-4 pt-2">
                                    <div className="flex justify-between items-end">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-buddas-brown/70 ml-1">Guest Estimate</label>
                                        <span className="text-sm font-bold text-buddas-teal bg-buddas-teal/10 px-2 py-1 rounded-md">{guestCount} Guests</span>
                                    </div>
                                    <div className="relative w-full h-6 flex items-center">
                                        <input
                                            type="range"
                                            min="10"
                                            max="500"
                                            value={guestCount}
                                            onChange={(e) => setGuestCount(parseInt(e.target.value))}
                                            className="w-full h-2 bg-buddas-brown/10 rounded-full appearance-none cursor-pointer accent-buddas-teal focus:outline-none focus:ring-2 focus:ring-buddas-teal/20"
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-buddas-brown/40 font-medium">
                                        <span>10</span>
                                        <span>500+</span>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-buddas-brown/70 ml-1">Message</label>
                                    <textarea rows={4} placeholder="Tell us about your dietary requirements, theme ideas..." className="w-full px-4 py-3.5 rounded-lg bg-white border border-buddas-brown/20 shadow-inner text-buddas-brown placeholder:text-buddas-brown/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-buddas-teal/20 focus:border-buddas-teal transition-all resize-none"></textarea>
                                </div>

                                {/* Custom Toggle / Checkbox */}
                                <div className="flex items-start gap-3">
                                    <label className="relative flex items-center cursor-pointer p-1">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-5 h-5 border-2 border-buddas-brown/30 rounded-[6px] peer-checked:bg-buddas-teal peer-checked:border-buddas-teal transition-all flex items-center justify-center text-white">
                                            <Check className="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                    </label>
                                    <p className="text-sm text-buddas-brown/60 leading-tight pt-1">
                                        I agree to the <Link href="#" className="text-buddas-brown underline decoration-zinc-300 underline-offset-2 hover:decoration-buddas-orange transition-colors">Terms of Service</Link> and <Link href="#" className="text-buddas-brown underline decoration-zinc-300 underline-offset-2 hover:decoration-buddas-orange transition-colors">Privacy Policy</Link>.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-6 rounded-lg bg-buddas-teal text-white text-base font-bold uppercase tracking-wide shadow-lg hover:shadow-xl hover:translate-y-[-2px] hover:bg-buddas-teal-dark active:scale-95 transition-all"
                                >
                                    {MICROCOPY.sendRequest || "Send Request"}
                                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </div>

                        <div className="w-full lg:w-2/5 bg-buddas-cream border-t lg:border-t-0 lg:border-l border-buddas-brown/10 p-8 md:p-12 relative overflow-hidden">
                            {/* Decorative Pattern */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-buddas-orange/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-buddas-teal/20 rounded-full blur-3xl"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between space-y-12">
                                <div>
                                    <h3 className="text-xl font-semibold text-buddas-brown mb-6 flex items-center gap-2 font-poppins">
                                        <MapPin className="text-buddas-brown w-6 h-6" />
                                        Visit Our Kitchen
                                    </h3>

                                    {/* Google Maps Embed */}
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-buddas-brown/20 group mb-8">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.4371424638875!2d-111.7366577!3d40.3548305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d853ad86df1af%3A0x2c17a0f9a8aad114!2sBudda&#39;s%20Bakery%20%26%20Breakfast!5e0!3m2!1sen!2sus!4v1765920548351!5m2!1sen!2sus"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="absolute inset-0"
                                            title="Budda's Hawaiian Location"
                                        ></iframe>
                                        <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-buddas-brown shadow-sm flex items-center gap-1 pointer-events-none">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            Open Now
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white border border-buddas-brown/10 flex items-center justify-center text-buddas-brown/70 shrink-0">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-buddas-brown text-sm">Headquarters</p>
                                                <p className="text-buddas-brown/60 text-sm leading-relaxed mt-0.5">
                                                    {primaryLocation?.addressLine1 || "123 Culinary Avenue, Suite 400"}<br />
                                                    {primaryLocation ? `${primaryLocation.city}, ${primaryLocation.state} ${primaryLocation.zip}` : "New York, NY 10012"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white border border-buddas-brown/10 flex items-center justify-center text-buddas-brown/70 shrink-0">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-buddas-brown text-sm">Contact Info</p>
                                                <p className="text-buddas-brown/60 text-sm mt-0.5 hover:text-buddas-orange transition-colors cursor-pointer">
                                                    {primaryLocation?.phone || "+1 (555) 0123-456"}
                                                </p>
                                                <p className="text-buddas-brown/60 text-sm hover:text-buddas-orange transition-colors cursor-pointer">
                                                    hello@buddas.com
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white border border-buddas-brown/10 flex items-center justify-center text-buddas-brown/70 shrink-0">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-buddas-brown text-sm">Office Hours</p>
                                                <p className="text-buddas-brown/60 text-sm mt-0.5">Mon - Fri: 9am - 6pm</p>
                                                <p className="text-buddas-brown/60 text-sm">Sat - Sun: Events Only</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Socials */}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-buddas-brown/40 mb-4">Follow Us</p>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-12 h-12 rounded-full bg-buddas-brown text-white flex items-center justify-center transition-all shadow-md hover:-translate-y-1 hover:bg-buddas-teal">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="w-12 h-12 rounded-full bg-white border border-buddas-brown/10 text-buddas-brown flex items-center justify-center transition-all shadow-sm hover:-translate-y-1 hover:bg-buddas-brown hover:text-white">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="w-12 h-12 rounded-full bg-white border border-buddas-brown/10 text-buddas-brown flex items-center justify-center transition-all shadow-sm hover:-translate-y-1 hover:bg-buddas-brown hover:text-white">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div>
                <section className="py-20 px-6 max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto 2xl:px-16 w-full">
                    <div className="text-center mb-12">
                        <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Support</span>
                        <h2 className="text-3xl font-semibold text-buddas-brown tracking-tight font-poppins">Frequently Asked Questions</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        {(pageData?.faq || [
                            {
                                question: "How far in advance should I book?",
                                answer: "We recommend booking at least 3 months in advance for large events (weddings, galas) and 2 weeks for smaller corporate gatherings to ensure availability."
                            },
                            {
                                question: "Do you accommodate dietary restrictions?",
                                answer: "Absolutely. Our culinary team specializes in creating delicious menus for vegan, gluten-free, keto, and kosher requirements without compromising on taste."
                            },
                            {
                                question: "Is there a minimum guest count?",
                                answer: "Our minimum for full-service catering is 10 guests. For smaller private chef experiences, we can accommodate groups as small as 2."
                            }
                        ]).map((item, index) => (
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
                </section>
            </div>
        </div>
    );
}
