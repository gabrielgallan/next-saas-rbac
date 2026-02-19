import { prisma } from "@/lib/prisma"

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
    async execute({
        githubId,
        name,
        email,
        avatarUrl
    }: AuthenticateWithGithubUseCaseRequest): Promise<AuthenticateWithGithubUseCaseResponse> {
        let user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    avatarUrl,
                },
            })
        }

        let account = await prisma.account.findUnique({
            where: {
                provider_userId: {
                    provider: 'GITHUB',
                    userId: user.id,
                },
            },
        })

        if (!account) {
            account = await prisma.account.create({
                data: {
                    provider: 'GITHUB',
                    providerAccountId: githubId,
                    userId: user.id,
                },
            })
        }

        return {
            userId: user.id
        }
    }
}