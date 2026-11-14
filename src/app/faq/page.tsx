import type { Metadata } from "next";
import { FaqClient } from "@/components/FaqClient";
import { PageHero } from "@/components/Sections";
import { faqs } from "@/data/content";

export const metadata: Metadata = { title: "FAQ", description: "Answers about returns, payment, product care, shipping, warranty, orders, craftsmanship, custom orders and sizing at Dudes Leather." };

export default function Faq() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow="FAQ" title={["Questions, answered."]} intro="Can’t find what you’re looking for? Call or message us. A real person answers." image="/images/site/leather-texture.webp" />
      <FaqClient />
    </>
  );
}
