import type { Metadata } from "next";
import Link from "next/link";
import { Doc } from "@/components/Doc";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Shipping & Returns", description: "Clear shipping options, free shipping thresholds and an easy returns process at Dudes Leather." };

export default function Page() {
  const d = site.claims.returnWindowDays;
  return (
    <Doc eyebrow="Help" title={["Shipping &", "returns."]} intro="No fine print, no surprises.">
      {/* TODO: confirm with owner — all rates, times and windows below are draft */}
      <h2>Shipping</h2>
      <ul>
        <li>Orders usually leave our shop in 1–3 business days.</li>
        <li>Standard shipping: ${site.shipping.standard.toFixed(2)}, 3–7 business days. Free on orders over ${site.claims.freeShippingOver}.</li>
        <li>Express shipping: ${site.shipping.express.toFixed(2)}, 1–3 business days.</li>
        <li>Store pickup in Indian Trail is always free.</li>
        <li>Sales tax is calculated at checkout and shown before you pay.</li>
      </ul>
      <h2>Returns</h2>
      <p>If something isn’t right, tell us. You have {d} days from the day your order arrives to return unworn items in their original condition.</p>
      <p>Reach out with your order number and the item details, and we’ll guide you through the next steps. A quick note about why you’d like to return it helps us help you faster.</p>
      <h2>Exchanges</h2>
      <p>Need a different size? We’re happy to swap, subject to availability. Call, message or stop by.</p>
      <p><Link href="/contact" className="font-semibold text-cognac underline underline-offset-4">Contact us</Link> or read the <Link href="/faq" className="font-semibold text-cognac underline underline-offset-4">FAQ</Link>.</p>
    </Doc>
  );
}
