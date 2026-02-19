import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { ConflictError } from "@/http/errors/conflict-error";
import { OrgazinationAlreadyExistsError } from "@/providers/use-cases/errors/organization-already-exists";
import { UpdateOrganizationUseCase } from "@/providers/use-cases/update-organization";
import { NotAllowedError } from "@/providers/use-cases/errors/not-allowed";
import { UnauthorizedError } from "@/http/errors/unauthorized-error";

export async function updateOrganization(app: FastifyInstance)
{
    app.withTypeProvider<ZodTypeProvider>().put(
        '/organizations/:slug',
        {
            schema: {
                summary: 'Update organization',
                tags: ['organizations'],
                params: z.object({
                    slug: z.string()
                }),
                body: z.object({
                    name: z.string().optional(),
                    domain: z.string().optional(),
                    shouldAttachUsersByDomain: z.boolean().optional()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { slug } = request.params
            const { name, domain, shouldAttachUsersByDomain } = request.body

            const { membership, organization } = await request.getUserMembership(slug)

            const updateOrganizationUseCase = new UpdateOrganizationUseCase()

            try {
                await updateOrganizationUseCase.execute({
                    membership,
                    organization,
                    name,
                    domain,
                    shouldAttachUsersByDomain
                })

                return reply.status(204).send(null)
            } catch (err) {
                if (err instanceof NotAllowedError) {
                    throw new UnauthorizedError(`You're unauthorized to update this organization`)
                }
                if (err instanceof OrgazinationAlreadyExistsError) {
                    throw new ConflictError(err.message)
                }

                throw err
            }
        }
    )
}