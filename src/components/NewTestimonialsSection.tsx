"use client";

import { Star, Quote, X, Loader2, Plus, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
    _id: string;
    name: string;
    roleOrLocation?: string;
    quote: string;
    rating?: number;
    source?: string;
    avatar?: string;
    date?: string;
}

interface NewTestimonialsSectionProps {
    testimonials?: Testimonial[];
}

export function NewTestimonialsSection({ testimonials = [] }: NewTestimonialsSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        rating: 5,
        quote: ''
    });

    // Carousel State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // If no testimonials, use fallbacks matching the design for preview
    const displayTestimonials = testimonials.length > 0 ? testimonials.slice(0, 3) : [
        {
            _id: "1",
            name: "Leilani K.",
            roleOrLocation: "Local Guide",
            quote: "The Kalua Pork is smokey, tender, and absolutely perfect. It reminds me of the lunch wagons back home on the North Shore. A true gem in Utah Valley.",
            rating: 5
        },
        {
            _id: "2",
            name: "Marcus T.",
            roleOrLocation: "Food Blogger",
            quote: "Best Malasadas in the valley, hands down. Get them while they're hot! We stop by every Friday just for the bakery treats.",
            rating: 4.5
        },
        {
            _id: "3",
            name: "Sarah Jenkins",
            roleOrLocation: "Event Coordinator",
            quote: "We hired Mauka Grill for our corporate summer luau and they crushed it. The team was professional and the food quantity was generous.",
            rating: 5
        },
        {
            _id: "4",
            name: "David Chen",
            roleOrLocation: "Orem Resident",
            quote: "Authentic flavors that take me back to Maui. The macaroni salad is legit!",
            rating: 5
        }
    ];

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused || displayTestimonials.length <= 1) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isPaused, displayTestimonials.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
    };

    // Calculate visible items for carousel mode (3 items logic)
    const getVisibleItems = () => {
        const items = [];
        // Always return 3 items for the grid structure, handling loop
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % displayTestimonials.length;
            items.push(displayTestimonials[index]);
        }
        return items;
    };

    const visibleItems = getVisibleItems();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit');

            setSubmitStatus('success');
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitStatus('idle');
                setFormData({ name: '', location: '', rating: 5, quote: '' });
            }, 2000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="testimonials" className="py-12 md:py-20 bg-buddas-cream relative">
            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 px-2">
                    <div className="space-y-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buddas-gold/10 text-buddas-gold-dark text-xs font-bold uppercase tracking-widest border border-buddas-gold/20 font-dm-sans">
                            Community Love
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold text-buddas-brown leading-[0.9] tracking-tight">
                            Talk of the Town
                        </h2>
                        <p className="text-buddas-brown/70 font-dm-sans text-lg">See what our locals are saying.</p>
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex gap-2 hidden md:flex">
                        <button
                            onClick={prevSlide}
                            className="size-12 rounded-full border border-buddas-brown/10 bg-transparent hover:bg-buddas-brown/5 flex items-center justify-center transition-colors shadow-sm text-buddas-brown active:scale-95"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="size-12 rounded-full bg-buddas-teal text-white hover:bg-buddas-teal-light flex items-center justify-center transition-colors shadow-lg active:scale-95"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Write Review Button */}
                <div className="flex justify-end mb-8 px-2">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-buddas-teal hover:text-white transition-colors border border-buddas-teal bg-transparent hover:bg-buddas-teal px-4 py-2 rounded-lg font-dm-sans"
                    >
                        <Plus className="w-4 h-4" />
                        Write a Review
                    </button>
                </div>

                {/* Review Grid (Carousel Mode) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-10">
                    {visibleItems.map((item, idx) => (
                        // Add index to key to handle duplicate items in infinite loop cleanly
                        <div key={`${item._id}-${idx}`} className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <TestimonialCard item={item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Write Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-buddas-brown/90 animate-in fade-in duration-200 font-dm-sans">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                            <h3 className="text-xl font-semibold text-buddas-brown font-poppins">Write a Review</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-400 hover:text-buddas-brown transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {submitStatus === 'success' ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-semibold text-buddas-brown mb-2 font-poppins">Mahalo!</h4>
                                <p className="text-buddas-brown/70">Your review has been submitted for approval.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-buddas-brown mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-buddas-teal/20 focus:border-buddas-teal transition-all text-buddas-brown"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-buddas-brown mb-1">Role or Location (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-buddas-teal/20 focus:border-buddas-teal transition-all text-buddas-brown"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="e.g. Local Guide"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-buddas-brown mb-1">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${formData.rating >= star ? 'fill-buddas-gold text-buddas-gold' : 'text-zinc-300'}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-buddas-brown mb-1">Your Review</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-buddas-teal/20 focus:border-buddas-teal transition-all resize-none text-buddas-brown"
                                        value={formData.quote}
                                        onChange={e => setFormData({ ...formData, quote: e.target.value })}
                                        placeholder="Tell us about your experience..."
                                    />
                                </div>

                                {submitStatus === 'error' && (
                                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-buddas-teal hover:bg-buddas-teal-dark text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit Review"
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

function TestimonialCard({ item }: { item: Testimonial }) {
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

    // Check if quote is long enough to truncate (approx 150 chars)
    const isLong = item.quote.length > 150;
    const displayQuote = isLong ? item.quote.substring(0, 150) + "..." : item.quote;

    return (
        <>
            <div className="bg-white rounded-3xl p-8 border border-buddas-brown/5 relative group hover:border-buddas-gold/40 hover:shadow-lg hover:shadow-buddas-gold/10 transition-all duration-300 flex flex-col h-full font-dm-sans">
                <div className="absolute top-8 right-8 text-buddas-gold/20 group-hover:text-buddas-gold/40 transition-colors">
                    <Quote className="w-12 h-12 fill-current opacity-100" />
                </div>
                <div className="flex gap-1 text-buddas-gold mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(item.rating || 5) ? 'fill-current' : 'text-buddas-gold/30'}`}
                        />
                    ))}
                </div>
                <div className="relative z-10 flex-grow mb-6">
                    <p className="text-buddas-brown text-lg leading-relaxed">
                        "{displayQuote}"
                    </p>
                    {isLong && (
                        <button
                            onClick={() => setIsReadMoreOpen(true)}
                            className="mt-2 text-sm font-medium text-buddas-teal hover:text-buddas-teal-dark underline underline-offset-2 decoration-buddas-teal/30 hover:decoration-buddas-teal transition-all"
                        >
                            Read full review
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-buddas-brown/5">
                    {/* Avatar if exists */}
                    {item.avatar && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                        </div>
                    )}
                    <div>
                        <div className="font-bold text-buddas-brown">{item.name}</div>
                        <div className="text-xs text-buddas-brown/60 uppercase tracking-wide font-medium">{item.roleOrLocation || "Verified Review"}</div>
                    </div>
                </div>
            </div>

            {/* Read More Modal */}
            {isReadMoreOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-buddas-brown/90 animate-in fade-in duration-200 font-dm-sans">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 relative">
                        <button
                            onClick={() => setIsReadMoreOpen(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-buddas-brown transition-colors p-2 bg-zinc-50 hover:bg-zinc-100 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8 md:p-10">
                            <div className="flex gap-1 text-buddas-gold mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-6 h-6 ${i < Math.floor(item.rating || 5) ? 'fill-current' : 'text-buddas-gold/30'}`}
                                    />
                                ))}
                            </div>

                            <Quote className="w-10 h-10 text-buddas-gold/40 fill-current mb-4" />

                            <p className="text-buddas-brown text-xl leading-relaxed mb-8">
                                "{item.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                {item.avatar && (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                                    </div>
                                )}
                                <div>
                                    <div className="font-bold text-buddas-brown text-lg">{item.name}</div>
                                    <div className="text-sm text-buddas-brown/60 uppercase tracking-wide">{item.roleOrLocation || "Verified Review"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
