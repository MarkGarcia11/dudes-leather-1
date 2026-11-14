import type { Metadata } from "next";
import { Doc } from "@/components/Doc";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <Doc eyebrow="Legal" title={["Privacy policy."]} intro="We keep it simple: we only collect what we need.">
      {/* TODO: confirm with owner — have a lawyer review before launch */}
      <h2>What we collect</h2>
      <p>When you place an order, join our newsletter, send a message or book a visit, we collect the details you give us — such as your name, email, phone number and delivery address.</p>
      <h2>How we use it</h2>
      <ul><li>To fulfil and support your order.</li><li>To reply to your messages and confirm visits.</li><li>To send our newsletter, only if you’ve joined it. Unsubscribe any time.</li></ul>
      <h2>Payments</h2>
      <p>Card payments are handled by our payment partner. We never see or store your full card number.</p>
      <h2>Sharing</h2>
      <p>We don’t sell your information. We share it only with services that help us run the shop, such as payment, shipping and email providers.</p>
      <h2>Your choices</h2>
      <p>Want your information changed or removed? Email <a href={`mailto:${site.email}`} className="font-semibold text-cognac underline underline-offset-4">{site.email}</a>.</p>
    </Doc>
  );
}
