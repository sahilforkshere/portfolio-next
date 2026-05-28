import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json() as {
      name: string; email: string; message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      "paalsahil04@gmail.com",
      replyTo: email,
      subject: `[Portfolio] Message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;background:#000;color:#fff;border:1px solid #c9a84c33;">
          <h2 style="color:#c9a84c;font-size:22px;margin:0 0 24px;letter-spacing:0.1em;">NEW PORTFOLIO MESSAGE</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;width:80px;">From</td>
                <td style="padding:8px 0;color:#fff;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;">Email</td>
                <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #c9a84c22;margin:20px 0;"/>
          <p style="color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 12px;">Message</p>
          <p style="color:#ddd;font-size:14px;line-height:1.7;white-space:pre-wrap;margin:0;">${message}</p>
          <hr style="border:none;border-top:1px solid #c9a84c22;margin:24px 0 16px;"/>
          <p style="color:#555;font-size:11px;margin:0;">Sent from sahilpal.dev portfolio — reply directly to respond.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
