import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { TransferOrganizationOwnershipUseCase } from '@/providers/use-cases/transfer-organization-ownership'
import { MemberIsNotPartOfOrgError } from '@/providers/use-cases/errors/member-is-not-part-of-org'
import { NotAllowedError } from '@/providers/use-cases/errors/not-allowed'
import { UnauthorizedError } from '@/http/errors/unauthorized-error'
import { BadRequestError } from '@/http/errors/bad-request-error'

export async function transferOrganization(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .patch(
            '/organizations/:slug/owner',
            {
                schema: {
                    tags: ['organizations'],
                    summary: 'Transfer organization ownership',
                    body: z.object({
                        transferToUserId: z.string().uuid(),
                    }),
                    params: z.object({
                        slug: z.string(),
                    }),
                    response: {
                        204: z.null(),
                    },
                },
            },
            async (request, reply) => {
                const { slug } = request.params

                const { membership, organization } = await request.getUserMembership(slug)

                const { transferToUserId } = request.body

                try {
                    await new TransferOrganizationOwnershipUseCase().execute({
                        membership,
                        organization,
                        transferToUserId
                    })

                    return reply.status(204).send(null)
                } catch (err) {
                    if (err instanceof MemberIsNotPartOfOrgError) {
                        throw new BadRequestError(err.message)
                    }

                    if (err instanceof NotAllowedError) {
                        throw new UnauthorizedError(err.message)
                    }

                    throw err
                }
            },
        )
}