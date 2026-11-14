import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { site, fullAddress } from "@/config/site";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileActions } from "@/components/MobileActions";
import { Analytics, Cursor, SmoothScroll } from "@/components/Chrome";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["SOFT", "opsz"] });
const dmsans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap" });

export const viewport: Viewport = { themeColor: "#14100D", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Leather Motorcycle Clothing | ${site.name} | Indian Trail NC`, template: `%s | ${site.name} | Indian Trail NC` },
  description: `${site.name} in Indian Trail, NC sells leather motorcycle jackets, vests, chaps, boots, gloves, helmets, bags and accessories. ${site.claims.line}`,
  openGraph: { type: "website", siteName: site.name, locale: "en_US", images: [{ url: "/images/site/hero-jackets-rack.webp", width: 2000, height: 1333, alt: "Rows of leather jackets" }] },
  alternates: { canonical: "./" },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/site/hero-jackets-rack.webp`,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.state, postalCode: site.address.zip, addressCountry: "US" },
  description: `Leather motorcycle clothing and accessories. ${site.claims.line}`,
  sameAs: [site.facebook],
  hasMap: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmsans.variable}`}>
      <body>
        <a href="#main" className="fixed left-4 top-[-80px] z-[100] rounded-full bg-copper px-5 py-3 font-semibold text-white focus:top-4">
          Skip to content
        </a>
        <CartProvider>
          <SmoothScroll />
          <Cursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileActions />
        </CartProvider>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
