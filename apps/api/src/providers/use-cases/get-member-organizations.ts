import { prisma } from "@/lib/prisma"

type GetMemberOrganizationsUseCaseRequest = {
    userId: string
}

type GetMemberOrganizationsUseCaseResponse = {
    organizations: unknown
}

export class GetMemberOrganizationsUseCase {
    async execute({
        userId,
    }: GetMemberOrganizationsUseCaseRequest): Promise<GetMemberOrganizationsUseCaseResponse> {
        const organizations = await prisma.organization.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                avatarUrl: true,
                members: {
                    select: {
                        role: true
                    },
                    where: {
                        userId
                    }
                }
            },
            where: {
                members: {
                    some: {
                        userId
                    }
                }
            }
        })

        const organizationsWithUserRole = organizations.map(
          ({ members, ...org }) => {
            return {
              ...org,
              role: members[0].role,
            }
          },
        )

        return {
            organizations: organizationsWithUserRole,
        }
    }
}