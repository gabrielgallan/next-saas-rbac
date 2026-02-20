import { Role } from "@saas/auth/src/roles"
import { Organization } from "@saas/core"
import { OrganizationsRepository } from "../repositories/organizations-repository"
import { MembersRepository } from "../repositories/members-repository"

type GetMemberOrganizationsUseCaseRequest = {
    userId: string
}

type GetMemberOrganizationsUseCaseResponse = {
    memberOrganizations: {
        organization: Organization,
        roleInOrganization: Role
    }[]
}

export class GetMemberOrganizationsUseCase {
    constructor(
        private organizationsRepository: OrganizationsRepository,
        private membersRepository: MembersRepository,
    ) { }

    async execute({
        userId,
    }: GetMemberOrganizationsUseCaseRequest): Promise<GetMemberOrganizationsUseCaseResponse> {
        const organizations = await this.organizationsRepository.findManyFromMemberUserId(userId)

        const memberOrganizations = await Promise.all(
            organizations.map(async (org) => {
                return {
                    organization: org,
                    roleInOrganization: await this.membersRepository.findMemberRole(userId, org.id)
                }
            })
        )

        return {
            memberOrganizations
        }
    }
}