import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getCategory, getProduct, getRelated, money, productDescription, toCard } from "@/lib/catalog";
import { site } from "@/config/site";
import { ProductView } from "@/components/ProductView";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, StitchHeading } from "@/components/motion";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const desc = productDescription(p).replace(/\s+/g, " ").slice(0, 155);
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: p.name, description: desc, type: "website", images: p.images[0] ? [{ url: p.images[0].src, width: p.images[0].w, height: p.images[0].h, alt: p.name }] : undefined },
  };
}

const acc = "group border-b border-dashed border-brass/50 py-1";
const sum = "flex min-h-[56px] cursor-pointer list-none items-center justify-between font-display text-xl [&::-webkit-details-marker]:hidden";

export default async function ProductPage({ params }: P) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category);
  const related = getRelated(p).map(toCard);
  const sale = p.comparePrice && p.comparePrice > p.price;
  const paras = p.description ? p.description.split("\n\n") : [productDescription(p)];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku || p.slug,
    description: productDescription(p),
    image: p.images.map((i) => `${site.url}${i.src}`),
    ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
    offers: { "@type": "Offer", url: `${site.url}/product/${p.slug}`, priceCurrency: "USD", price: p.price.toFixed(2), availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", seller: { "@type": "Organization", name: site.name } },
  };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Shop", item: `${site.url}/shop` }, { "@type": "ListItem", position: 2, name: cat?.name ?? "Products", item: `${site.url}/shop/${p.category}` }, { "@type": "ListItem", position: 3, name: p.name }] };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, crumbs]) }} />
      <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-32 md:px-10 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-saddle">
          <Link href="/shop" className="hover:text-copper">Shop</Link> / <Link href={`/shop/${p.category}`} className="hover:text-copper">{cat?.name}</Link>
        </nav>
        <ProductView p={{ slug: p.slug, name: p.name, sku: p.sku, price: p.price, comparePrice: p.comparePrice, sizes: p.sizes, images: p.images, inStock: p.inStock, category: p.category }}>
          <h1 className="text-3xl leading-tight md:text-5xl">{p.name}</h1>
          {p.sku && <p className="mt-2 text-sm tracking-wide text-saddle">SKU {p.sku}{p.brand ? ` · ${p.brand}` : ""}</p>}
          <p className="mt-5 text-3xl font-semibold text-saddle">
            {sale && <span className="mr-3 text-xl font-normal text-saddle/60 line-through">{money(p.comparePrice!)}</span>}
            {money(p.price)}
            {sale && <span className="ml-3 rounded-full bg-oxblood px-3 py-1 align-middle text-xs font-bold uppercase tracking-wider text-white">Sale</span>}
          </p>
          <p className="mt-1 text-sm text-saddle">Sales tax and shipping are calculated at checkout.</p>
          <div className="mt-6 space-y-4 text-lg">
            {paras.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          {p.madeIn && <p className="mt-4 inline-block rounded-full border border-brass/60 px-4 py-1 text-sm font-medium">{p.madeIn === "USA" ? "Made in the USA" : `Made in ${p.madeIn}`}</p>}
        </ProductView>

        <section className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-2" aria-label="Product details">
          {(p.features.length > 0 || p.specs.length > 0) && (
            <div>
              <h2 className="mb-4 text-3xl">The details</h2>
              {p.features.length > 0 && (
                <ul className="space-y-2">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex gap-3"><span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />{f}</li>
                  ))}
                </ul>
              )}
              {p.specs.length > 0 && (
                <dl className="mt-6 divide-y divide-dashed divide-brass/40">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 py-2"><dt className="text-saddle">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                  ))}
                </dl>
              )}
            </div>
          )}
          <div>
            <details className={acc} open>
              <summary className={sum}>Shipping &amp; returns<span aria-hidden className="text-brass transition-transform group-open:rotate-45 text-2xl">+</span></summary>
              {/* TODO: confirm with owner */}
              <div className="pb-5 text-saddle">
                <p>Orders usually leave our shop in 1–3 business days. Free standard shipping over {money(site.claims.freeShippingOver)}, or pick up in Indian Trail.</p>
                <p className="mt-2">Not right? Return it within {site.claims.returnWindowDays} days. <Link href="/shipping-returns" className="font-semibold text-cognac underline underline-offset-4">Full details</Link></p>
              </div>
            </details>
            <details className={acc}>
              <summary className={sum}>Leather care tips<span aria-hidden className="text-brass transition-transform group-open:rotate-45 text-2xl">+</span></summary>
              <div className="pb-5 text-saddle">
                <p>Wipe with a soft, damp cloth. Dry naturally, away from heat. Condition once or twice a year. <Link href="/care" className="font-semibold text-cognac underline underline-offset-4">Full care guide</Link></p>
              </div>
            </details>
            <details className={acc}>
              <summary className={sum}>Not sure about the fit?<span aria-hidden className="text-brass transition-transform group-open:rotate-45 text-2xl">+</span></summary>
              <div className="pb-5 text-saddle"><p>Call or message us with your measurements and we’ll tell you which size to try. Or <Link href="/contact#visit" className="font-semibold text-cognac underline underline-offset-4">come in together</Link> and try it on.</p></div>
            </details>
            <details className={acc}>
              <summary className={sum}>Reviews<span aria-hidden className="text-brass transition-transform group-open:rotate-45 text-2xl">+</span></summary>
              <div className="pb-5 text-saddle"><p>No reviews for this piece yet. Own one? <Link href="/testimonials#share" className="font-semibold text-cognac underline underline-offset-4">Tell us how it rides.</Link></p></div>
            </details>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-24" aria-label="Related products">
            <StitchHeading eyebrow="You might also like" lines={["Keep looking."]} />
            <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.07} className="h-full"><ProductCard p={r} /></Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
