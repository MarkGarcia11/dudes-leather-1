import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import { VisitPanel, NewsletterBand } from "@/components/Sections";
import { Btn, Counter, Reveal, Stagger, StaggerItem, StitchHeading } from "@/components/motion";
import { Unfold } from "@/components/home/parts";
import { Photo } from "@/components/Photo";
import { timeline, values } from "@/data/content";
import { categories, site } from "@/config/site";
import { getAllProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are: Dudes Leather in Indian Trail, NC sells quality USA and imported leather motorcycle clothing and accessories, with riders helping riders.",
};

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title={["Who We Are"]} intro="We sell quality USA and Imported Products." image="/images/site/leather-workshop.webp" />

      <section className="bg-parchment py-24">
        <div className="mx-auto grid max-w-[1300px] items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
          <div>
            <StitchHeading eyebrow="Our story" lines={["Riders helping", "riders."]} />
            <Reveal delay={0.2}>
              {/* TODO: confirm with owner — owner story is draft copy; the old About page contained only template text */}
              <div className="mt-8 space-y-5 text-lg">
                <p>{site.name} is a small leather shop in Indian Trail, North Carolina, for people who ride — and the people who ride with them.</p>
                <p>We carry jackets, vests, chaps, boots, gloves, helmets, bags and all the little extras a rider ends up needing. Some of it is made in the USA. Some of it is imported. All of it was picked because it’s good leather at a fair price.</p>
                <p>Come in, try it on, bring your partner. We’ll tell you honestly what fits, what doesn’t, and what will last.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4"><Btn href="/shop">Shop the Collection</Btn><Btn href="/contact#visit" variant="ghost">Visit us together</Btn></div>
            </Reveal>
          </div>
          <div className="grid grid-cols-[1fr_0.8fr] gap-4">
            <Unfold className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[24px]"><Photo src="/images/site/sewing-leather.webp" alt="A sewing machine needle stitching a tan leather strap" sizes="(min-width:1024px) 45vw, 100vw" /></Unfold>
            <Unfold className="relative aspect-[4/5] overflow-hidden rounded-[24px]" from="left"><Photo src="/images/site/leather-workshop.webp" alt="Leather workshop with tools laid out on a bench" sizes="(min-width:1024px) 25vw, 55vw" /></Unfold>
            {/* TODO: confirm with owner — add owner portrait */}
            <Reveal variant="scale" className="grid place-items-center rounded-[24px] border-2 border-dashed border-brass/60 p-5 text-center text-saddle"><span>Owner portrait<br /><small>coming soon</small></span></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-espresso py-20 text-parchment">
        <Stagger className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 px-6 text-center md:grid-cols-4 md:px-10">
          {[
            { n: getAllProducts().length, s: "+", l: "pieces in the shop" },
            { n: categories.length, s: "", l: "collections" },
            { n: 3, s: "", l: "ways to shop: online, by phone, in person" },
            { n: 1, s: "", l: "rule: honest quality" },
          ].map((x) => (
            <StaggerItem key={x.l}><p className="text-golden font-display text-6xl font-semibold"><Counter to={x.n} suffix={x.s} /></p><p className="mt-2 text-tan">{x.l}</p></StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-tan/40 py-24">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <StitchHeading eyebrow="What we stand for" lines={["Our values."]} />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-[24px] border-2 border-dashed border-brass/60 bg-parchment p-8">
                  <p className="text-golden font-display text-5xl">0{i + 1}</p>
                  <h3 className="mt-3 text-2xl">{v.title}</h3>
                  <p className="mt-2 text-saddle">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-parchment py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <StitchHeading eyebrow="Timeline" lines={["How we got here."]} />
          <ol className="relative mt-12 space-y-10 border-l-2 border-dashed border-brass/70 pl-8">
            {timeline.map((t) => (
              <Reveal key={t.step} as="li" variant="right" className="relative">
                <span aria-hidden className="absolute -left-[41px] top-2 h-4 w-4 rounded-full bg-copper ring-4 ring-parchment" />
                <h3 className="text-2xl">{t.step}</h3>
                <p className="mt-1 text-lg text-saddle">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-espresso py-24 text-parchment">
        <div className="mx-auto grid max-w-[1300px] items-center gap-12 px-6 md:px-10 lg:grid-cols-2">
          <Unfold className="relative aspect-[4/3] overflow-hidden rounded-[24px]"><Photo src="/images/site/stitching-hands.webp" alt="Hands stitching leather beside awls and tools" sizes="(min-width:1024px) 45vw, 100vw" /></Unfold>
          <div>
            <StitchHeading eyebrow="Craftsmanship" lines={["Stitch by stitch."]} light />
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-tan">Good leather shows its quality in small places: tight stitching, solid hardware, a hide that softens instead of cracking. That’s what we look for on every piece we bring in — whether it was made down the road or across the world.</p>
              <p className="mt-4 text-lg text-tan">{site.claims.line}</p>
              <div className="mt-8"><Btn href="/care">Leather care guide</Btn></div>
            </Reveal>
          </div>
        </div>
      </section>
      <VisitPanel />
      <NewsletterBand />
    </>
  );
}
