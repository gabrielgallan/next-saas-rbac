import { User } from "@saas/core"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { UsersRepository } from "../repositories/users-repository"

type GetProfileUseCaseRequest = {
  userId: string
}

type GetProfileUseCaseResponse = {
  user: User
}

export class GetProfileUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({
    userId
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}