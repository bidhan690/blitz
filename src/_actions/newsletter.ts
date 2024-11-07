"use server";
import prisma from "@/lib/prismaClient";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import NewsletterWelcomeEmail from "@/components/emails/newsletter-welcome-email";
import { emailSchema } from "@/lib/validations/email";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const newsletterSignup = async (inputEmail: string) => {
  try {
    const { email } = emailSchema.parse({ email: inputEmail });

    const data = await prisma.newsletter.findFirst({
      where: {
        email,
      },
    });

    if (data?.email === email)
      return { error: "You are already subscribed to our newsletter." };

    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const newsletterHtml = render(
      NewsletterWelcomeEmail({
        email,
        fromEmail: process.env.SMTP_USER!,
      }),
    );

    const options = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Blitz Newsletter Welcome Email",
      html: newsletterHtml,
    };

    await transporter.sendMail(options);
    await prisma.newsletter.create({
      data: {
        email,
      },
    });
    return { message: "Success" };
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "You are already subscribed to our newsletter." };
    }
    if (error instanceof ZodError) {
      return { error: error.message };
    }
    return { error: "Something went wrong." };
  }
};
