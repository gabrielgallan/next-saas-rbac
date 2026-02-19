import { prisma } from "@/lib/prisma"
import { Organization } from "prisma/client"
import { OrgazinationAlreadyExistsError } from "./errors/organization-already-exists"
import createSlug from "../utils/create-slug"

type GetMemberOrganizationsUseCaseRequest = {
    userId: string
}

type GetMemberOrganizationsUseCaseResponse = {
    organizations: any
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