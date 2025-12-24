import { client } from "@/sanity/lib/client";
import { REWARDS_PAGE_QUERY } from "@/sanity/lib/queries";
import { Footer } from "@/components/Footer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const revalidate = 60;

export default async function RewardsPage() {
    const pageData = await client.fetch(REWARDS_PAGE_QUERY);

    if (!pageData) {
        return (
            <div className="min-h-screen flex flex-col bg-buddas-cream font-body">
                <main className="flex-1 flex items-center justify-center p-8 text-center">
                    <div>
                        <h1 className="text-2xl font-bold text-buddas-brown mb-4">Rewards Program Coming Soon</h1>
                        <p className="text-buddas-brown/80">We are currently updating our rewards program. Please check back later!</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-buddas-cream font-body">

            <main className="flex-1">
                {/* Hero Section */}
                {/* Masthead Replacement */}
                <div className="bg-buddas-dark py-20 px-4 text-center text-white">
                    <h1 className="font-display text-5xl md:text-6xl mb-4">{pageData.heroTitle || pageData.title}</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">{pageData.heroSubtitle}</p>
                </div>

                {/* Benefits Section */}
                {pageData.benefits && pageData.benefits.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="font-display text-4xl md:text-5xl text-buddas-brown mb-6">
                                    Unlock Exclusive Perks
                                </h2>
                                <p className="text-lg text-buddas-brown/80">
                                    Join the Budda's community and get rewarded for every delicious bite.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {pageData.benefits.map((benefit: any, index: number) => (
                                    <Card key={index} className="border-none shadow-lg bg-buddas-cream/20 hover:bg-buddas-cream/40 transition-colors duration-300">
                                        <CardHeader className="flex flex-col items-center text-center pb-2">
                                            {benefit.icon && (
                                                <div className="w-16 h-16 mb-6 relative">
                                                    <Image
                                                        src={urlFor(benefit.icon).url()}
                                                        alt={benefit.title}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            )}
                                            <CardTitle className="text-xl font-bold text-buddas-brown">
                                                {benefit.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <p className="text-buddas-brown/80 leading-relaxed">{benefit.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* How It Works Section */}
                {pageData.steps && pageData.steps.length > 0 && (
                    <section className="py-20 bg-buddas-dark text-buddas-cream">
                        <div className="container mx-auto px-4">
                            <h2 className="font-display text-4xl md:text-5xl text-center mb-16 text-buddas-gold">
                                How It Works
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                                {/* Connecting Line (Desktop) */}
                                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-buddas-gold/30 -z-0"></div>

                                {pageData.steps.map((step: any, index: number) => (
                                    <div key={index} className="flex flex-col items-center text-center relative z-10">
                                        <div className="w-24 h-24 rounded-full bg-buddas-gold text-buddas-dark flex items-center justify-center text-3xl font-bold mb-8 shadow-glow">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/80 max-w-xs leading-relaxed">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ Section */}
                {pageData.faq && pageData.faq.length > 0 && (
                    <section className="py-20 bg-buddas-cream">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <h2 className="font-display text-3xl md:text-4xl text-center text-buddas-brown mb-12">
                                Frequently Asked Questions
                            </h2>
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {pageData.faq.map((item: any, index: number) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border-none shadow-sm">
                                        <AccordionTrigger className="text-lg font-semibold text-buddas-brown hover:text-buddas-teal text-left">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-buddas-brown/80 leading-relaxed pb-4">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <section className="py-24 bg-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="font-display text-4xl md:text-5xl text-buddas-brown mb-8">
                            Ready to start earning?
                        </h2>
                        <Button asChild size="lg" className="bg-buddas-gold text-buddas-dark hover:bg-buddas-gold/90 rounded-full px-10 text-xl font-bold h-16 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <Link href={pageData.heroCtaLink || "#"}>{pageData.heroCtaLabel || "Join Rewards"}</Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
