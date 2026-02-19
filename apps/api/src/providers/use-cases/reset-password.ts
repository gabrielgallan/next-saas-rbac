import { prisma } from "@/lib/prisma"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { hash } from "bcryptjs"

type ResetPasswordUseCaseRequest = {
    tokenId: string
    password: string
}

type ResetPasswordUseCaseResponse = void

export class ResetPasswordUseCase {
  async execute(
    {
        tokenId,
        password
    }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const token = await prisma.token.findUnique({
        where: { 
            id: tokenId,
            type: 'PASSWORD_RECOVER'
        }
    })

    if (!token) {
        throw new ResourceNotFoundError()
    }

    const passwordHash = await hash(password, 6)

    const user = await prisma.user.update({
        where: { 
            id: token.userId
        },
        data: {
            passwordHash
        }
    })

    return
  }
}