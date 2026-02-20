import { ResourceNotFoundError } from "./errors/resource-not-found"
import { Token } from "prisma/client"
import { UsersRepository } from "../repositories/users-repository"
import { TokensRepository } from "../repositories/tokens-repository"
import { EmailService } from "../email/email-service"
import { CreatePasswordRecoverProps } from "../email/nodemailer/props/create-password-recover-props"

type RequestPasswordRecoverUseCaseRequest = {
  email: string
}

type RequestPasswordRecoverUseCaseResponse = {
  token: Token
}

export class RequestPasswordRecoverUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokensRepository: TokensRepository,
    private emailService: EmailService
  ) { }

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

    const emailProps = CreatePasswordRecoverProps(token.id)

    await this.emailService.send(
      email,
      emailProps
    )

    return {
      token,
    }
  }
}