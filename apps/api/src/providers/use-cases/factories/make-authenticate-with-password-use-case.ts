import { PrismaUsersRepository } from "@/providers/repositories/prisma/prisma-users-repository";
import { AuthenticateWithPassUseCase } from "../authenticate-with-pass";

export function makeAuthenticateWithPassUseCase()
{
    const useCase = new AuthenticateWithPassUseCase(
        new PrismaUsersRepository(),
    )

    return useCase
}