import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { Footer } from "@/components/Footer";
import { AboutClient } from "@/components/about/AboutClient";

export const revalidate = 60;

export default async function AboutPage() {
    const pageData = await client.fetch(ABOUT_PAGE_QUERY);

    if (!pageData) {
        return (
            <div className="min-h-screen flex flex-col bg-buddas-cream font-body">
                <main className="flex-1 flex items-center justify-center p-8 text-center">
                    <div>
                        <h1 className="text-2xl font-bold text-buddas-brown mb-4">About Us Coming Soon</h1>
                        <p className="text-buddas-brown/80">We are currently updating our story. Please check back later!</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-white font-sans">
            <main>
                <AboutClient data={pageData} />
            </main>
            <Footer />
        </div>
    );
}
