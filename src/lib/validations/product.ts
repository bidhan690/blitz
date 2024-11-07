import { string, z } from "zod";

export const uploadProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Must be at least 1 character" })
    .max(50, { message: "Must be less than 50 characters" }),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .min(1, { message: "Must be at least 1" })
    .max(1000000, { message: "Must be less than 1,000,000" }),
  quantity: z.coerce
    .number()
    .min(1, { message: "Must be at least 1" })
    .max(1000000, { message: "Must be less than 1,000,000" }),
  category: z
    .string()
    .min(1, { message: "Must be at least 1 character" })
    .max(50, { message: "Must be less than 50 characters" }),
  subCategory: z
    .string()
    .min(1, { message: "Must select subcategory" })
    .max(50, { message: "Must be less than 50 characters" }),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      return true;
    }, "Must be an array of string")
    .optional()
    .nullable()
    .default(null),
});

export const productIdSchema = z.object({
  id: z.string(),
});

export const filterProductsSchema = z.object({
  take: z.number().optional(),
});
