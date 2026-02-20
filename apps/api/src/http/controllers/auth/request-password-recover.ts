import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { ResourceNotFoundError } from "@/providers/use-cases/errors/resource-not-found";
import { makeRequestPasswordRecoverUseCase } from "@/providers/use-cases/factories/make-request-password-recover-use-case";

export async function requestPasswordRecover(app: FastifyInstance)
{
    app.withTypeProvider<ZodTypeProvider>().post(
        '/password/recover',
        {
            schema: {
                summary: 'Request a password recover',
                tags: ['auth'],
                body: z.object({
                    email: z.string().email(),
                }),
                response: {
                    201: z.null()
                }
            }
        },
        async (request, reply) => {
            const { email } = request.body

            const requestPasswordRecoverUseCase = makeRequestPasswordRecoverUseCase()

            try {
                await requestPasswordRecoverUseCase.execute({
                    email
                })

                // -> Send an e-mail with password recover link

                return reply.status(201).send(null)
            } catch (err) {
                if (err instanceof ResourceNotFoundError) {
                    return reply.status(201).send(null)
                }

                throw err
            }
        }
    )
}