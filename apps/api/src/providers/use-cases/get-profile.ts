import { prisma } from "@/lib/prisma"
import { User } from "prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found"

type GetProfileUseCaseRequest = {
    userId: string
}

type GetProfileUseCaseResponse = {
    user: User
}

export class GetProfileUseCase {
  async execute({
    userId
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
        user,
    }
  }
}