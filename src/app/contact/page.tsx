import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, mapsEmbed, mapsLink, site, telHref } from "@/config/site";
import { PageHero } from "@/components/Sections";
import { ContactForm, VisitForm } from "@/components/Forms";
import { Reveal, StitchHeading } from "@/components/motion";

export const metadata: Metadata = { title: "Contact", description: `Contact Dudes Leather at ${fullAddress}. Send a message, call, or book a visit and try things on together.` };

export default function Contact() {
  const row = "flex gap-4";
  return (
    <>
      <PageHero eyebrow="Contact" title={["Customer Service"]} intro="Questions about fit, stock or an order? Say hello. We’re friendly." image="/images/site/sewing-leather.webp" />
      <section className="bg-parchment py-20">
        <div className="mx-auto grid max-w-[1300px] gap-14 px-6 md:px-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Find us</h2>
            <address className="mt-6 space-y-6 not-italic text-lg">
              <p className={row}><Mail className="mt-1 shrink-0 text-cognac" aria-hidden /><span><strong className="block">Email us</strong><a href={`mailto:${site.email}`} className="break-all hover:text-copper">{site.email}</a></span></p>
              {site.phone && <p className={row}><Phone className="mt-1 shrink-0 text-cognac" aria-hidden /><span><strong className="block">Call us</strong><a href={telHref} className="hover:text-copper">{site.phoneDisplay || site.phone}</a></span></p>}
              <p className={row}><MapPin className="mt-1 shrink-0 text-cognac" aria-hidden /><span><strong className="block">Visit us</strong><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-copper">{fullAddress}</a></span></p>
              <div className={row}><Clock className="mt-1 shrink-0 text-cognac" aria-hidden /><div className="w-full max-w-sm"><strong className="block">Hours</strong><ul>{site.hours.map((h) => <li key={h.days} className="flex justify-between border-b border-dashed border-brass/40 py-1"><span>{h.days}</span><span>{h.time}</span></li>)}</ul></div></div>
              <p className={row}><span className="mt-1 w-6 shrink-0 text-center text-cognac" aria-hidden>f</span><span><strong className="block">Follow us</strong><a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-copper">Facebook</a></span></p>
            </address>
            <Reveal variant="scale" className="mt-10 h-[340px] overflow-hidden rounded-[24px] border-2 border-brass/50">
              <iframe title={`Map of ${fullAddress}`} src={mapsEmbed} loading="lazy" className="h-full w-full border-0" referrerPolicy="no-referrer-when-downgrade" />
            </Reveal>
          </div>
          <div>
            <h2 className="mb-6 text-3xl">Contact us</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <section id="visit" className="scroll-mt-24 bg-espresso py-24 text-parchment">
        <div className="mx-auto grid max-w-[1300px] gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <StitchHeading eyebrow="Book a visit" lines={["Come in", "together."]} light />
            <p className="mt-6 max-w-md text-lg text-tan">Pick a day and time and we’ll have a few pieces ready to try on, side by side. Bring your partner — better yet, bring your riding buddy too.</p>
          </div>
          <div className="rounded-[28px] bg-parchment p-7 text-espresso md:p-9"><VisitForm /></div>
        </div>
      </section>
    </>
  );
}
