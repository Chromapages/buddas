import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";
import { buildLocalBusinessJsonLd } from "@/lib/seo-utils";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Budda's Hawaiian Bakery & Grill",
  description: "Fresh Hawaiian comfort, baked daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="icon" href="/BUDDAHAWAIIANLOGO.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/BUDDAHAWAIIANLOGO.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildLocalBusinessJsonLd({
                name: "Budda's Hawaiian Bakery & Grill",
                description: "Fresh Hawaiian comfort, baked daily. Guava Chiffon Cake, Kalua Pork Plates, fresh malasadas and more.",
                openingHours: ["Mo-Su 08:00-20:00"],
              })
            ),
          }}
        />
      </head>
      <body className={`${outfit.variable} ${workSans.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
