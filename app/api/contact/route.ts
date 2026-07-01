import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

console.log("API HIT");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, email, projectType, message } = body;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !projectType?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all fields.",
        },
        {
          status: 400,
        },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (message.trim().length < 20) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be at least 20 characters long.",
        },
        {
          status: 400,
        },
      );
    }

    const nameRegex = /^[A-Za-z\s'-]+$/;
    if (fullName.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your full name.",
        },
        {
          status: 400,
        },
      );
    }

    if (!nameRegex.test(fullName.trim())) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Full name can only contain letters, spaces, apostrophes, and hyphens.",
        },
        {
          status: 400,
        },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "abadinasmilagros@gmail.com",

      subject: `Portfolio Inquiry - ${projectType}`,

      html: `
        <h2>New Portfolio Inquiry</h2>

        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project:</strong> ${projectType}</p>

        <hr />

        <p>${message}</p>
      `,
    });

    console.log("EMAIL SENT");

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
      },
      {
        status: 500,
      },
    );
  }
}
