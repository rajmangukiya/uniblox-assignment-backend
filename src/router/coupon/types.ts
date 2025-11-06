import { z } from "zod";

export const AddCouponRequest = z.object({
    code: z.string().trim(),
    percentageDiscount: z.number().min(0).max(100).optional().nullable().default(10),
    nThValue: z.number().min(0),
}).strict();
export type AddCouponRequest = z.infer<typeof AddCouponRequest>;