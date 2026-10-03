import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[character]!));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl : null;

    if (!name || !message || name.length > 50 || message.length > 1000) {
      return NextResponse.json(
        { error: "Name and message are required fields." },
        { status: 400 }
      );
    }

    const wish = await prisma.wish.create({
      data: { name, message, imageUrl },
    });

    // Email is optional: a notification failure must not undo a saved wish.
    let emailId: string | undefined;
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const emailResult = await resend.emails.send({
          from: "Temi's Birthday Guestbook <onboarding@resend.dev>",
          to: ["thetemiherself@gmail.com"],
          subject: `New Birthday Wish from ${name}!`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 16px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="font-size: 36px;">🎂</span>
                <h1 style="color: #ec4899; font-size: 24px; margin-top: 8px;">New Birthday Wish for Temi!</h1>
              </div>

              <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Sender</p>
                <p style="font-size: 18px; font-weight: bold; color: #f8fafc; margin: 0;">${escapeHtml(name)}</p>
              </div>

              <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Private Message</p>
                <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; font-style: italic; margin: 0;">"${escapeHtml(message)}"</p>
              </div>

              ${
                imageUrl
                  ? `
              <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Attached Memory Photo</p>
                <img src="${escapeHtml(imageUrl)}" alt="Memory photo with Temi" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px;" />
              </div>
              `
                  : ""
              }

              <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #64748b;">
                Sent with ❤️ from Temi's Birthday Guestbook App
              </div>
            </div>
          `,
        });

        if (emailResult.error) {
          console.error("[Wish email notification error]:", emailResult.error);
        } else {
          emailId = emailResult.data?.id;
        }
      } catch (error) {
        console.error("[Wish email notification error]:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Wish saved!",
      wishId: wish.id,
      emailId,
    });
  } catch (error: any) {
    console.error("[API Error /api/wish]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process wish submission." },
      { status: 500 }
    );
  }
}
