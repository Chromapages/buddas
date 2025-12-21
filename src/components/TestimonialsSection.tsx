"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Plus, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Testimonial {
    _id: string;
    name: string;
    roleOrLocation?: string;
    quote: string;
    rating?: number;
    source?: string;
}

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

const BRAND_COLORS = [
    "bg-buddas-cream",
    "bg-buddas-teal/10",
    "bg-buddas-gold/20",
    "bg-buddas-orange/10",
    "bg-[#FAF2D8]", // Light cream/beige
];

// Random tilts for a playful look
const TILTS = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-0"];

function StarRating({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (rating: number) => void }) {
    const [hoverRating, setHoverRating] = React.useState(0);

    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type={interactive ? "button" : undefined}
                    className={cn(
                        "transition-all duration-300",
                        interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
                    )}
                    onClick={() => interactive && onChange?.(star)}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    disabled={!interactive}
                >
                    <Star
                        className={cn(
                            "w-4 h-4",
                            (interactive ? hoverRating || rating : rating) >= star
                                ? "fill-buddas-gold text-buddas-gold"
                                : "fill-transparent text-buddas-brown/20"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
        Autoplay({ delay: 5000, stopOnInteraction: true }),
    ]);
    const [prevBtnEnabled, setPrevBtnEnabled] = React.useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
    const [newRating, setNewRating] = React.useState(5);
    const [selectedTestimonial, setSelectedTestimonial] = React.useState<Testimonial | null>(null);

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            name: formData.get("name"),
            location: formData.get("location"),
            quote: formData.get("review"),
            rating: newRating,
        };

        try {
            const response = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to submit");
            }

            alert("Thanks for your feedback! We'll review it shortly.");
            // Optional: Close dialog here if we had access to the open state setter from outside, 
            // but since it's uncontrolled or local, we might just reset the form.
            (e.target as HTMLFormElement).reset();
            setNewRating(5);
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                    <div className="animate-fade-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buddas-dark text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-buddas-gold/20">
                            <Star className="w-3 h-3 text-buddas-gold fill-buddas-gold animate-pulse" />
                            Ratings & Reviews
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl text-buddas-brown">
                            Real Stories. Real People. Real Aloha.
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 animate-fade-up [animation-delay:200ms]">
                        {/* Navigation Buttons */}
                        <div className="hidden md:flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full border-buddas-brown/10 hover:bg-buddas-cream hover:text-buddas-brown"
                                onClick={scrollPrev}
                                disabled={!prevBtnEnabled}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full border-buddas-brown/10 hover:bg-buddas-cream hover:text-buddas-brown"
                                onClick={scrollNext}
                                disabled={!nextBtnEnabled}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-[#1C5F56] text-white hover:bg-[#1C5F56]/90 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Your Story
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Share Your Experience</DialogTitle>
                                    <DialogDescription>
                                        We'd love to hear about your visit to Buddas.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Rating</Label>
                                        <StarRating rating={newRating} interactive onChange={setNewRating} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" placeholder="Your name" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="location">Location (Optional)</Label>
                                        <Input id="location" name="location" placeholder="e.g. Honolulu, HI" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="review">Review</Label>
                                        <Textarea
                                            id="review"
                                            name="review"
                                            placeholder="Tell us about your experience..."
                                            className="min-h-[100px]"
                                            required
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="bg-buddas-primary text-white" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : "Submit Review"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="relative -mx-4 px-4 md:mx-0 md:px-0 animate-fade-up [animation-delay:400ms]">
                    <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                        <div className="flex gap-6 touch-pan-y">
                            {testimonials.map((testimonial, index) => {
                                const colorClass = BRAND_COLORS[index % BRAND_COLORS.length];
                                const tiltClass = TILTS[index % TILTS.length];

                                return (
                                    <div
                                        key={testimonial._id}
                                        className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4 first:pl-0"
                                    >
                                        <div
                                            onClick={() => setSelectedTestimonial(testimonial)}
                                            className={cn(
                                                colorClass,
                                                tiltClass,
                                                "p-6 rounded-[2rem] h-full flex flex-col justify-between min-h-[240px] transition-all duration-300 hover:rotate-0 hover:-translate-y-2 hover:shadow-xl cursor-pointer group"
                                            )}
                                        >
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-buddas-brown">
                                                            {testimonial.name}
                                                        </h3>
                                                        {testimonial.roleOrLocation && (
                                                            <p className="text-sm font-medium text-buddas-brown/60">
                                                                {testimonial.roleOrLocation}
                                                            </p>
                                                        )}
                                                        {testimonial.source && (
                                                            <p className="text-xs font-bold text-buddas-brown/40 mt-1 uppercase tracking-wider">
                                                                Via {testimonial.source}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <StarRating rating={testimonial.rating || 5} />
                                                </div>

                                                <p className="text-buddas-brown/80 font-medium leading-relaxed line-clamp-4">
                                                    "{testimonial.quote}"
                                                </p>
                                            </div>

                                            <div className="flex justify-end mt-4">
                                                <Quote className="w-6 h-6 text-buddas-brown/20 rotate-180 group-hover:text-buddas-brown/30 transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                    index === selectedIndex
                                        ? "bg-buddas-primary w-8"
                                        : "bg-buddas-brown/20 hover:bg-buddas-brown/40"
                                )}
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* View Testimonial Modal */}
            <Dialog open={!!selectedTestimonial} onOpenChange={(open) => !open && setSelectedTestimonial(null)}>
                <DialogContent className="sm:max-w-[600px] bg-white border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
                    {selectedTestimonial && (
                        <div className={cn(
                            BRAND_COLORS[testimonials.findIndex(t => t._id === selectedTestimonial._id) % BRAND_COLORS.length],
                            "p-8 sm:p-12 flex flex-col gap-8"
                        )}>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-display text-3xl text-buddas-brown mb-1">
                                        {selectedTestimonial.name}
                                    </h3>
                                    {selectedTestimonial.roleOrLocation && (
                                        <p className="text-lg font-medium text-buddas-brown/60">
                                            {selectedTestimonial.roleOrLocation}
                                        </p>
                                    )}
                                    {selectedTestimonial.source && (
                                        <p className="text-sm font-bold text-buddas-brown/40 mt-2 uppercase tracking-wider">
                                            Verified Review via {selectedTestimonial.source}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-white px-4 py-2 rounded-full border border-buddas-brown/5">
                                    <StarRating rating={selectedTestimonial.rating || 5} />
                                </div>
                            </div>

                            <div className="relative">
                                <Quote className="absolute -top-4 -left-6 w-12 h-12 text-buddas-brown/10 -scale-x-100" />
                                <p className="text-xl md:text-2xl text-buddas-brown/90 font-medium leading-relaxed relative z-10">
                                    "{selectedTestimonial.quote}"
                                </p>
                                <Quote className="absolute -bottom-4 -right-2 w-12 h-12 text-buddas-brown/10" />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedTestimonial(null)}
                                    className="text-buddas-brown hover:bg-buddas-brown/5 rounded-full"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
