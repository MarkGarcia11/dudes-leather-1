import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { CheckCircle2 } from "lucide-react";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { money } from "@/lib/catalog";
import { fullAddress, site } from "@/config/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

type Line = { name: string; size: string; qty: number; price: number };

export default async function OrderPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ paid?: string }> }) {
  const { id } = await params;
  const { paid } = await searchParams;
  const [o] = await db.select().from(orders).where(eq(orders.publicId, id)).limit(1).catch(() => []);
  if (!o) {
    return (
      <div className="mx-auto max-w-xl px-6 pb-32 pt-44 text-center">
        <h1 className="text-4xl">We couldn’t find that order.</h1>
        <p className="mt-4 text-saddle">Please check the link in your email, or contact us and we’ll look it up.</p>
        <Link href="/contact" className="btn btn-primary mt-8">Contact us</Link>
      </div>
    );
  }
  const lines = o.items as Line[];
  const pickup = o.shippingMethod === "pickup";
  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 pt-36">
      <div className="text-center">
        <CheckCircle2 size={64} className="mx-auto text-teal" aria-hidden />
        <h1 className="mt-5 text-4xl md:text-6xl">Thank you, {o.name.split(" ")[0]}.</h1>
        <p className="mt-4 text-lg text-saddle">
          Order <strong>{o.publicId}</strong> is in.{" "}
          {paid ? "Your payment went through." : "We’ll be in touch shortly to confirm details and complete payment."} A receipt goes to {o.email}.
        </p>
      </div>
      <div className="mt-10 rounded-[28px] border border-brass/40 bg-white p-7 shadow-lg">
        <ul className="divide-y divide-dashed divide-brass/40">
          {lines.map((l, i) => (
            <li key={i} className="flex justify-between gap-4 py-3">
              <span>{l.qty} × {l.name}{l.size ? ` (${l.size})` : ""}</span>
              <span className="font-semibold">{money(l.qty * l.price)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-brass/40 pt-4">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(Number(o.subtotal))}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{Number(o.shipping) ? money(Number(o.shipping)) : "Free"}</dd></div>
          <div className="flex justify-between"><dt>Tax</dt><dd>{money(Number(o.tax))}</dd></div>
          <div className="flex justify-between pt-2 text-2xl font-semibold"><dt>Total</dt><dd>{money(Number(o.total))}</dd></div>
        </dl>
        <p className="mt-6 text-saddle">{pickup ? `Pick up at ${fullAddress}. We’ll let you know when it’s ready.` : "Shipping to the address you gave us. We’ll email tracking as soon as it leaves the shop."}</p>
      </div>
      <div className="mt-10 text-center">
        <Link href="/shop" className="btn btn-primary">Keep browsing</Link>
        <p className="mt-6 text-saddle">Questions? <a className="font-semibold text-cognac underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p>
      </div>
    </div>
  );
}
