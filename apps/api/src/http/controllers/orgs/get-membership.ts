import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { ConflictError } from "@/http/errors/conflict-error";
import { CreateOrganizationUseCase } from "@/providers/use-cases/create-organization";
import { OrgazinationAlreadyExistsError } from "@/providers/use-cases/errors/organization-already-exists";
import { MemberSchema } from "prisma/client/zod";

export async function getMembership(app: FastifyInstance)
{
    app.withTypeProvider<ZodTypeProvider>().get(
        '/organizations/:slug/membership',
        {
            schema: {
                summary: 'Get membership on organization',
                tags: ['organizations'],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        membership: MemberSchema.omit({
                            userId: true
                        })
                    })
                }
            }
        },
        async (request, reply) => {
            const { slug } = request.params
            const { membership } = await request.getUserMembership(slug)

            return reply.status(200)
                .send({
                    membership: {
                        id: membership.id,
                        role: membership.role,
                        organizationId: membership.organizationId
                    }
                })
        }
    )
}