import { UserAlreadyExistsError } from "./errors/user-already-exists"
import { UsersRepository } from "../repositories/users-repository"
import { OrganizationsRepository } from "../repositories/organizations-repository"
import { User } from "@saas/core"
import { hash } from "bcryptjs"

type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = void

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const [_, domain] = email.split('@')

    const autoJoinOrganization = await this.organizationsRepository
      .findByDomainAndShouldAttach(domain)

      const user = User.create({
        name,
        email,
        passwordHash: await hash(password, 6)
      })

    await this.usersRepository.create(user, autoJoinOrganization ?? undefined)

    return
  }
}