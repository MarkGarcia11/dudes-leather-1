import { db } from "@/db";
import { visitBookings } from "@/db/schema";
import { clean, isEmail, sendMail, spamCheck } from "@/lib/forms";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const spam = spamCheck(req, b);
  if (spam === "ok-silent") return Response.json({ ok: true });
  if (spam) return Response.json({ message: spam }, { status: 429 });
  const name = clean(b.name, 120), email = clean(b.email, 200), phone = clean(b.phone, 40), date = clean(b.date, 20), time = clean(b.time, 20), interest = clean(b.interest, 500);
  const party = Math.min(8, Math.max(1, Number(b.party) || 2));
  if (!name || !isEmail(email) || !date || !time) return Response.json({ message: "Please add your name, email, a date and a time." }, { status: 400 });
  try {
    await db.insert(visitBookings).values({ name, email, phone, partySize: party, visitDate: date, visitTime: time, interest });
    await sendMail(`Visit request: ${name} on ${date} at ${time}`, `${name} (${party} people)\n${email}\n${phone}\n${date} ${time}\n\n${interest}`, undefined, email);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "We couldn’t save your visit just now. Please try again." }, { status: 500 });
  }
}
