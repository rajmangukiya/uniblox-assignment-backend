import { z } from "zod";

export const AddCouponRequest = z.object({
    code: z.string().trim(),
    fixedDiscount: z.number().min(0),
    nThValue: z.number().min(0),
}).strict();
export type AddCouponRequest = z.infer<typeof AddCouponRequest>;