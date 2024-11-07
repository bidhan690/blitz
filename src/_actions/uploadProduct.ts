"use server";

import prisma from "@/lib/prismaClient";
import { uploadProductSchema } from "@/lib/validations/product";
import { Prisma } from "@prisma/client";
import { z } from "zod";

type ProductUploadInput = z.infer<typeof uploadProductSchema>;

export const uploadProduct = async (input: ProductUploadInput) => {
    const { name, description, price, quantity, category, subCategory,images } =
        input;
        const imageUrls = images as string[];
      try {
        const [categories, subCategories] = await Promise.all([
          prisma.categories.upsert({
            where: { name: category.toLowerCase() },
            update: {},
            create: {
              name: category,
              slug: category.toLowerCase(),
            },
          }),
          prisma.subCategories.upsert({
            where: { name: subCategory.toLowerCase() },
            update: {},
            create: {
              name: subCategory,
              slug: subCategory.toLowerCase(),
              categoryName: category,
            },
          }),
        ]);

        await prisma.product.create({
          data: {
            name,
            description,
            price,
            quantity,
            categoryName: categories.name,
            subCategoryName: subCategories.name,
            images: imageUrls,
            slug: name.toLowerCase(),
            rating: 0,
          },
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(err);
        }
        throw new Error("Error while creating product");
      }
      return "Uploaded successfully.";

}
