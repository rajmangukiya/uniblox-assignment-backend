    import { z } from "zod";

export const CreateOrderRequest = z
    .object({
        couponCode: z.string().trim().optional(),
    })
    .strict();
export type CreateOrderRequest = z.infer<typeof CreateOrderRequest>;