import { db } from "@/db";
import { reviews } from "@/db/schema";
import { clean, sendMail, spamCheck } from "@/lib/forms";

export const dynamic = "force-dynamic";

// New reviews are saved unapproved. The owner approves them in the database before they appear on the site.
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const spam = spamCheck(req, b);
  if (spam === "ok-silent") return Response.json({ ok: true });
  if (spam) return Response.json({ message: spam }, { status: 429 });
  const firstName = clean(b.firstName, 60), town = clean(b.town, 80), body = clean(b.body, 1500);
  const rating = Math.min(5, Math.max(1, Number(b.rating) || 5));
  if (!firstName || body.length < 10) return Response.json({ message: "Please add your first name and a few words about your experience." }, { status: 400 });
  try {
    await db.insert(reviews).values({ firstName, town, body, rating, approved: false });
    await sendMail(`New review from ${firstName}`, `${firstName}, ${town} — ${rating}/5\n\n${body}\n\nApprove it in the reviews table.`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "We couldn’t save your review just now. Please try again." }, { status: 500 });
  }
}
