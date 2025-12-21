import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Twitter, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ContactInfoSidebarProps {
    location?: any;
}

export function ContactInfoSidebar({ location }: ContactInfoSidebarProps) {
    const isOpen = true; // TODO: Implement actual time check logic based on hours

    return (
        <div className="space-y-6">


            <div className="grid gap-4">
                {/* Location Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-buddas-brown/5 flex flex-col gap-4 group hover:border-buddas-teal/30 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                    <div className="flex items-start gap-4">
                        <div className="bg-buddas-teal/10 p-3 rounded-xl text-buddas-teal">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-poppins font-semibold text-buddas-brown text-lg mb-1">Main Location</h3>
                            <p className="text-buddas-brown/70 leading-relaxed">
                                {location ? (
                                    <>
                                        {location.addressLine1}<br />
                                        {location.city}, {location.state} {location.zip}
                                    </>
                                ) : (
                                    <>
                                        Haven City Market<br />
                                        8443 Haven Ave<br />
                                        Rancho Cucamonga, CA 91730
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    <Button
                        asChild
                        className="w-full bg-buddas-gold text-buddas-brown hover:bg-buddas-gold-dark font-dm-sans font-bold rounded-xl h-12 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    >
                        <a
                            href={location?.mapUrl || "https://maps.google.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                        >
                            <Navigation className="w-4 h-4" />
                            Get Directions
                        </a>
                    </Button>
                </div>

                {/* Contact Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-buddas-brown/5 flex flex-col gap-4 group hover:border-buddas-teal/30 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                    <div className="flex items-center gap-4">
                        <div className="bg-buddas-teal/10 p-3 rounded-xl text-buddas-teal">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-poppins font-semibold text-buddas-brown text-lg mb-1">Phone</h3>
                            <a
                                href={`tel:${location?.phone || "(909) 123-4567"}`}
                                className="text-xl font-display text-buddas-brown hover:text-buddas-teal transition-colors"
                            >
                                {location?.phone || "(909) 123-4567"}
                            </a>
                        </div>
                    </div>
                    <div className="h-px bg-buddas-brown/5 w-full" />
                    <div className="flex items-center gap-4">
                        <div className="bg-buddas-teal/10 p-3 rounded-xl text-buddas-teal">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-poppins font-semibold text-buddas-brown text-lg mb-1">Email</h3>
                            <a
                                href="mailto:aloha@buddashawaiian.com"
                                className="text-buddas-brown/70 hover:text-buddas-teal transition-colors"
                            >
                                aloha@buddashawaiian.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Hours Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-buddas-brown/5 flex flex-col gap-4 group hover:border-buddas-teal/30 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-buddas-teal/10 p-3 rounded-xl text-buddas-teal">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-poppins font-semibold text-buddas-brown text-lg">Hours</h3>
                        </div>
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                            isOpen ? "bg-buddas-teal/10 text-buddas-teal" : "bg-buddas-orange/10 text-buddas-orange"
                        )}>
                            <span className={cn(
                                "w-2 h-2 rounded-full",
                                isOpen ? "bg-buddas-teal animate-pulse" : "bg-buddas-orange"
                            )} />
                            {isOpen ? "Open Now" : "Closed"}
                        </div>
                    </div>
                    <div className="space-y-2 pl-[4.5rem]">
                        {Array.isArray(location?.hours) ? (
                            <div className="space-y-1">
                                {location.hours.map((day: any) => (
                                    <div key={day._key} className="flex justify-between text-buddas-brown/70 text-sm">
                                        <span className="font-medium w-24">{day.dayOfWeek}</span>
                                        <span>
                                            {day.isClosed
                                                ? "Closed"
                                                : `${day.openTime} - ${day.closeTime}`
                                            }
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-buddas-brown/70 whitespace-pre-line">
                                {location?.hours || "Hours not available"}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Social Footer */}
            <div className="flex gap-4 pt-4">
                {[
                    { icon: Instagram, href: "#" },
                    { icon: Facebook, href: "#" },
                    { icon: Twitter, href: "#" }
                ].map((social, i) => (
                    <Link
                        key={i}
                        href={social.href}
                        className="w-12 h-12 rounded-full bg-white border border-buddas-brown/10 flex items-center justify-center text-buddas-brown hover:bg-buddas-teal hover:text-white hover:border-buddas-teal transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-sm hover:shadow-md hover:-translate-y-1"
                    >
                        <social.icon className="w-5 h-5" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
