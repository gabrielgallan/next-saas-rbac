import { PrismaUsersRepository } from "@/providers/repositories/prisma/prisma-users-repository";
import { ResetPasswordUseCase } from "../reset-password";
import { PrismaTokensRepository } from "@/providers/repositories/prisma/prisma-tokens-repository";

export function makeResetPasswordUseCase()
{
    const useCase = new ResetPasswordUseCase(
        new PrismaUsersRepository(),
        new PrismaTokensRepository()
    )

    return useCase
}