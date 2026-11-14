import type { Metadata } from "next";
import { SharedBagClient } from "@/components/SharedBagClient";
import { getCards } from "@/lib/catalog";

export const metadata: Metadata = { title: "A bag shared with you", robots: { index: false } };

export default function SharedBag() {
  const slim = getCards().map((p) => ({ slug: p.slug, name: p.name, price: p.price, image: p.image.src }));
  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:pt-40">
      <SharedBagClient products={slim} />
    </div>
  );
}
