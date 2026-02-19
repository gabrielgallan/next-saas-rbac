import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { ShutdownOrganizationUseCase } from "@/providers/use-cases/shutdown-organization";
import { NotAllowedError } from "@/providers/use-cases/errors/not-allowed";
import { UnauthorizedError } from "@/http/errors/unauthorized-error";

export async function shutdownOrganization(app: FastifyInstance)
{
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/organizations/:slug',
        {
            schema: {
                summary: 'Shutdown organization',
                tags: ['organizations'],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)

            const shutdownOrganizationUseCase = new ShutdownOrganizationUseCase()

            try {
                await shutdownOrganizationUseCase.execute({
                    membership,
                    organization,
                })

                return reply.status(204).send(null)
            } catch (err) {
                if (err instanceof NotAllowedError) {
                    throw new UnauthorizedError(`You're unauthorized to shutdown this organization`)
                }

                throw err
            }
        }
    )
}