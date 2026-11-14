import Link from "next/link";
import { Photo } from "@/components/Photo";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[90svh] place-items-center overflow-hidden bg-espresso px-6 text-center text-parchment">
      <div className="absolute inset-0 opacity-30"><Photo src="/images/site/hero-jackets-rack.webp" alt="" sizes="100vw" /></div>
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/30" />
      <div className="relative max-w-xl pt-20">
        <p className="text-golden font-display text-8xl font-semibold">404</p>
        <h1 className="mt-4 text-4xl md:text-5xl">This road ends here.</h1>
        <p className="mt-4 text-lg text-tan">The page you’re looking for has wandered off. Let’s get you back on the highway.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/shop" className="btn btn-ghost text-parchment">Shop the Collection</Link>
        </div>
      </div>
    </section>
  );
}
