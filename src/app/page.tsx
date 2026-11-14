import Link from "next/link";
import { ArrowRight, HeartHandshake, Phone, RotateCcw, ShieldCheck, Store } from "lucide-react";
import { categories, hiddenFromHome, site, telHref } from "@/config/site";
import { getByCategory, getFeatured, getProduct, toCard } from "@/lib/catalog";
import { gallery, testimonials } from "@/data/content";
import { Counter, Reveal, Stagger, StaggerItem, StitchHeading, Btn } from "@/components/motion";
import { DriftRow, HomeHero, RideTile, ScrollRow, TestimonialCarousel, Unfold } from "@/components/home/parts";
import { ProductCard } from "@/components/ProductCard";
import { Photo } from "@/components/Photo";
import { NewsletterBand, VisitPanel } from "@/components/Sections";
import { getAllProducts } from "@/lib/catalog";

export default function Home() {
  const featured = getFeatured().map(toCard);
  const her = getProduct("belle-ladies-10-pocket-leather-vest") ?? getFeatured().find((p) => p.gender === "women");
  const kid = getAllProducts().find((p) => p.category === "kids" && p.images.length);
  const cats = categories.filter((c) => !hiddenFromHome.includes(c.slug));
  const strip = [
    { icon: Store, t: "Visit us in Indian Trail", d: "Try it on together" },
    { icon: RotateCcw, t: "Easy returns", d: `${site.claims.returnWindowDays}-day window` },
    { icon: Phone, t: "Fit help by phone", d: telHref ? "Call and we’ll talk sizing" : "Message us, we’ll help you size" },
    { icon: ShieldCheck, t: "Secure checkout", d: "Cards, Apple Pay, Google Pay" },
  ];
  const teaser = [gallery[2], gallery[1], gallery[5], gallery[3], gallery[4], gallery[0]];

  return (
    <>
      <HomeHero />

      {/* Trust strip */}
      <section aria-label="Why shop with us" className="relative bg-espresso text-parchment">
        <div className="stitch" />
        <Stagger className="mx-auto grid max-w-[1500px] grid-cols-2 gap-6 px-6 py-9 md:px-10 lg:grid-cols-4">
          {strip.map(({ icon: I, t, d }) => (
            <StaggerItem key={t} className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-brass/60 text-brass">
                <I size={24} aria-hidden />
              </span>
              <span>
                <strong className="block font-display text-lg leading-tight">{t}</strong>
                <span className="text-sm text-tan">{d}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Ride Together */}
      <section className="relative bg-parchment py-24 md:py-32 grain" aria-labelledby="ride-h">
        <div className="relative mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <StitchHeading eyebrow="Ride Together" lines={["Gear for everyone", "on the bike."]} />
            <Reveal>
              <p className="max-w-md text-lg text-saddle" id="ride-h">
                Browse by who’s riding. Jackets, vests, chaps and more — {site.claims.line.toLowerCase()}
              </p>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <RideTile href="/shop?for=men" title="For Him" line="Jackets, vests & chaps" src="/images/site/rider-portrait.webp" alt="A rider with dark curly hair glancing over the shoulder of a black leather jacket" />
            <RideTile href="/shop?for=women" title="For Her" line="Vests, jackets & more" src={her?.images[0]?.src ?? "/images/site/leather-texture.webp"} alt={her ? `${her.name}, a women’s leather vest` : "Women’s leather vest"} contain delay={0.12} />
            <RideTile href="/shop/kids" title="For the Little Riders" line="Kids & toddler gear" src={kid?.images[0]?.src ?? "/images/site/leather-texture.webp"} alt={kid ? `${kid.name}, kids’ biker gear` : "Kids’ biker gear"} contain delay={0.24} />
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-gradient-to-b from-parchment to-tan/50 pb-24 pt-10 md:pb-32" aria-labelledby="feat-h">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <StitchHeading eyebrow="Featured" lines={["Pieces riders", "keep coming back for."]} />
            <Btn href="/shop" variant="dark">
              Explore More <ArrowRight size={18} aria-hidden />
            </Btn>
          </div>
          <span id="feat-h" className="sr-only">Featured products</span>
          <DriftRow>
            {featured.map((p, i) => (
              <div key={p.slug} className="w-[72vw] shrink-0 snap-start sm:w-[320px] xl:w-[340px]">
                <Reveal delay={i * 0.06} className="h-full">
                  <ProductCard p={p} priority={i < 2} />
                </Reveal>
              </div>
            ))}
          </DriftRow>
        </div>
      </section>

      {/* Craft & care */}
      <section className="relative bg-tan/50 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
          <Unfold className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-2xl">
            <Photo src="/images/site/stitching-hands.webp" alt="Close-up of hands stitching leather beside awls and leather-working tools" sizes="(min-width:1024px) 50vw, 100vw" />
          </Unfold>
          <div>
            <StitchHeading eyebrow="Craft & care" lines={["Good leather", "tells the truth."]} />
            <Reveal delay={0.2}>
              {/* TODO: confirm with owner — draft story copy */}
              <p className="mt-8 text-lg">
                Every jacket, vest and pair of chaps on our racks was picked because it holds up — in the stitching, the hide and the hardware. Some pieces are made here in the USA. Others are imported. We tell you which, and why we like them.
              </p>
              <p className="mt-4 text-lg">That’s the whole idea: honest quality, fair prices, and someone who’ll help you find the right fit.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Btn href="/care">How to care for your leather</Btn>
                <Btn href="/about" variant="ghost">Our story</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Choose it together */}
      <section className="relative overflow-hidden bg-espresso py-24 text-parchment md:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="order-2 lg:order-1">
            <StitchHeading eyebrow="Choose it together" lines={["Two people,", "one good decision."]} light />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-lg text-tan">
                The best purchases are the ones you both feel good about. Save pieces to <strong className="text-glow">Our Picks</strong>, then send them to your partner in one tap — by text, WhatsApp or email.
              </p>
              <ul className="mt-8 space-y-5">
                <li className="flex gap-4">
                  <HeartHandshake className="mt-1 shrink-0 text-brass" aria-hidden />
                  <span><strong className="block font-display text-xl text-parchment">Send to my partner</strong>Every product has a share button with a clean, simple link.</span>
                </li>
                <li className="flex gap-4">
                  <Store className="mt-1 shrink-0 text-brass" aria-hidden />
                  <span><strong className="block font-display text-xl text-parchment">Visit us together</strong>Book a time and we’ll have your picks ready to try on, side by side.</span>
                </li>
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Btn href="/picks">See Our Picks</Btn>
                <Btn href="/contact#visit" variant="ghost" className="text-parchment">Book a visit</Btn>
              </div>
            </Reveal>
          </div>
          <Unfold from="left" className="relative order-1 aspect-[4/5] overflow-hidden rounded-[28px] lg:order-2">
            <Photo src="/images/site/jackets-rack.webp" alt="A rack of leather jackets in black, red and cream, close up on the quilted shoulders" sizes="(min-width:1024px) 40vw, 100vw" />
          </Unfold>
        </div>
      </section>

      {/* Category showcase */}
      <section className="bg-espresso pb-24 text-parchment md:pb-32" aria-labelledby="cats-h">
        <div className="stitch mx-6 mb-20 md:mx-10" />
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="mb-10">
            <StitchHeading eyebrow="Shop by category" lines={["Find your piece."]} light />
            <span id="cats-h" className="sr-only">Categories</span>
          </div>
          <ScrollRow>
            {cats.map((c) => {
              const first = getByCategory(c.slug).find((p) => p.images.length);
              return (
                <Link key={c.slug} href={`/shop/${c.slug}`} className="card group w-[75vw] shrink-0 snap-start sm:w-[300px]">
                  <div className="sheen relative aspect-[4/5] overflow-hidden rounded-2xl border border-brass/40 bg-white">
                    <div className="zoom absolute inset-0">
                      <Photo src={first?.images[0]?.src ?? "/images/site/leather-texture.webp"} alt={`${c.name}: ${first?.name ?? "leather gear"}`} sizes="300px" fit="contain" className="p-4" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-2xl group-hover:text-glow">{c.name}</h3>
                  <p className="text-sm text-tan">{c.blurb}</p>
                </Link>
              );
            })}
          </ScrollRow>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-parchment py-20" aria-label="The shop in numbers">
        <Stagger className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 px-6 text-center md:grid-cols-4 md:px-10">
          {[
            { n: getAllProducts().length, s: "+", l: "pieces on the rack" },
            { n: categories.length, s: "", l: "curated collections" },
            { n: 9, s: "", l: "sizes, XS to 5XL" },
            { n: 1, s: "", l: "friendly shop in Indian Trail" },
          ].map((x) => (
            <StaggerItem key={x.l}>
              <p className="text-golden font-display text-6xl font-semibold"><Counter to={x.n} suffix={x.s} /></p>
              <p className="mt-2 text-saddle">{x.l}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Testimonials */}
      <section className="bg-tan/40 py-24 md:py-28" aria-labelledby="t-h">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="mb-12 flex justify-center">
            <StitchHeading eyebrow="Kind words" lines={["From riders", "like you."]} align="center" />
          </div>
          <span id="t-h" className="sr-only">Testimonials</span>
          <TestimonialCarousel items={testimonials} />
          <div className="mt-10 text-center">
            <Link href="/testimonials" className="font-semibold text-cognac underline decoration-brass underline-offset-4">Read more & share yours</Link>
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-parchment py-24 md:py-28">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <StitchHeading eyebrow="Gallery" lines={["A look around."]} />
            <Btn href="/gallery" variant="dark">See the full gallery <ArrowRight size={18} aria-hidden /></Btn>
          </div>
          <div className="columns-2 gap-4 md:columns-3 lg:columns-6">
            {teaser.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.07} className="mb-4 break-inside-avoid">
                <Link href="/gallery" className="card block overflow-hidden rounded-2xl bg-white">
                  <div className="zoom" style={{ aspectRatio: `${g.w} / ${g.h}` }}>
                    <div className="relative h-full w-full">
                      <Photo src={g.src} alt={g.alt} sizes="(min-width:1024px) 16vw, 50vw" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VisitPanel />
      <NewsletterBand />
    </>
  );
}
