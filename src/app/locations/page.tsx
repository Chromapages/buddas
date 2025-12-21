import { client } from "@/sanity/lib/client";
import { LOCATIONS_PAGE_QUERY } from "@/sanity/lib/queries";
import { Footer } from "@/components/Footer";
import { LocationCard } from "@/components/LocationCard";

export const revalidate = 60;

export default async function LocationsPage() {
    const locationsData = await client.fetch(LOCATIONS_PAGE_QUERY);
    const locations = Array.isArray(locationsData) ? locationsData : [];

    return (
        <div className="min-h-screen flex flex-col bg-buddas-cream font-body">

            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="font-display text-4xl md:text-5xl text-buddas-brown mb-4">
                            Locations
                        </h1>
                        <p className="text-buddas-brown/70 max-w-2xl mx-auto">
                            Find your nearest Buddas Hawaiian Bakery & Grill.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {locations.map((location: any) => {
                            const hoursSummary = location.hours
                                ? `${location.hours[0]?.openTime} - ${location.hours[0]?.closeTime}`
                                : "Check details for hours";

                            return (
                                <LocationCard
                                    key={location._id}
                                    name={location.name}
                                    addressLine1={location.addressLine1}
                                    addressLine2={location.addressLine2}
                                    city={location.city}
                                    state={location.state}
                                    zip={location.zip}
                                    phone={location.phone}
                                    hoursSummary={hoursSummary}
                                    mapUrl={location.mapUrl}
                                    orderingUrl={location.orderingUrl}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
