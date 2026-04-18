import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // TODO: wire to your preferred email service:
    //   - Resend: https://resend.com/docs/send-email
    //   - Formspree: replace this handler with a client-side fetch to Formspree
    //   - EmailJS: use EmailJS SDK directly in ContactForm.tsx
    console.log("Contact form submission:", data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
