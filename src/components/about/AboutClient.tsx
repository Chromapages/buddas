"use client";

import {
    Leaf,
    Star,
    Users,
    Quote,
    Clock,
    Heart
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

import { Button } from "@/components/ui/button";

interface AboutClientProps {
    data: any; // Legacy prop name from page.tsx mapping, usually passed as pageData={data}
}

export function AboutClient({ data }: AboutClientProps) {
    // Handle both prop patterns just in case (direct prop or nested)
    const pageData = data || {};

    const {
        heroTitle,
        heroSubtitle,
        heroImage,
        storyTitle,
        storyContent,
        storyImage,
        heritage,
        values,
        closingCta
    } = pageData;

    // Use default image if none provided
    const heroImageUrl = heroImage?.asset ? urlFor(heroImage).width(2400).url() : 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2400&auto=format&fit=crop';
    const kitchenBgUrl = 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2000&auto=format&fit=crop';
    const testimonialBgUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop';

    return (
        <div className="bg-buddas-cream min-h-screen font-sans text-buddas-brown">
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
                    <div className="absolute inset-0 bg-buddas-brown/60"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 mt-16">
                    <span className="text-buddas-brown font-semibold tracking-widest uppercase text-sm bg-buddas-gold px-4 py-1.5 rounded-full shadow-sm">Est. 2015</span>
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] font-poppins drop-shadow-lg">
                        {heroTitle || <>Where Hawaiian Tradition <br /><span className="text-buddas-orange font-serif italic drop-shadow-md">Meets Family Love</span></>}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
                        {heroSubtitle || "We took the classic Hawaiian plate lunch—generous, flavorful, humble—and engineered it for the modern family on the go."}
                    </p>
                </div>
            </header>


            <section className="py-24 relative z-10 bg-buddas-cream">
                <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-semibold text-buddas-brown tracking-tight font-poppins">{storyTitle || "Bringing Aloha to the Table"}</h2>
                            <div className="space-y-6 text-lg text-buddas-brown/80 leading-relaxed">
                                {storyContent ? (
                                    <PortableText value={storyContent} />
                                ) : (
                                    <>
                                        <p>
                                            In a world of transactional fast food and faceless delivery apps, Buddas is the warm hug. We are the spot where the steam rises off the rice, the mac salad is always creamy, and the "Aloha" isn't just a marketing slogan—it's the way we treat every order.
                                        </p>
                                        <p>
                                            We exist to share the specific warmth of island-inspired comfort food—fast, consistent, and family-friendly. We believe that convenience shouldn't feel cold, and speed shouldn't cost you your wallet.
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="border-l-2 border-buddas-orange pl-6">
                                    <span className="block text-4xl font-semibold text-buddas-brown mb-1 font-poppins">3+</span>
                                    <span className="text-sm text-buddas-brown/60 uppercase tracking-widest font-semibold">Locations</span>
                                </div>
                                <div className="border-l-2 border-buddas-orange pl-6">
                                    <span className="block text-4xl font-semibold text-buddas-brown mb-1 font-poppins">100k+</span>
                                    <span className="text-sm text-buddas-brown/60 uppercase tracking-widest font-semibold">Plates Served</span>
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
                                        src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1200&auto=format&fit=crop"
                                        alt="Our Roots"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Heritage Section (Replaces Kitchen Interlude) */}

            <section className="py-40 relative flex items-center justify-center mt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heritage?.image?.asset ? urlFor(heritage.image).url() : kitchenBgUrl}
                        alt="Heritage"
                        fill
                        className="object-cover"
                    />
                    {/* Mobile/Tablet Overlay - Darker for readability */}
                    <div className="absolute inset-0 bg-buddas-brown/90 lg:bg-buddas-brown/80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
                    <Leaf className="text-buddas-teal w-16 h-16 mb-6 mx-auto" />
                    <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-8 font-poppins">
                        {heritage?.title || "Rooted in Tradition"}
                    </h2>
                    <div className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                        {heritage?.content ? (
                            <PortableText value={heritage.content} />
                        ) : (
                            <p>
                                "Aloha" isn't just a greeting; it's a way of life. It means treating every guest like family and every plate like a gift. We honor the islands by keeping our flavors authentic and our welcome warm.
                            </p>
                        )}
                    </div>
                </div>
            </section>


            {/* Values Section */}

            <section className="py-24 bg-buddas-cream relative z-10">
                <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 2xl:px-16">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <span className="text-buddas-orange font-bold tracking-widest uppercase text-xs mb-3 block">Our Promise</span>
                        <h2 className="text-3xl md:text-4xl font-semibold text-buddas-brown tracking-tight font-poppins">The Buddas Way</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {values?.length > 0 ? (
                            values.map((value: any, idx: number) => {
                                const icons = [Leaf, Star, Users];
                                const Icon = icons[idx % icons.length];
                                return (
                                    <div key={idx} className="group p-8 rounded-xl bg-white hover:bg-buddas-teal/5 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] border border-buddas-brown/5 shadow-sm hover:-translate-y-2">
                                        <div className="w-14 h-14 bg-buddas-teal/10 text-buddas-teal rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-inner border border-buddas-brown/5">
                                            {value.icon?.asset ? (
                                                <Image src={urlFor(value.icon).url()} width={32} height={32} alt="" />
                                            ) : (
                                                <Icon className="w-8 h-8" />
                                            )}
                                        </div>
                                        <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins">{value.title}</h3>
                                        <p className="text-buddas-brown/60 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                )
                            })
                        ) : (
                            // Brand Pillar Fallbacks
                            <>
                                <div className="group p-8 rounded-xl bg-white hover:bg-buddas-teal/5 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] border border-buddas-brown/5 shadow-sm hover:-translate-y-2">
                                    <div className="w-14 h-14 bg-buddas-teal/10 text-buddas-teal rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-inner border border-buddas-brown/5">
                                        <Heart className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins">Flavor & Freshness</h3>
                                    <p className="text-buddas-brown/60 leading-relaxed">
                                        "The Crave." Real food, cooked fresh. Not sitting under a heat lamp. The Katsu is crisp, and the rice is always hot.
                                    </p>
                                </div>
                                <div className="group p-8 rounded-xl bg-white hover:bg-buddas-teal/5 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] border border-buddas-brown/5 shadow-sm hover:-translate-y-2">
                                    <div className="w-14 h-14 bg-buddas-teal/10 text-buddas-teal rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-inner border border-buddas-brown/5">
                                        <Clock className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins">Convenience & Speed</h3>
                                    <p className="text-buddas-brown/60 leading-relaxed">
                                        "The Modern." We respect your time. High-tech ordering, high-touch service. Dinner solved in 3 taps.
                                    </p>
                                </div>
                                <div className="group p-8 rounded-xl bg-white hover:bg-buddas-teal/5 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] border border-buddas-brown/5 shadow-sm hover:-translate-y-2">
                                    <div className="w-14 h-14 bg-buddas-teal/10 text-buddas-teal rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-inner border border-buddas-brown/5">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-buddas-brown mb-3 font-poppins">Generosity & Value</h3>
                                    <p className="text-buddas-brown/60 leading-relaxed">
                                        "The Ohana." You get fed properly. No tiny portions. Plates that hit, prices that don't.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <section className="py-32 relative flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={testimonialBgUrl}
                        alt="Testimonial Background"
                        fill
                        className="object-cover"
                    />
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-buddas-brown/90"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <Quote className="text-white/30 w-16 h-16 mb-8 mx-auto" />
                    <h2 className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed mb-8">
                        "I have never seen a team so dedicated to the craft. Buddas didn't just cater our charity gala; they created an atmosphere of warmth that our guests are still talking about."
                    </h2>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-white font-semibold tracking-wide uppercase font-poppins">Jonathan Doe</span>
                        <span className="text-white/60 text-sm">Director, Global Arts Foundation</span>
                    </div>
                </div>
            </section>


            {/* Closing CTA Section */}
            <section className="py-24 relative bg-buddas-teal overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6 font-poppins">
                        {closingCta?.title || "Join Our Ohana"}
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        {closingCta?.subtitle || "Ready to taste the difference? Stop by for a plate, or deliver some Aloha to your door."}
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-buddas-cream text-buddas-brown hover:bg-white hover:text-buddas-teal font-dm-sans font-medium uppercase tracking-wide rounded-lg px-8 py-6 h-auto text-lg shadow-lg shadow-buddas-cream/20 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    >
                        <Link href={closingCta?.buttonLink || "/menu"}>
                            {closingCta?.buttonLabel || "Order Now"}
                        </Link>
                    </Button>
                </div>
            </section>

        </div>
    );
}
