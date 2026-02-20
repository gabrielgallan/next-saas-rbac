import { UsersRepository } from "../repositories/users-repository"
import { User } from "@saas/core"
import { AccountsRepository } from "../repositories/accounts-repository"

type AuthenticateWithGithubUseCaseRequest = {
    githubId: string
    name: string | null
    email: string
    avatarUrl: string
}

type AuthenticateWithGithubUseCaseResponse = {
    userId: string
}

export class AuthenticateWithGithubUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private accountsRepository: AccountsRepository
    ) { }

    async execute({
        githubId,
        name,
        email,
        avatarUrl
    }: AuthenticateWithGithubUseCaseRequest): Promise<AuthenticateWithGithubUseCaseResponse> {
        let user = await this.usersRepository.findByEmail(email)

        if (!user) {
            user = User.create({
                name,
                email,
                avatarUrl
            })

            await this.usersRepository.create(user)
        }

        const account = await this.accountsRepository.findByProviderAndUserId(
            'GITHUB',
            user.id
        )

        if (!account) {
            await this.accountsRepository.create({
                provider: 'GITHUB',
                providerAccountId: githubId,
                user: {
                    connect: { id: user.id }
                }
            })
        }

        return {
            userId: user.id
        }
    }
}