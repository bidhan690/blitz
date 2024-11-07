import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Please enter the valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long." })
    .max(40, { message: "Password must be less than 40 characters." }),
});

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});


