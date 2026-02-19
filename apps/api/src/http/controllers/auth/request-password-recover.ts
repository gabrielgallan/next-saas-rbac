import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { RegisterUseCase } from "@/providers/use-cases/register";
import { UserAlreadyExistsError } from "@/providers/use-cases/errors/user-already-exists";
import { ConflictError } from "@/http/errors/conflict-error";
import { ResourceNotFoundError } from "@/providers/use-cases/errors/resource-not-found";
import { RequestPasswordRecoverUseCase } from "@/providers/use-cases/request-password-recover";

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

            const requestPasswordRecoverUseCase = new RequestPasswordRecoverUseCase()

            try {
                const { token } = await requestPasswordRecoverUseCase.execute({
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