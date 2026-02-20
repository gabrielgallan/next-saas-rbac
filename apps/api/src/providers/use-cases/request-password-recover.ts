import { ResourceNotFoundError } from "./errors/resource-not-found"
import { Token } from "prisma/client"
import { UsersRepository } from "../repositories/users-repository"
import { TokensRepository } from "../repositories/tokens-repository"

type RequestPasswordRecoverUseCaseRequest = {
  email: string
}

type RequestPasswordRecoverUseCaseResponse = {
  token: Token
}

export class RequestPasswordRecoverUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokensRepository: TokensRepository
  ) {}

  async execute(
    {
      email,
    }: RequestPasswordRecoverUseCaseRequest): Promise<RequestPasswordRecoverUseCaseResponse> {
    const userfromEmail = await this.usersRepository.findByEmail(email)

    if (!userfromEmail) {
      throw new ResourceNotFoundError()
    }

    const token = await this.tokensRepository.generate(
      userfromEmail.id,
      'PASSWORD_RECOVER'
    )

    return {
      token,
    }
  }
}