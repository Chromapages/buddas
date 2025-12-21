"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutData {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: any;
    values?: { title: string; description: string }[];
}

interface NewAboutSectionProps {
    aboutData?: AboutData;
}

export function NewAboutSection({ aboutData }: NewAboutSectionProps) {
    if (!aboutData) return null;

    const imageUrl = aboutData.image
        ? urlFor(aboutData.image).width(800).height(600).url()
        : null;

    return (
        <section className="py-16 md:py-24 bg-buddas-cream">
            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 2xl:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={aboutData.title || "About Buddas Hawaiian"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-buddas-teal/10 flex items-center justify-center">
                                <Sparkles className="w-16 h-16 text-buddas-teal/30" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-buddas-gold/10 p-3 rounded-xl border border-buddas-gold/20 text-buddas-brown">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-dm-sans font-medium text-buddas-brown/60 uppercase tracking-wide">
                                Our Story
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-buddas-brown tracking-tight">
                            {aboutData.title || "Bringing Aloha to the Table"}
                        </h2>

                        {aboutData.subtitle && (
                            <p className="text-xl text-buddas-brown/80 font-dm-sans">
                                {aboutData.subtitle}
                            </p>
                        )}

                        <p className="text-buddas-brown/70 font-dm-sans leading-relaxed">
                            {aboutData.description ||
                                "We exist to share the specific warmth of island-inspired comfort food—fast, consistent, and family-friendly. Convenience shouldn't feel cold, and speed shouldn't cost you your wallet."}
                        </p>

                        <Link href="/about">
                            <Button className="w-fit gap-2">
                                Learn Our Story
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
