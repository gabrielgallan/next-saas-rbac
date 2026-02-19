import { GetMemberOrganizationsUseCase } from "@/providers/use-cases/get-member-organizations";
import { roleSchema } from "@saas/auth/src/roles";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'

export async function getOrganizations(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/organizations',
        {
            schema: {
                summary: 'Get organization where user is member',
                tags: ['organizations'],
                response: {
                    200: z.object({
                        organizations: z.array(
                            z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                                slug: z.string(),
                                avatarUrl: z.string().url().nullable(),
                                role: roleSchema,
                            }),
                        ),
                    })
                }
            }
        },
        async (request, reply) => {
            const userId = await request.getCurrentUserId()

            const { organizations } = await new GetMemberOrganizationsUseCase().execute({
                userId
            })

            return reply.status(200)
                .send({
                    organizations
                })
        }
    )
}