import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { OrganizationSchema } from "prisma/client/zod";
import { z } from 'zod'

export async function getOrganization(app: FastifyInstance)
{
    app.withTypeProvider<ZodTypeProvider>().get(
        '/organizations/:slug',
        {
            schema: {
                summary: 'Get organization  details',
                tags: ['organizations'],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        organization: OrganizationSchema.omit({
                            userId: true,
                            shouldAttachUsersByDomain: true,
                            createdAt: true,
                            updatedAt: true
                        })
                    })
                }
            }
        },
        async (request, reply) => {
            const { slug } = request.params
            const { organization } = await request.getUserMembership(slug)

            return reply.status(200)
                .send({
                    organization: {
                        id: organization.id,
                        name: organization.name,
                        slug: organization.slug,
                        domain: organization.domain,
                        avatarUrl: organization.avatarUrl,
                    }
                })
        }
    )
}