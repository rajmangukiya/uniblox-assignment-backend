    import { z } from "zod";

export const UpdateCartRequest = z
    .object({
        product: z.object({
            productId: z.string().trim(),
            quantity: z.number().int().min(1),
        }),
    })
    .strict();
export type UpdateCartRequest = z.infer<typeof UpdateCartRequest>;