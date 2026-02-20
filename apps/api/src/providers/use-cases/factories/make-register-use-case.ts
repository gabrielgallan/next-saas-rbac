import { PrismaUsersRepository } from "@/providers/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";
import { PrismaOrganizationsRepository } from "@/providers/repositories/prisma/prisma-organizations-repository";

export function makeRegisterUseCase()
{
    const useCase = new RegisterUseCase(
        new PrismaUsersRepository(),
        new PrismaOrganizationsRepository()
    )

    return useCase
}