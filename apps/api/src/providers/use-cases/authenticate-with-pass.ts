import { prisma } from "@/lib/prisma"
import { compare, hash } from "bcryptjs"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { InvalidCredentialsError } from "./errors/invalid-credentials"

type AuthenticateWithPassUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateWithPassUseCaseResponse = {
  userId: string
}

export class AuthenticateWithPassUseCase {
  async execute({
    email,
    password,
  }: AuthenticateWithPassUseCaseRequest): Promise<AuthenticateWithPassUseCaseResponse> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.passwordHash) {
      throw new ResourceNotFoundError()
    }

    const isPasswordCorrect = await compare(password, user.passwordHash)

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    return {
      userId: user.id
    }
  }
}