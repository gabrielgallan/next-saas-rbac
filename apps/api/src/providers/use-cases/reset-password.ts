import { ResourceNotFoundError } from "./errors/resource-not-found"
import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository"
import { TokensRepository } from "../repositories/tokens-repository"

type ResetPasswordUseCaseRequest = {
    tokenId: string
    password: string
}

type ResetPasswordUseCaseResponse = void

export class ResetPasswordUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private tokensRepository: TokensRepository,

    ) {}

  async execute(
    {
        tokenId,
        password
    }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const token = await this.tokensRepository.findByIdAndType(
        tokenId,
        'PASSWORD_RECOVER'
    )

    if (!token) {
        throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.findById(token.userId)

    if (!user) {
        throw new ResourceNotFoundError()
    }

    const passwordHash = await hash(password, 6)

    user.passwordHash = passwordHash

    await this.usersRepository.save(user)

    return
  }
}