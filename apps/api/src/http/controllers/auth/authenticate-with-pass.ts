import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { AuthenticateWithPassUseCase } from "@/providers/use-cases/authenticate-with-pass";
import { ResourceNotFoundError } from "@/providers/use-cases/errors/resource-not-found";
import { InvalidCredentialsError } from "@/providers/use-cases/errors/invalid-credentials";
import { NotFoundError } from "@/http/errors/not-found-error";
import { BadRequestError } from "@/http/errors/bad-request-error";

export async function authenticateWithPass(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/sessions/password',
        {
            schema: {
                summary: 'Authenticate with password',
                tags: ['auth'],
                body: z.object({
                    email: z.string().email(),
                    password: z.string().min(6)
                }),
                response: {
                    201: z.object({
                        token: z.string()
                    })
                }
            }
        },
        async (request, reply) => {
            const { email, password } = request.body

            const authenticateWithPassUseCase = new AuthenticateWithPassUseCase()

            try {
                const { userId } = await authenticateWithPassUseCase.execute({
                    email, password
                })

                const token = await reply.jwtSign(
                    {
                        sub: userId
                    },
                    {
                        expiresIn: '1h'
                    }
                )

                const refreshToken = await reply.jwtSign(
                    {
                        sub: userId
                    },
                    {
                        expiresIn: '7d'
                    }
                )

                return reply
                    .setCookie('refreshToken', refreshToken)
                    .status(200)
                    .send({ token })
            } catch (err) {
                if (err instanceof ResourceNotFoundError) {
                    throw new NotFoundError(err.message)
                }

                if (err instanceof InvalidCredentialsError) {
                    throw new BadRequestError(err.message)
                }

                throw err
            }

        }
    )
}