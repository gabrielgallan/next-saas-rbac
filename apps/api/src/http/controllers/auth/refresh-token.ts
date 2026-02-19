import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'

export async function refreshToken(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch(
        '/sessions/refresh',
        {
            schema: {
                summary: 'Refresh user valid token',
                tags: ['auth'],
                response: {
                    200: z.object({
                        token: z.string()
                    })
                }
            }
        },
        async (request, reply) => {
            const userId = await request.getUserIdFromCookie()

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
        }
    )
}