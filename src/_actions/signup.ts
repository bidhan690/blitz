"use server";

import prisma from "@/lib/prismaClient";
import { authSchema } from "@/lib/validations/auth";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { z } from "zod";

type dataType = z.infer<typeof authSchema>;

export const signupAction = async (data: dataType) => {
  try {
    const validData = authSchema.parse(data);
    const hashedPassword = await hash(validData.password, 12);

    await prisma.user.create({
      data: {
        email: validData.email,
        password: hashedPassword,
      },
    });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Account is already created. Please proceed to login." };
    }
    return { error: "Error while creating account" };
  }
};
