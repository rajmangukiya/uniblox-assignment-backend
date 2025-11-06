import { z } from "zod";

export const AddProductRequest = z.object({
    products: z.array(z
        .object({
            title: z.string().trim(),
            description: z.string().trim(),
            image: z.string().trim(),
            price: z.number().min(0),
        })
    )
}).strict();
export type AddProductRequest = z.infer<typeof AddProductRequest>;