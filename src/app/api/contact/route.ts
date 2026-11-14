import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { clean, isEmail, sendMail, spamCheck } from "@/lib/forms";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const spam = spamCheck(req, b);
  if (spam === "ok-silent") return Response.json({ ok: true });
  if (spam) return Response.json({ message: spam }, { status: 429 });
  const name = clean(b.name, 120), email = clean(b.email, 200), phone = clean(b.phone, 40), message = clean(b.message, 4000);
  if (!name || !isEmail(email) || message.length < 3) return Response.json({ message: "Please fill in your name, a valid email and a message." }, { status: 400 });
  try {
    await db.insert(contactMessages).values({ name, email, phone, message });
    await sendMail(`New message from ${name}`, `${name}\n${email}\n${phone}\n\n${message}`, undefined, email);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "We couldn’t send that just now. Please try again, or email us directly." }, { status: 500 });
  }
}
