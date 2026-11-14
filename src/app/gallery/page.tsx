import type { Metadata } from "next";
import { GalleryClient } from "@/components/GalleryClient";
import { PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "Gallery", description: "A look inside Dudes Leather: jackets, vests, gloves, details and the craft behind quality leather motorcycle gear." };

export default function Gallery() {
  return (
    <>
      <PageHero eyebrow="Gallery" title={["A look around."]} intro="Leather, up close. Tap any photo to see it larger — swipe or use the arrow keys to keep looking." image="/images/site/jackets-rack.webp" />
      <GalleryClient />
    </>
  );
}
