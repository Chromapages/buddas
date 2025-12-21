import Link from "next/link";
import Image from "next/image";

interface TrustedByProps {
    trustedByData?: {
        title?: string;
        platforms?: {
            name: string;
            url: string;
            logo?: string;
        }[];
    };
}

export function TrustedBy({ trustedByData }: TrustedByProps) {
    const title = trustedByData?.title || "Order Buddas on Your Favorite Apps";
    const platforms = trustedByData?.platforms || [
        { name: "Uber Eats", url: "https://www.ubereats.com" },
        { name: "DoorDash", url: "https://www.doordash.com/en/store/budda%E2%80%99s-bakery-205-e-700-s-pleasant-grove-32569829/54812346/" },
        { name: "Grubhub", url: "https://www.grubhub.com" },
        { name: "Postmates", url: "https://postmates.com" },
        { name: "SpotOn", url: "https://www.spoton.com" },
    ];

    return (
        <section className="py-8 md:py-10 lg:py-12 xl:py-16 bg-buddas-cream border-b border-buddas-brown/5">
            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
                <h2 className="text-buddas-brown font-poppins font-semibold mb-12 text-2xl lg:text-3xl tracking-[-0.01em] drop-shadow-sm">
                    {title}
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
                    {platforms.map((platform, index) => (
                        <Link
                            key={index}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105 group"
                        >
                            {platform.logo ? (
                                <div className="relative h-16 w-auto min-w-[160px]">
                                    <Image
                                        src={platform.logo}
                                        alt={platform.name || "Platform logo"}
                                        fill
                                        className="object-contain transition-all duration-300 opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                                    />
                                </div>
                            ) : (
                                <span className="text-4xl font-black tracking-tight text-buddas-brown/40 hover:text-buddas-teal transition-colors duration-300">
                                    {platform.name}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
