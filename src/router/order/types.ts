    import { z } from "zod";

export const CreateOrderRequest = z
    .object({
        products: z.array(z.object({
            productId: z.string().trim(),
            quantity: z.number().int().min(1),
        })),
    })
    .strict();
export type CreateOrderRequest = z.infer<typeof CreateOrderRequest>;