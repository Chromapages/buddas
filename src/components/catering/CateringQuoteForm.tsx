"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Calendar, Users, FileText, CheckCircle } from "lucide-react";

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    eventType?: string;
    guestCount?: string;
    eventDate?: string;
    message?: string;
}

export function CateringQuoteForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validate = (formData: FormData): FormErrors => {
        const newErrors: FormErrors = {};
        const email = formData.get("email") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const phone = formData.get("phone") as string;
        const eventType = formData.get("eventType") as string;
        const guestCount = formData.get("guestCount") as string;
        const eventDate = formData.get("eventDate") as string;

        if (!firstName?.trim()) newErrors.firstName = "First name is required";
        if (!lastName?.trim()) newErrors.lastName = "Last name is required";

        if (!email?.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!phone?.trim()) {
            newErrors.phone = "Phone number is required";
        }

        if (!eventType || eventType === "") newErrors.eventType = "Please select an event type";

        if (!guestCount) {
            newErrors.guestCount = "Guest count is required";
        } else if (parseInt(guestCount) < 10) {
            newErrors.guestCount = "Minimum 10 guests required";
        }

        if (!eventDate) newErrors.eventDate = "Event date is required";

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const newErrors = validate(formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const allTouched: Record<string, boolean> = {};
            formData.forEach((_, key) => { allTouched[key] = true; });
            setTouched(allTouched);
            setIsSubmitting(false);
            return;
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    if (isSuccess) {
        return (
            <div className="bg-white rounded-xl p-8 border border-buddas-brown/10 text-center shadow-lg animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-buddas-teal/10 rounded-full flex items-center justify-center mx-auto mb-6 text-buddas-teal">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-buddas-brown font-poppins mb-4">Mahalo! Request Received.</h3>
                <p className="text-buddas-brown/70 font-dm-sans mb-8">
                    We've received your catering inquiry. Our team will review your details and get back to you within 24 hours with a custom quote.
                </p>
                <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="border-buddas-teal text-buddas-teal hover:bg-buddas-teal/5 uppercase tracking-wide font-bold"
                >
                    Send Another Request
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-buddas-brown uppercase tracking-wide font-dm-sans">
                        First Name <span className="text-buddas-orange">*</span>
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="e.g. Kai"
                        className={cn(
                            "w-full bg-white border border-buddas-brown/20 rounded-lg px-5 py-4 text-base text-buddas-brown placeholder-buddas-brown/30 outline-none transition-all duration-200 font-dm-sans",
                            "focus:border-buddas-teal focus:border-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(84,191,165,0.1)]",
                            errors.firstName && touched.firstName && "border-buddas-orange focus:border-buddas-orange"
                        )}
                        onBlur={() => handleBlur("firstName")}
                    />
                    {errors.firstName && touched.firstName && (
                        <p className="text-buddas-orange text-xs font-medium animate-in slide-in-from-top-1">{errors.firstName}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-buddas-brown uppercase tracking-wide font-dm-sans">
                        Last Name <span className="text-buddas-orange">*</span>
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="e.g. Loa"
                        className={cn(
                            "w-full bg-white border border-buddas-brown/20 rounded-lg px-5 py-4 text-base text-buddas-brown placeholder-buddas-brown/30 outline-none transition-all duration-200 font-dm-sans",
                            "focus:border-buddas-teal focus:border-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(84,191,165,0.1)]",
                            errors.lastName && touched.lastName && "border-buddas-orange focus:border-buddas-orange"
                        )}
                        onBlur={() => handleBlur("lastName")}
                    />
                    {errors.lastName && touched.lastName && (
                        <p className="text-buddas-orange text-xs font-medium animate-in slide-in-from-top-1">{errors.lastName}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-buddas-brown uppercase tracking-wide font-dm-sans">
                        Email Address <span className="text-buddas-orange">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="kai@example.com"
                        className={cn(
                            "w-full bg-white border border-buddas-brown/20 rounded-lg px-5 py-4 text-base text-buddas-brown placeholder-buddas-brown/30 outline-none transition-all duration-200 font-dm-sans",
                            "focus:border-buddas-teal focus:border-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(84,191,165,0.1)]",
                            errors.email && touched.email && "border-buddas-orange focus:border-buddas-orange"
                        )}
                        onBlur={() => handleBlur("email")}
                    />
                    {errors.email && touched.email && (
                        <p className="text-buddas-orange text-xs font-medium animate-in slide-in-from-top-1">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-buddas-brown uppercase tracking-wide font-dm-sans">
                        Phone Number <span className="text-buddas-orange">*</span>
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(808) 555-0123"
                        className={cn(
                            "w-full bg-white border border-buddas-brown/20 rounded-lg px-5 py-4 text-base text-buddas-brown placeholder-buddas-brown/30 outline-none transition-all duration-200 font-dm-sans",
                            "focus:border-buddas-teal focus:border-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(84,191,165,0.1)]",
                            errors.phone && touched.phone && "border-buddas-orange focus:border-buddas-orange"
                        )}
                        onBlur={() => handleBlur("phone")}
                    />
                    {errors.phone && touched.phone && (
                        <p className="text-buddas-orange text-xs font-medium animate-in slide-in-from-top-1">{errors.phone}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="eventType" className="block text-sm font-medium text-buddas-brown uppercase tracking-wide font-dm-sans">
                        Event Type <span className="text-buddas-orange">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="eventType"
                            name="eventType"
                            defaultValue=""
                            className={cn(
                                "w-full bg-white border border-buddas-brown/20 rounded-lg px-5 py-4 text-base text-buddas-brown placeholder-buddas-brown/30 outline-none transition-all duration-200 font-dm-sans appearance-none cursor-pointer",
                                "focus:border-buddas-teal focus:border-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(84,191,165,0.1)]",
                                errors.eventType && touched.eventType && "border-buddas-orange focus:border-buddas-orange"
                            )}
                            onBlur={() => handleBlur("eventType")}
                        >
                            <option value="" disabled>Select event type...</option>
                            <option value="Corporate Lunch">Corporate Lunch</option>
                            <option value="Wedding / Rehearsal">Wedding / Rehearsal</option>
                            <option value="Private Party">Private Party</option>
                            <option value="Community Event">Community Event</option>
                            <option value="Other">Other</option>
                        </select>
                        <FileText className="absolute right-5 top-1/2 -translate-y-1/2 text-buddas-brown/40 w-5 h-5 pointer-events-none" />
                    </div>
                    {errors.eventType && touched.eventType && (
                        <p className="text-buddas-orange text-xs font-medium animate-in slide-in-from-top-1">{errors.eventType}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="guestCount" className="block text-sm font-medium text-buddas-brown uppercase tracking-wide font-dm-sans">
                        Est. Guest Count <span className="text-buddas-orange">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="guestCount"
                            name="guestCount"
                            type="number"
                            min="10"
                            placeholder="Min 10"
                            className={cn(
                                "w-full bg-white border border-buddas-brown/20 rounded-lg px-5 py-4 text-base text-buddas-brown placeholder-buddas-brown/30 outline-none transition-all duration-200 font-dm-sans",
                                "focus:border-buddas-teal focus:border-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(84,191,165,0.1)]",
                                errors.guestCount && touched.guestCount && "border-buddas-orange focus:border-buddas-orange"
                            )}
                            onBlur={() => handleBlur("guestCount")}
                        />
                        <Users className="absolute right-5 top-1/2 -translate-y-1/2 text-buddas-brown/40 w-5 h-5" />
                    </div>
                    {errors.guestCount && touched.guestCount && (
                        <p className="text-buddas-orange text-xs font-medium animate-in slide-in-from-top-1">{errors.guestCount}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="eventDate" className="block text-sm font-medium text-buddas-brown uppercase tracking-wide font-dm-sans">
                    Event Date <span className="text-buddas-orange">*</span>
                </label>
                <div className="relative">
                    <input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        className={cn(
                            "w-full bg-white border border-buddas-brown/20 rounded-lg px-5 py-4 text-base text-buddas-brown placeholder-buddas-brown/30 outline-none transition-all duration-200 font-dm-sans",
                            "focus:border-buddas-teal focus:border-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(84,191,165,0.1)]",
                            errors.eventDate && touched.eventDate && "border-buddas-orange focus:border-buddas-orange"
                        )}
                        onBlur={() => handleBlur("eventDate")}
                    />
                    {/* Calendar icon might overlap with native date picker on some browsers, so we might skip it or position carefully. 
                        Native date pickers usually have their own indicator. */}
                </div>
                {errors.eventDate && touched.eventDate && (
                    <p className="text-buddas-orange text-xs font-medium animate-in slide-in-from-top-1">{errors.eventDate}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-buddas-brown uppercase tracking-wide font-dm-sans">
                    Additional Details / Dietary Requests
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your event, favorite menu items, or any potential allergies..."
                    className={cn(
                        "w-full bg-white border border-buddas-brown/20 rounded-lg px-5 py-4 text-base text-buddas-brown placeholder-buddas-brown/30 outline-none transition-all duration-200 resize-none font-dm-sans",
                        "focus:border-buddas-teal focus:border-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(84,191,165,0.1)]"
                    )}
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-buddas-teal text-white hover:bg-buddas-teal-dark font-bold font-poppins text-lg rounded-xl shadow-[0_4px_0_0_#1C5F56,0_8px_20px_-4px_rgba(28,95,86,0.4)] hover:translate-y-[-2px] hover:shadow-[0_6px_0_0_#1C5F56,0_12px_24px_-4px_rgba(28,95,86,0.5)] active:translate-y-1 active:shadow-[0_0_0_0_#1C5F56,inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] uppercase tracking-wider"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Quote...
                    </>
                ) : (
                    "Request Custom Quote"
                )}
            </Button>
            <p className="text-center text-buddas-brown/60 text-xs font-dm-sans">
                No payment required to request a quote. We'll verify availability first.
            </p>
        </form>
    );
}
