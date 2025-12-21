import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Location {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    mapUrl?: string;
    hours?: Array<{ dayOfWeek: string; openTime: string; closeTime: string; isClosed?: boolean }>;
}

interface NewContactSectionProps {
    location?: Location;
}

export function NewContactSection({ location }: NewContactSectionProps) {
    // Use Sanity data or fallbacks
    const address = location ? `${location.addressLine1}${location.addressLine2 ? ', ' + location.addressLine2 : ''}` : "123 State Street, Suite 400";
    const cityStateZip = location ? `${location.city}, ${location.state} ${location.zip}` : "Pleasant Grove, UT 84062";
    const phone = location?.phone || "(801) 555-0123";
    const mapUrl = location?.mapUrl || "#";

    // Get today's hours from location.hours array
    const getTodayHours = () => {
        if (!location?.hours || location.hours.length === 0) {
            return { label: "Hours", times: "Call for hours" };
        }

        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const shortDays: Record<string, string> = {
            monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
            friday: "Fri", saturday: "Sat", sunday: "Sun"
        };

        const now = new Date();
        const currentDay = days[now.getDay()];
        const todayEntry = location.hours.find(h => h.dayOfWeek?.toLowerCase() === currentDay);

        if (!todayEntry) {
            return { label: "Today", times: "Call for hours" };
        }

        const dayLabel = shortDays[todayEntry.dayOfWeek] || "Today";
        if (todayEntry.isClosed) {
            return { label: dayLabel, times: "Closed" };
        }
        return { label: dayLabel, times: `${todayEntry.openTime} - ${todayEntry.closeTime}` };
    };

    const todayHours = getTodayHours();

    return (
        <section id="contact" className="py-12 px-6">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                {/* Info */}
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-6">Visit Us</h3>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-zinc-700" />
                            </div>
                            <div>
                                <p className="font-medium text-zinc-900">Pleasant Grove, UT</p>
                                <p className="text-zinc-500 text-sm">
                                    {address}<br />
                                    {cityStateZip}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-zinc-700" />
                            </div>
                            <div>
                                <p className="font-medium text-zinc-900">Today&apos;s Hours</p>
                                <p className="text-zinc-500 text-sm">
                                    {todayHours.label}: {todayHours.times}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-zinc-700" />
                            </div>
                            <div>
                                <p className="font-medium text-zinc-900">Contact</p>
                                <p className="text-zinc-500 text-sm">
                                    {phone}<br />
                                    aloha@buddas.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual / Map Placeholder */}
                <div className="bg-zinc-100 md:w-1/2 relative min-h-[300px]">
                    <Image
                        src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80"
                        alt="Map Location"
                        fill
                        className="object-cover grayscale opacity-50 hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Link
                            href={mapUrl}
                            target="_blank"
                            className="bg-white text-zinc-900 px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-transform border border-zinc-100"
                        >
                            Get Directions
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
