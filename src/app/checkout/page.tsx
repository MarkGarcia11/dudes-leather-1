import type { Metadata } from "next";
import { CheckoutClient } from "@/components/CheckoutClient";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function Checkout() {
  return (
    <div className="mx-auto max-w-[1300px] px-6 pb-28 pt-32 md:px-10 md:pt-36">
      <h1 className="text-4xl md:text-6xl">Checkout</h1>
      <p className="mt-3 max-w-2xl text-lg text-saddle">One page, no surprises. Guest checkout — no account needed.</p>
      <CheckoutClient />
    </div>
  );
}
