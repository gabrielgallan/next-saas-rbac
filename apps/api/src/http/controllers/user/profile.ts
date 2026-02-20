import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from 'zod';
import { ResourceNotFoundError } from "@/providers/use-cases/errors/resource-not-found";
import { NotFoundError } from "@/http/errors/not-found-error";
import { userSchema } from "@saas/core";
import { makeGetProfileUseCase } from "@/providers/use-cases/factories/make-get-profile-use-case";

export async function profile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/profile',
        {
            schema: {
                summary: 'Get user profile',
                tags: ['user'],
                response: {
                    200: z.object({
                        user: userSchema.pick({
                            name: true,
                            email: true,
                            avatarUrl: true
                        })
                    })
                }
            }
        },
        async (request, reply) => {
            const userId = await request.getCurrentUserId()

            const getProfileUseCase = makeGetProfileUseCase()

            try {
                const { user } = await getProfileUseCase.execute({
                    userId,
                })

                return reply.status(200).send({
                    user: {
                        name: user.name ?? null,
                        email: user.email,
                        avatarUrl: user.avatarUrl ?? null
                    }
                })
            } catch (err) {
                if (err instanceof ResourceNotFoundError) {
                    throw new NotFoundError(err.message)
                }

                throw err
            }
        }
    )
}