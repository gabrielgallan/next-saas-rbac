import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from 'zod'
import { UserSchema } from "prisma/client/zod"
import { GetProfileUseCase } from "@/providers/use-cases/get-profile";
import { ResourceNotFoundError } from "@/providers/use-cases/errors/resource-not-found";
import { NotFoundError } from "@/http/errors/not-found-error";

export async function profile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/profile',
        {
            schema: {
                summary: 'Get user profile',
                tags: ['user'],
                response: {
                    200: z.object({
                        user: UserSchema.omit({
                            id: true,
                            passwordHash: true,
                        })
                    })
                }
            }
        },
        async (request, reply) => {
            const userId = await request.getCurrentUserId()

            const getProfileUseCase = new GetProfileUseCase()

            try {
                const { user } = await getProfileUseCase.execute({
                    userId,
                })

                return reply.status(200).send({
                    user
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