import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { RegisterUseCase } from "@/providers/use-cases/register";
import { UserAlreadyExistsError } from "@/providers/use-cases/errors/user-already-exists";
import { ConflictError } from "@/http/errors/conflict-error";
import { PrismaUsersRepository } from "@/providers/repositories/prisma/prisma-users-repository";
import { PrismaOrganizationsRepository } from "@/providers/repositories/prisma/prisma-organizations-repository";

export async function register(app: FastifyInstance)
{
    app.withTypeProvider<ZodTypeProvider>().post(
        '/accounts',
        {
            schema: {
                summary: 'Create a new account',
                tags: ['auth'],
                body: z.object({
                    name: z.string(),
                    email: z.string().email(),
                    password: z.string().min(6)
                }),
                response: {
                    201: z.null()
                }
            }
        },
        async (request, reply) => {
            const { name, email, password } = request.body

            const registerUseCase = new RegisterUseCase(
                new PrismaUsersRepository(),
                new PrismaOrganizationsRepository()
            )

            try {
                await registerUseCase.execute({
                    name, email, password
                })

                return reply.status(201).send(null)
            } catch (err) {
                if (err instanceof UserAlreadyExistsError) {
                    throw new ConflictError(err.message)
                }

                throw err
            }
        }
    )
}