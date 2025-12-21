"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Calendar, Users, HelpCircle } from "lucide-react";

interface FormErrors {
    firstName?: string;
    email?: string;
    date?: string;
    guestCount?: string;
    eventType?: string;
    message?: string;
}

export function EventInquiryForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = (formData: FormData): FormErrors => {
        const newErrors: FormErrors = {};
        const email = formData.get("email") as string;
        const firstName = formData.get("firstName") as string;
        const date = formData.get("date") as string;
        const guestCount = formData.get("guestCount") as string;

        if (!firstName?.trim()) newErrors.firstName = "Name is required";
        if (!email?.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email address";
        }
        if (!date?.trim()) newErrors.date = "Date is required";
        if (!guestCount?.trim()) newErrors.guestCount = "Guest count is required";

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
            setTouched({
                firstName: true,
                email: true,
                date: true,
                guestCount: true,
                eventType: true,
                message: true,
            });
            setIsSubmitting(false);
            return;
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    if (submitted) {
        return (
            <div className="bg-buddas-teal/5 border border-buddas-teal rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-buddas-teal text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🎉</div>
                <h3 className="text-2xl font-semibold text-buddas-brown mb-4 font-poppins">Mahalo! Request Received.</h3>
                <p className="text-buddas-brown/80 text-lg max-w-md mx-auto">
                    We've received your inquiry and will be in touch within 24 hours to confirm availability and discuss your menu.
                </p>
                <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-8 border-buddas-teal text-buddas-teal hover:bg-buddas-teal hover:text-white transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                    Submit Another Request
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-buddas-brown/10">
            <div className="mb-10 text-center">
                <h3 className="text-2xl font-semibold text-buddas-brown font-poppins mb-2">Check Availability</h3>
                <p className="text-buddas-brown/60 text-sm">Tell us a bit about your event.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-buddas-brown uppercase tracking-widest">Name</label>
                        <input
                            name="firstName"
                            type="text"
                            placeholder="Your Name"
                            className={cn(
                                "w-full bg-white border border-buddas-brown/20 rounded-lg px-4 py-3 text-buddas-brown outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                                "focus:border-buddas-teal focus:ring-1 focus:ring-buddas-teal",
                                errors.firstName && touched.firstName && "border-buddas-orange focus:border-buddas-orange"
                            )}
                            onBlur={() => handleBlur("firstName")}
                        />
                        {errors.firstName && touched.firstName && <p className="text-buddas-orange text-xs">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-buddas-brown uppercase tracking-widest">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className={cn(
                                "w-full bg-white border border-buddas-brown/20 rounded-lg px-4 py-3 text-buddas-brown outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                                "focus:border-buddas-teal focus:ring-1 focus:ring-buddas-teal",
                                errors.email && touched.email && "border-buddas-orange focus:border-buddas-orange"
                            )}
                            onBlur={() => handleBlur("email")}
                        />
                        {errors.email && touched.email && <p className="text-buddas-orange text-xs">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-buddas-brown uppercase tracking-widest flex items-center gap-2">
                            <Calendar className="w-3 h-3" /> Event Date
                        </label>
                        <input
                            name="date"
                            type="date"
                            className={cn(
                                "w-full bg-white border border-buddas-brown/20 rounded-lg px-4 py-3 text-buddas-brown outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                                "focus:border-buddas-teal focus:ring-1 focus:ring-buddas-teal",
                                errors.date && touched.date && "border-buddas-orange focus:border-buddas-orange"
                            )}
                            onBlur={() => handleBlur("date")}
                        />
                        {errors.date && touched.date && <p className="text-buddas-orange text-xs">{errors.date}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-buddas-brown uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-3 h-3" /> Guest Count
                        </label>
                        <select
                            name="guestCount"
                            className={cn(
                                "w-full bg-white border border-buddas-brown/20 rounded-lg px-4 py-3 text-buddas-brown outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] appearance-none",
                                "focus:border-buddas-teal focus:ring-1 focus:ring-buddas-teal",
                                errors.guestCount && touched.guestCount && "border-buddas-orange focus:border-buddas-orange"
                            )}
                            onBlur={() => handleBlur("guestCount")}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Count</option>
                            <option value="10-30">10-30 People</option>
                            <option value="30-50">30-50 People</option>
                            <option value="50-100">50-100 People</option>
                            <option value="100+">100+ People</option>
                        </select>
                        {errors.guestCount && touched.guestCount && <p className="text-buddas-orange text-xs">{errors.guestCount}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-medium text-buddas-brown uppercase tracking-widest">Event Type</label>
                    <select
                        name="eventType"
                        className="w-full bg-white border border-buddas-brown/20 rounded-lg px-4 py-3 text-buddas-brown outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] focus:border-buddas-teal focus:ring-1 focus:ring-buddas-teal"
                    >
                        <option value="Catering">General Catering</option>
                        <option value="Benefit Night">Benefit Night (Fundraiser)</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Corporate">Corporate Event</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-medium text-buddas-brown uppercase tracking-widest">Message (Optional)</label>
                    <textarea
                        name="message"
                        rows={3}
                        placeholder="Any special requests or details..."
                        className="w-full bg-white border border-buddas-brown/20 rounded-lg px-4 py-3 text-buddas-brown outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] focus:border-buddas-teal focus:ring-1 focus:ring-buddas-teal resize-none"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-buddas-teal text-white hover:bg-buddas-teal-dark font-bold text-lg rounded-lg shadow-lg shadow-buddas-teal/30 hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] uppercase tracking-wide"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Checking Calendar...
                        </>
                    ) : (
                        "Request Information"
                    )}
                </Button>
            </form >
        </div >
    );
}
