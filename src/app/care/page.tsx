import type { Metadata } from "next";
import Link from "next/link";
import { Doc } from "@/components/Doc";

export const metadata: Metadata = { title: "Leather Care", description: "How to clean, condition and store your leather jacket, vest, chaps and boots so they last for years." };

export default function Page() {
  return (
    <Doc eyebrow="Help" title={["How to care for", "your leather."]} intro="A little attention goes a long way." image="/images/site/stitching-hands.webp">
      {/* TODO: confirm with owner — draft care routine */}
      <h2>Clean gently</h2>
      <p>Wipe away dust and dirt with a soft, damp cloth. For stubborn marks, use a leather cleaner or saddle soap, working in small circles. Never soak the leather.</p>
      <h2>Condition twice a year</h2>
      <p>Leather is skin — it dries out. Work a light coat of conditioner in with a clean cloth, let it rest, and buff off the extra. Test a small hidden spot first.</p>
      <h2>If it gets wet</h2>
      <p>Blot, don’t rub. Hang it on a wide hanger at room temperature. Never use a hair dryer, radiator or direct sun. Once dry, condition it.</p>
      <h2>Store it right</h2>
      <ul>
        <li>Use a wide, padded hanger so shoulders keep their shape.</li>
        <li>Choose a breathable garment bag, not plastic.</li>
        <li>Keep it cool, dry and out of direct sunlight.</li>
      </ul>
      <p>We carry <Link href="/shop/truck-care" className="font-semibold text-cognac underline underline-offset-4">liquid saddle soap</Link> in the shop. Questions? We’re happy to talk leather.</p>
    </Doc>
  );
}
