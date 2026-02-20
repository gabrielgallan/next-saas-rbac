import z from "zod";

export const organizationSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    slug: z.string(),
    domain: z.string().nullable(),
    shouldAttachUsersByDomain: z.boolean(),
    avatarUrl: z.string().url().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullable()
})

export type OrganizationDTO = z.infer<typeof organizationSchema>