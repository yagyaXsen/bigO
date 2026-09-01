import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || "aarongangwar@gmail.com";
    let delivered = false;

    // 1. Try Web3Forms if access key is configured
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            name,
            email,
            phone: phone || "Not provided",
            company: company || "Not provided",
            message,
            from_name: "bigO Website Inquiry",
            subject: `New Project Inquiry from ${name}`,
          }),
        });
        const web3Data = await web3Res.json();
        if (web3Data.success) {
          delivered = true;
        }
      } catch (err) {
        console.error("Web3Forms submission error:", err);
      }
    }

    // 2. Try SMTP via Nodemailer if configured
    if (!delivered && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Boolean(process.env.SMTP_SECURE === "true"),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"bigO Studio" <${process.env.SMTP_USER}>`,
          to: contactEmail,
          replyTo: email,
          subject: `New Project Inquiry from ${name} (${company || "Individual"})`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`,
          html: `
            <h3>New Inquiry on bigO Studio</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          `,
        });
        delivered = true;
      } catch (err) {
        console.error("SMTP nodemailer error:", err);
      }
    }

    // Log the submission
    console.log("Contact submission received:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      company,
      message,
      delivered,
    });

    return NextResponse.json({
      success: true,
      delivered,
      message: "Message received successfully. We'll be in touch soon!",
    });
  } catch (error) {
    console.error("Contact API handler error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}
