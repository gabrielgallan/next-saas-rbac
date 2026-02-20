import z from 'zod'

export const roleSchema = z.union([z.literal('MEMBER'), z.literal('BILLING'), z.literal('ADMIN')])

export type RoleDTO = z.infer<typeof roleSchema>