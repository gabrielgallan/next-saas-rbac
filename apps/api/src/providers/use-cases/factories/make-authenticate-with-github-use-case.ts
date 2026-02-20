import { PrismaUsersRepository } from "@/providers/repositories/prisma/prisma-users-repository";
import { AuthenticateWithGithubUseCase } from "../authenticate-with-github";
import { PrismaAccountsRepository } from "@/providers/repositories/prisma/prisma-accounts-repository";

export function makeAuthenticateWithGithubUseCase()
{
    const useCase = new AuthenticateWithGithubUseCase(
        new PrismaUsersRepository(),
        new PrismaAccountsRepository()
    )

    return useCase
}