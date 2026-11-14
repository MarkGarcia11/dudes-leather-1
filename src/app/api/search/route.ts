import { searchProducts } from "@/lib/catalog";

export function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") || "";
  const results = searchProducts(q, 7).map((p) => ({ slug: p.slug, name: p.name, price: p.price, image: p.images[0]?.src ?? "" }));
  return Response.json({ results });
}
