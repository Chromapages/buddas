import { ArrowRight, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface BentoItem {
    id: string;
    name: string;
    description?: string;
    price?: number;
    image?: string;
    isBestSeller?: boolean;
}

interface NewMenuGridProps {
    items: BentoItem[];
}

export function NewMenuGrid({ items }: NewMenuGridProps) {
    // We need at least 5 items for the full grid, or we handle gracefully
    const [largeItem, tallItem, smallItem1, smallItem2, ...rest] = items;

    // Fallback if no Sanity data
    const defaultImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80";

    return (
        <section id="menu" className="py-24 bg-white border-t border-zinc-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">Island Favorites</h2>
                        <p className="text-zinc-500">Fresh ingredients, generous portions, authentic recipes.</p>
                    </div>
                    <Link href="/menu" className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1">
                        Full Menu <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Large Item */}
                    {largeItem && (
                        <div className="md:col-span-2 group relative h-[400px] rounded-2xl overflow-hidden bg-zinc-50 ring-1 ring-zinc-900/5">
                            <Image
                                src={largeItem.image || defaultImage}
                                alt={largeItem.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 66vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    {largeItem.isBestSeller && (
                                        <span className="inline-block px-2 py-1 bg-white/90 text-buddas-brown text-xs font-medium rounded mb-3 border border-white/10">Bestseller</span>
                                    )}
                                    <h3 className="text-2xl font-semibold text-white tracking-tight">{largeItem.name}</h3>
                                    <p className="text-zinc-300 mt-2 line-clamp-2">{largeItem.description}</p>
                                    <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="text-white font-semibold">${largeItem.price}</span>
                                        <button className="bg-white text-zinc-900 text-xs font-medium px-4 py-2 rounded-full hover:bg-zinc-100">Order Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tall Item */}
                    {tallItem && (
                        <div className="group relative h-[400px] rounded-2xl overflow-hidden bg-zinc-50 ring-1 ring-zinc-900/5">
                            <Image
                                src={tallItem.image || defaultImage}
                                alt={tallItem.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-semibold text-white tracking-tight">{tallItem.name}</h3>
                                <p className="text-zinc-300 text-sm mt-1 line-clamp-2">{tallItem.description}</p>
                                <span className="text-white font-medium mt-2 block">${tallItem.price}</span>
                            </div>
                        </div>
                    )}

                    {/* Small Items Row */}
                    {smallItem1 && (
                        <div className="group relative h-64 rounded-2xl overflow-hidden bg-zinc-50 ring-1 ring-zinc-900/5">
                            <Image
                                src={smallItem1.image || defaultImage}
                                alt={smallItem1.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute top-4 right-4 bg-white shadow-sm px-3 py-1 rounded-full text-xs font-semibold text-zinc-900 border border-zinc-100">${smallItem1.price}</div>
                            <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black/60 to-transparent">
                                <h3 className="text-lg font-semibold text-white">{smallItem1.name}</h3>
                            </div>
                        </div>
                    )}

                    {smallItem2 && (
                        <div className="group relative h-64 rounded-2xl overflow-hidden bg-zinc-50 ring-1 ring-zinc-900/5">
                            <Image
                                src={smallItem2.image || defaultImage}
                                alt={smallItem2.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black/60 to-transparent">
                                <h3 className="text-lg font-semibold text-white">{smallItem2.name}</h3>
                            </div>
                        </div>
                    )}

                    <Link href="/menu" className="group relative h-64 rounded-2xl overflow-hidden bg-zinc-100 flex items-center justify-center ring-1 ring-zinc-900/5 p-6 text-center cursor-pointer hover:bg-zinc-50 transition-colors">
                        <div>
                            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Utensils className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900">Full Menu</h3>
                            <p className="text-sm text-zinc-500 mt-2">View all plates, sides &amp; drinks</p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
