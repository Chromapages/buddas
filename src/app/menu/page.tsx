import { client } from "@/sanity/lib/client";
import { MENU_PAGE_QUERY } from "@/sanity/lib/queries";
import { Footer } from "@/components/Footer";
// import { AccessibleMenuToggle } from "@/components/AccessibleMenuToggle"; // Removed per request
import { MenuClient } from "@/components/menu/MenuClient";

export const revalidate = 60;

export default async function MenuPage() {
    const data = await client.fetch(MENU_PAGE_QUERY);
    const { categories = [], featuredItems = [], page } = data || {};

    return (
        <div className="min-h-screen flex flex-col bg-white font-body text-zinc-900">
            {/* Main Content handled by Client Component */}
            <MenuClient categories={categories} featuredItems={featuredItems} pageSettings={page} />

            <Footer />
        </div>
    );
}
