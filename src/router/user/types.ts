import { z } from "zod";

export const CreateUserRequest = z
    .object({
        name: z.string().trim(),
        email: z.string().email().trim().transform((value) => value.toLowerCase()),
        password: z.string().trim().min(6),
    })
    .strict();
export type CreateUserRequest = z.infer<typeof CreateUserRequest>;

export const LoginUserRequest = z
    .object({
        email: z.string().email().trim().transform((value) => value.toLowerCase()),
        password: z.string().trim().min(6),
    })
    .strict();
export type LoginUserRequest = z.infer<typeof LoginUserRequest>;

export const CreateAdminRequest = z
    .object({
        name: z.string().trim(),
        email: z.string().email().trim().transform((value) => value.toLowerCase()),
        password: z.string().trim().min(6),
        masterPassword: z.string().trim().min(6),
    })
    .strict();
export type CreateAdminRequest = z.infer<typeof CreateAdminRequest>;