import { PrismaUsersRepository } from "@/providers/repositories/prisma/prisma-users-repository";
import { RequestPasswordRecoverUseCase } from "../request-password-recover";
import { PrismaTokensRepository } from "@/providers/repositories/prisma/prisma-tokens-repository";
import { NodemailerEmailService } from "@/providers/email/nodemailer/nodemailer-email-service";

export function makeRequestPasswordRecoverUseCase()
{
    const useCase = new RequestPasswordRecoverUseCase(
        new PrismaUsersRepository(),
        new PrismaTokensRepository(),
        new NodemailerEmailService()
    )

    return useCase
}