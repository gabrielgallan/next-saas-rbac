import z from "zod";

export const projectSchema = z.object({
    id: z.string().uuid(),
    ownerId: z.string().uuid(),
    organizationId: z.string().uuid(),
    name: z.string().nullable(),
    description: z.string(),
    slug: z.string(),
    avatarUrl: z.string().url().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullable()
})

export type ProjectDTO = z.infer<typeof projectSchema>