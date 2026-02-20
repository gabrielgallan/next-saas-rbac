import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { ResourceNotFoundError } from "@/providers/use-cases/errors/resource-not-found";
import { UnauthorizedError } from "@/http/errors/unauthorized-error";
import { makeResetPasswordUseCase } from "@/providers/use-cases/factories/make-reset-password-use-case";

export async function resetPassword(app: FastifyInstance)
{
    app.withTypeProvider<ZodTypeProvider>().patch(
        '/password',
        {
            schema: {
                summary: 'Reset user password',
                tags: ['auth'],
                body: z.object({
                    code: z.string(),
                    password: z.string().min(6)
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { code, password } = request.body

            const resetPassword = makeResetPasswordUseCase()

            try {
                await resetPassword.execute({
                    tokenId: code,
                    password
                })

                return reply.status(204).send(null)
            } catch (err) {
                if (err instanceof ResourceNotFoundError) {
                    throw new UnauthorizedError('Invalid recover code!')
                }

                throw err
            }
        }
    )
}