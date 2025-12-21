"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Plus, Info } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";

interface SignatureBentosSectionProps {
    items: any[];
}

export function SignatureBentosSection({ items }: SignatureBentosSectionProps) {
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    if (!items || items.length === 0) return null;

    // Ensure we have at least some items to show
    const featuredItems = items.slice(0, 5); // Limit to 5 for a nice bento layout (1 big, 4 small)

    return (
        <section className="py-20 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C559]/20 text-[#8B4513] text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles className="w-3 h-3 text-[#E9C559] fill-[#E9C559]" />
                            The Signature Collection
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl text-[#3A2F2B] leading-[0.9] mb-4">
                            Curated Plates.<br />
                            <span className="text-[#54BFA5]">Island Favorites.</span>
                        </h2>
                        <p className="text-[#3A2F2B]/60 font-medium text-base md:text-lg max-w-xl mx-auto">
                            Our most loved combinations, served with two scoops of rice and mac salad.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px] md:auto-rows-[280px]">
                    {featuredItems.map((item, index) => {
                        // First item spans 2 cols and 2 rows (Big Feature)
                        // Others span 1 col and 1 row
                        const isFeatured = index === 0;
                        const spanClass = isFeatured
                            ? "md:col-span-2 md:row-span-2"
                            : "md:col-span-1 md:row-span-1";

                        return (
                            <div
                                key={item._id}
                                onClick={() => setSelectedItem(item)}
                                className={cn(
                                    "group relative overflow-hidden rounded-[1.5rem] bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300",
                                    spanClass
                                )}
                            >
                                {/* Background Image */}
                                {item.image ? (
                                    <Image
                                        src={urlFor(item.image).width(isFeatured ? 1200 : 600).url()}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#54BFA5]/20 to-[#E9C559]/20" />
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between text-white">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags?.slice(0, 2).map((tag: string) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="bg-white/90 text-buddas-brown border-0 hover:bg-white text-[10px] px-2 py-0.5"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {isFeatured && (
                                                <Badge className="bg-[#E9C559] text-[#3A2F2B] hover:bg-[#E9C559]/90 border-0 text-[10px] px-2 py-0.5">
                                                    Best Seller
                                                </Badge>
                                            )}
                                        </div>

                                        <Button
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-white text-buddas-brown hover:bg-buddas-cream border-0 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <h3 className={cn(
                                                "font-display font-bold leading-tight",
                                                isFeatured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                                            )}>
                                                {item.name}
                                            </h3>
                                        </div>

                                        <div className="flex items-end justify-between gap-4">
                                            <p className={cn(
                                                "text-white/80 line-clamp-2 font-medium",
                                                isFeatured ? "text-base max-w-md" : "text-xs"
                                            )}>
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className={cn(
                                                    "font-bold text-[#E9C559]",
                                                    isFeatured ? "text-2xl" : "text-lg"
                                                )}>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Quick Add Button (Visible on Hover) */}
                                        <div className="mt-4 overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                            <div className="flex gap-2">
                                                <Button className="flex-1 bg-[#54BFA5] text-white hover:bg-[#54BFA5]/90 font-bold rounded-full h-10 text-sm">
                                                    <Plus className="w-4 h-4 mr-1.5" />
                                                    Add
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    className="bg-white text-buddas-brown hover:bg-buddas-cream font-bold rounded-full h-10 w-10 p-0 shadow-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedItem(item);
                                                    }}
                                                >
                                                    <Info className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick View Modal */}
            <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
                <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white border-none rounded-3xl shadow-2xl">
                    {selectedItem && (
                        <div className="flex flex-col md:flex-row h-full max-h-[80vh] md:max-h-none">
                            <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
                                {selectedItem.image && (
                                    <Image
                                        src={urlFor(selectedItem.image).width(800).url()}
                                        alt={selectedItem.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {selectedItem.tags?.map((tag: string) => (
                                        <Badge key={tag} className="bg-white/90 text-[#3A2F2B] border border-buddas-brown/10">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 p-6 md:p-8 flex flex-col">
                                <DialogHeader className="mb-4">
                                    <DialogTitle className="font-display text-3xl text-[#3A2F2B] mb-2">
                                        {selectedItem.name}
                                    </DialogTitle>
                                    <div className="text-2xl font-bold text-[#54BFA5]">
                                        ${selectedItem.price.toFixed(2)}
                                    </div>
                                </DialogHeader>

                                <div className="space-y-4 flex-1 overflow-y-auto">
                                    <p className="text-[#3A2F2B]/80 leading-relaxed">
                                        {selectedItem.description}
                                    </p>

                                    <div className="bg-[#FAF2D8] p-4 rounded-xl space-y-2">
                                        <h4 className="font-bold text-[#3A2F2B] text-sm uppercase tracking-wider flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[#E9C559]" />
                                            Chef's Note
                                        </h4>
                                        <p className="text-sm text-[#3A2F2B]/70">
                                            Served with our signature mac salad and two scoops of sticky rice. A true island classic.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-gray-100 flex gap-3">
                                    <Button className="flex-1 bg-[#54BFA5] text-white hover:bg-[#54BFA5]/90 rounded-full h-12 text-lg font-bold shadow-lg shadow-[#54BFA5]/20">
                                        Add to Order
                                    </Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="rounded-full h-12 px-6 border-gray-200 text-[#3A2F2B] hover:bg-gray-50">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
