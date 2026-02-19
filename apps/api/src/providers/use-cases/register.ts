import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists"
import { User } from "@saas/entities"
import { PrismaUserMapper } from "../repositories/prisma/mappers/prisma-user-mapper"

type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = {
  user: User
}

export class RegisterUseCase {
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const [_, domain] = email.split('@')

    const autoJoinOrganization = await prisma.organization.findFirst({
      where: {
        domain,
        shouldAttachUsersByDomain: true
      }
    })

    const prismaUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hash(password, 6),
        members_on: autoJoinOrganization
          ? {
              create: {
                organizationId: autoJoinOrganization.id
              }
            } 
          : undefined
      }
    })

    const user = PrismaUserMapper.toEntity(prismaUser)

    return {
      user
    }
  }
}