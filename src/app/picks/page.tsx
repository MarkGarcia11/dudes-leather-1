import type { Metadata } from "next";
import { PicksClient } from "@/components/PicksClient";
import { getCards } from "@/lib/catalog";

export const metadata: Metadata = { title: "Our Picks", description: "Pieces saved to Our Picks — share them and decide together.", robots: { index: false } };

export default function Picks() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 pb-28 pt-32 md:px-10 md:pt-40">
      <PicksClient products={getCards()} />
    </div>
  );
}
