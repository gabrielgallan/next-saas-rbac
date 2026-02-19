import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { ConflictError } from "@/http/errors/conflict-error";
import { CreateOrganizationUseCase } from "@/providers/use-cases/create-organization";
import { OrgazinationAlreadyExistsError } from "@/providers/use-cases/errors/organization-already-exists";

export async function createOrganization(app: FastifyInstance)
{
    app.withTypeProvider<ZodTypeProvider>().post(
        '/organizations',
        {
            schema: {
                summary: 'Create a new organization',
                tags: ['organizations'],
                body: z.object({
                    name: z.string(),
                    domain: z.string().nullish(),
                    shouldAttachUsersByDomain: z.boolean()
                }),
                response: {
                    201: z.object({
                        organizationId: z.string()
                    })
                }
            }
        },
        async (request, reply) => {
            const { name, domain, shouldAttachUsersByDomain } = request.body

            const userId = await request.getCurrentUserId()

            const createOrganizationUseCase = new CreateOrganizationUseCase()

            try {
                const { organization } = await createOrganizationUseCase.execute({
                    userId,
                    name,
                    domain: domain ?? undefined,
                    shouldAttachUsersByDomain
                })

                return reply.status(201).send({
                    organizationId: organization.id
                })
            } catch (err) {
                if (err instanceof OrgazinationAlreadyExistsError) {
                    throw new ConflictError(err.message)
                }

                throw err
            }
        }
    )
}