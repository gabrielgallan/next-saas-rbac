import { prisma } from "@/lib/prisma"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { Token } from "prisma/client"

type RequestPasswordRecoverUseCaseRequest = {
  email: string
}

type RequestPasswordRecoverUseCaseResponse = {
    token: Token
}

export class RequestPasswordRecoverUseCase {
  async execute(
    {
        email,
    }: RequestPasswordRecoverUseCaseRequest): Promise<RequestPasswordRecoverUseCaseResponse> {
    const userfromEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (!userfromEmail) {
      throw new ResourceNotFoundError()
    }

    const token = await prisma.token.create({
      data: {
        userId: userfromEmail.id,
        type: 'PASSWORD_RECOVER'
      }
    })

    return {
        token,
    }
  }
}