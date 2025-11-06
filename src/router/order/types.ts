    import { z } from "zod";

export const CreateOrderRequest = z
    .object({
        couponCode: z.string().trim().optional().nullable().default(null),
    })
    .strict();
export type CreateOrderRequest = z.infer<typeof CreateOrderRequest>;