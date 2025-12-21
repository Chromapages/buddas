import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Music, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
    logoUrl?: string;
    navigation?: { label: string; url: string }[];
    socialLinks?: { platform: string; url: string }[];
    primaryPhone?: string;
    primaryEmail?: string;
}

export function Footer({
    logoUrl,
    navigation = [],
    socialLinks = [],
    primaryPhone,
    primaryEmail
}: FooterProps) {
    const defaultNav = [
        { label: "Menu", url: "/menu" },
        { label: "Locations", url: "/locations" },
        { label: "Our Story", url: "/about" },
        { label: "Catering", url: "/catering" },
    ];

    const displayNav = navigation.length > 0 ? navigation : defaultNav;

    // Helper to get icon for platform
    const getSocialIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes('instagram')) return <Instagram className="w-5 h-5" />;
        if (p.includes('facebook')) return <Facebook className="w-5 h-5" />;
        if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-5 h-5" />;
        if (p.includes('youtube')) return <Youtube className="w-5 h-5" />;
        if (p.includes('tiktok')) return <Music className="w-5 h-5" />;
        return <ExternalLinkIcon />;
    };

    const ExternalLinkIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );

    return (
        <footer className="bg-buddas-brown-dark text-buddas-cream pt-16 pb-12 border-t border-buddas-cream/10 font-dm-sans">
            <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                {/* Desktop Footer Content (Hidden on Mobile) */}
                <div className="hidden lg:grid grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            {logoUrl ? (
                                <div className="relative h-20 w-40">
                                    <Image
                                        src={logoUrl}
                                        alt="Buddas Hawaiian"
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                            ) : (
                                <span className="font-display text-3xl tracking-tight text-white font-poppins font-bold">
                                    Buddas
                                </span>
                            )}
                        </Link>
                        <p className="text-buddas-cream/70 text-sm leading-relaxed max-w-xs">
                            Bringing the warmth of island-inspired comfort food to your table. Fast, consistent, and always made with Aloha.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 pt-2">
                            {primaryPhone && (
                                <a href={`tel:${primaryPhone}`} className="flex items-center gap-3 text-sm hover:text-buddas-gold transition-colors group">
                                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span>{primaryPhone}</span>
                                </a>
                            )}
                            {primaryEmail && (
                                <a href={`mailto:${primaryEmail}`} className="flex items-center gap-3 text-sm hover:text-buddas-gold transition-colors group">
                                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span>{primaryEmail}</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="col-span-2 grid grid-cols-3 gap-8">
                        {/* Main Links */}
                        <div className="space-y-4">
                            <h4 className="text-white font-poppins font-semibold tracking-wide">Explore</h4>
                            <ul className="space-y-3 text-sm text-buddas-cream/80">
                                {displayNav.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.url} className="hover:text-buddas-gold transition-colors py-1.5 block">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-white font-poppins font-semibold tracking-wide">Support</h4>
                            <ul className="space-y-3 text-sm text-buddas-cream/80">
                                <li><Link href="/contact" className="hover:text-buddas-gold transition-colors py-1.5 block">Contact Us</Link></li>
                                <li><Link href="/faq" className="hover:text-buddas-gold transition-colors py-1.5 block">FAQ</Link></li>
                                <li><Link href="/careers" className="hover:text-buddas-gold transition-colors py-1.5 block">Careers</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="space-y-4">
                            <h4 className="text-white font-poppins font-semibold tracking-wide">Legal</h4>
                            <ul className="space-y-3 text-sm text-buddas-cream/80">
                                <li><Link href="/privacy" className="hover:text-buddas-gold transition-colors py-1.5 block">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-buddas-gold transition-colors py-1.5 block">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter / Socials Column */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-white font-poppins font-semibold tracking-wide">Stay Connected</h4>
                            {/* Socials */}
                            {socialLinks.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-full bg-white/5 hover:bg-buddas-teal hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent text-buddas-cream/80"
                                            aria-label={`Follow us on ${social.platform}`}
                                        >
                                            {getSocialIcon(social.platform)}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            <Link href="/order" className="block w-full text-center bg-buddas-gold text-buddas-brown font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-buddas-teal-dark transition-colors shadow-lg shadow-black/20">
                                Order Online
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Condensed Footer (Visible only on Mobile) */}
                <div className="lg:hidden flex flex-col items-center gap-8 pb-12">
                    {/* Socials Row */}
                    {socialLinks.length > 0 && (
                        <div className="flex items-center justify-center gap-6">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-buddas-teal text-buddas-cream/80 flex items-center justify-center transition-colors border border-white/10"
                                >
                                    {getSocialIcon(social.platform)}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Quick Essential Links - Inlined with Separators */}
                    <div className="flex flex-wrap justify-center items-center gap-y-2 text-xs font-medium text-buddas-cream/50 tracking-wide">
                        <Link href="/contact" className="hover:text-white transition-colors px-3">Contact</Link>
                        <span className="text-buddas-cream/20">•</span>
                        <Link href="/faq" className="hover:text-white transition-colors px-3">FAQ</Link>
                        <span className="text-buddas-cream/20">•</span>
                        <Link href="/privacy" className="hover:text-white transition-colors px-3">Privacy</Link>
                        <span className="text-buddas-cream/20">•</span>
                        <Link href="/terms" className="hover:text-white transition-colors px-3">Terms</Link>
                    </div>

                    {/* Copyright Only */}
                    <div className="text-center">
                        <p className="text-[10px] text-white/20 tracking-widest uppercase">
                            &copy; {new Date().getFullYear()} Buddas Hawaiian.
                        </p>
                    </div>
                </div>

                {/* Desktop Copyright Bar */}
                <div className="hidden lg:flex pt-8 mt-8 border-t border-buddas-cream/10 items-center justify-between gap-4 text-xs text-buddas-cream/40">
                    <p>&copy; {new Date().getFullYear()} Buddas Hawaiian. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span>Designed with Aloha</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
