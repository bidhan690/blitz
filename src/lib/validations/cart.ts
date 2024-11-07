import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, { message: "Must be at least 1" }),
});

export const cartSchema = z.object({
  cartId: z.string(),
});
