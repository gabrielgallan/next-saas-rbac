import { PrismaUsersRepository } from "@/providers/repositories/prisma/prisma-users-repository";
import { GetProfileUseCase } from "../get-profile";

export function makeGetProfileUseCase()
{
    const useCase = new GetProfileUseCase(
        new PrismaUsersRepository(),
    )

    return useCase
}