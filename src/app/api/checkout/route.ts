import { randomBytes } from "crypto";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getProduct } from "@/lib/catalog";
import { site } from "@/config/site";
import { clean, isEmail, sendMail, spamCheck } from "@/lib/forms";

export const dynamic = "force-dynamic";

type In = { slug: string; size: string; qty: number };

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const spam = spamCheck(req, b);
  if (spam && spam !== "ok-silent") return Response.json({ message: spam }, { status: 429 });
  const email = clean(b.email, 200), name = clean(b.name, 120), phone = clean(b.phone, 40);
  const method = b.shippingMethod === "express" || b.shippingMethod === "pickup" ? b.shippingMethod : "standard";
  const a = b.address || {};
  const address = { line1: clean(a.line1, 160), line2: clean(a.line2, 160), city: clean(a.city, 80), state: clean(a.state, 40), zip: clean(a.zip, 12) };
  if (!isEmail(email) || !name) return Response.json({ message: "Please add your name and a valid email so we can send your receipt." }, { status: 400 });
  if (method !== "pickup" && (!address.line1 || !address.city || !address.state || !address.zip))
    return Response.json({ message: "We need a full shipping address to send your order — or choose store pickup." }, { status: 400 });

  // Prices are always recalculated on the server from the catalog.
  const lines = (Array.isArray(b.items) ? (b.items as In[]) : []).slice(0, 40).flatMap((i) => {
    const p = getProduct(String(i.slug));
    if (!p || !p.inStock) return [];
    const qty = Math.min(20, Math.max(1, Math.floor(Number(i.qty) || 1)));
    return [{ slug: p.slug, name: p.name, sku: p.sku, size: clean(i.size, 20), qty, price: p.price }];
  });
  if (!lines.length) return Response.json({ message: "Your bag looks empty. Add something and try again." }, { status: 400 });

  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const shipping = method === "pickup" ? 0 : method === "express" ? site.shipping.express : subtotal >= site.claims.freeShippingOver ? 0 : site.shipping.standard;
  const tax = Math.round(subtotal * site.taxRate * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  const publicId = "DL-" + randomBytes(4).toString("hex").toUpperCase();

  try {
    await db.insert(orders).values({
      publicId, email, name, phone, shippingMethod: method, address, items: lines,
      subtotal: subtotal.toFixed(2), shipping: shipping.toFixed(2), tax: tax.toFixed(2), total: total.toFixed(2), note: clean(b.note, 500),
    });
  } catch {
    return Response.json({ message: "We couldn’t save your order just now. Nothing was charged. Please try again." }, { status: 500 });
  }

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const origin = host && !host.startsWith("0.0.0.0") ? `${host.includes("localhost") ? "http" : proto}://${host}` : site.url;
  let url = `${origin}/order/${publicId}`;

  // Stripe Checkout (cards, Apple Pay, Google Pay) when STRIPE_SECRET_KEY is configured.
  const sk = process.env.STRIPE_SECRET_KEY;
  if (sk) {
    try {
      const f = new URLSearchParams();
      f.set("mode", "payment");
      f.set("success_url", `${origin}/order/${publicId}?paid=1`);
      f.set("cancel_url", `${origin}/checkout`);
      f.set("customer_email", email);
      f.set("client_reference_id", publicId);
      const rows = [...lines.map((l) => ({ n: `${l.name}${l.size ? ` (${l.size})` : ""}`, c: Math.round(l.price * 100), q: l.qty })), ...(tax ? [{ n: "Sales tax", c: Math.round(tax * 100), q: 1 }] : []), ...(shipping ? [{ n: "Shipping", c: Math.round(shipping * 100), q: 1 }] : [])];
      rows.forEach((r, i) => {
        f.set(`line_items[${i}][quantity]`, String(r.q));
        f.set(`line_items[${i}][price_data][currency]`, "usd");
        f.set(`line_items[${i}][price_data][unit_amount]`, String(r.c));
        f.set(`line_items[${i}][price_data][product_data][name]`, r.n);
      });
      const r = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: `Bearer ${sk}`, "Content-Type": "application/x-www-form-urlencoded" }, body: f });
      const s = await r.json();
      if (s.url) {
        await db.update(orders).set({ stripeSessionId: s.id }).where(eq(orders.publicId, publicId));
        url = s.url;
      }
    } catch (e) {
      console.error("stripe failed", e);
    }
  }
  await sendMail(`New order ${publicId} — $${total.toFixed(2)}`, `${name} <${email}> ${phone}\n${method}\n${JSON.stringify(address)}\n\n${lines.map((l) => `${l.qty} x ${l.name} ${l.size} @ $${l.price}`).join("\n")}\n\nTotal $${total.toFixed(2)}`);
  return Response.json({ publicId, url, total });
}
