import { compare } from "bcryptjs"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { InvalidCredentialsError } from "./errors/invalid-credentials"
import { UsersRepository } from "../repositories/users-repository"

type AuthenticateWithPassUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateWithPassUseCaseResponse = {
  userId: string
}

export class AuthenticateWithPassUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateWithPassUseCaseRequest): Promise<AuthenticateWithPassUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

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