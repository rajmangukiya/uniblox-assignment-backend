    import { z } from "zod";

export const AddToCartRequest = z
    .object({
        products: z.array(z.object({
            productId: z.string().trim(),
            quantity: z.number().int().min(1),
        })),
    })
    .strict();
export type AddToCartRequest = z.infer<typeof AddToCartRequest>;