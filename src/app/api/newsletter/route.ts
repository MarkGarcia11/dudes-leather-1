import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { clean, isEmail, sendMail, spamCheck } from "@/lib/forms";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const spam = spamCheck(req, b);
  if (spam === "ok-silent") return Response.json({ message: "You’re on the list." });
  if (spam) return Response.json({ message: spam }, { status: 429 });
  const email = clean(b.email, 200).toLowerCase();
  if (!isEmail(email)) return Response.json({ message: "That email doesn’t look quite right. Mind checking it?" }, { status: 400 });
  try {
    await db.insert(newsletterSubscribers).values({ email }).onConflictDoNothing();
    await sendMail("New newsletter signup", `${email} joined the list.`);
    return Response.json({ message: "You’re on the list. Welcome to the ride." });
  } catch {
    return Response.json({ message: "We couldn’t save that just now. Please try again soon." }, { status: 500 });
  }
}
