"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface TrustedByProps {
    trustedByData?: {
        title?: string;
        platforms?: {
            name: string;
            url: string;
            logo?: string;
        }[];
    };
}

export function TrustedBy({ trustedByData }: TrustedByProps) {
    const title = trustedByData?.title || "Order Buddas on Your Favorite Apps";
    const platforms = trustedByData?.platforms || [
        { name: "Uber Eats", url: "https://www.ubereats.com" },
        { name: "DoorDash", url: "https://www.doordash.com/en/store/budda%E2%80%99s-bakery-205-e-700-s-pleasant-grove-32569829/54812346/" },
        { name: "Grubhub", url: "https://www.grubhub.com" },
        { name: "Postmates", url: "https://postmates.com" },
        { name: "SpotOn", url: "https://www.spoton.com" },
    ];

    const LogoItem = ({ platform }: { platform: any }) => (
        <Link
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-buddas-teal focus:ring-offset-2 rounded-lg min-h-[40px] md:min-h-[48px] flex items-center flex-shrink-0 mx-4 md:mx-6"
        >
            {platform.logo ? (
                <div className="relative h-8 sm:h-10 lg:h-12 w-auto min-w-[90px] sm:min-w-[120px] lg:min-w-[160px]">
                    <Image
                        src={platform.logo}
                        alt={platform.name || "Platform logo"}
                        fill
                        className="object-contain transition-all duration-300 hover:scale-105"
                    />
                </div>
            ) : (
                <span className="text-xl sm:text-2xl lg:text-3xl font-poppins font-semibold tracking-tight text-buddas-brown/40 hover:text-buddas-teal transition-colors duration-300 whitespace-nowrap">
                    {platform.name}
                </span>
            )}
        </Link>
    );

    return (
        <section className="py-6 md:py-10 lg:py-12 xl:py-16 bg-buddas-cream border-b border-buddas-brown/5 overflow-hidden">
            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-0 md:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
                {/* Desktop Header: Hidden on Mobile */}
                <h2 className="hidden md:block text-buddas-brown font-poppins font-semibold mb-6 md:mb-12 text-xl md:text-3xl lg:text-4xl tracking-[-0.01em] drop-shadow-sm px-6">
                    {title}
                </h2>

                {/* Mobile Micro-Header */}
                <div className="md:hidden text-center mb-6">
                    <span className="text-[10px] font-bold text-buddas-brown/40 tracking-[0.2em] uppercase">
                        Delivery Partners
                    </span>
                </div>

                {/* Mobile Marquee View (< md) */}
                <div className="md:hidden relative flex overflow-hidden mask-linear-fade">
                    <motion.div
                        className="flex items-center whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        whileTap={{ animationPlayState: "paused" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20, // Adjust speed here
                            repeatType: "loop"
                        }}
                        style={{
                            // Ensure the animation respects the play state even when controlled via Framer Motion's animate prop
                            //@ts-ignore
                            '--play-state': 'running'
                        }}
                    >
                        {/* Duplicate lists for seamless loop */}
                        {[...platforms, ...platforms, ...platforms].map((platform, index) => (
                            <LogoItem key={`marquee-${index}`} platform={platform} />
                        ))}
                    </motion.div>

                    {/* Gradient Masks for fade effect */}
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-buddas-cream to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-buddas-cream to-transparent z-10 pointer-events-none" />
                </div>

                {/* Desktop Grid View (md+) */}
                <div className="hidden md:flex flex-wrap justify-center gap-y-8 gap-x-12">
                    {platforms.map((platform, index) => (
                        <LogoItem key={`desktop-${index}`} platform={platform} />
                    ))}
                </div>
            </div>
        </section>
    );
}
