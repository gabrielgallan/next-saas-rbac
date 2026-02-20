import z from "zod";

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    email: z.string().email(),
    avatarUrl: z.string().nullable(),
    passwordHash: z.string().min(6).nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullable()
})

export type UserDTO = z.infer<typeof userSchema>