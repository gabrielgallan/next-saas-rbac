import z from "zod";
import { roleSchema } from "../role";

export const inviteSchema = z.object({
    id: z.string().uuid(),
    authorId: z.string(),
    organizationId: z.string(),
    email: z.string().email(),
    role: roleSchema,
    createdAt: z.coerce.date(),
})

export type InviteDTO = z.infer<typeof inviteSchema>