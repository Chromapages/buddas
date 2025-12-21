"use client";

import { usePathname } from "next/navigation";
import { NewNavbar } from "@/components/NewNavbar";
import { KeyInfoStrip } from "@/components/KeyInfoStrip";

interface ConditionalHeaderProps {
    logoUrl?: string;
    orderUrl?: string;
    ctaStyle?: string;
    navigation?: any[];
    socialLinks?: any[];
    contactInfo?: {
        phone?: string;
        email?: string;
    };
    locations?: any[];
}

export function ConditionalHeader({ logoUrl, orderUrl, ctaStyle, navigation, socialLinks, contactInfo, locations }: ConditionalHeaderProps) {
    const pathname = usePathname();

    // Don't render header on Sanity Studio pages
    if (pathname?.startsWith("/studio")) {
        return null;
    }

    return (
        <div className="flex flex-col w-full">
            <KeyInfoStrip
                primaryPhone={contactInfo?.phone}
                locations={locations}
            />
            <NewNavbar
                logoUrl={logoUrl}
                orderUrl={orderUrl}
                ctaStyle={ctaStyle}
                navigation={navigation}
            />
            {/* Footer should be here if we want it to be conditional too */}
        </div>
    );
}
