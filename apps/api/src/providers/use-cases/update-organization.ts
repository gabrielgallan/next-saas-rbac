import { organizationSchema, userSchema, defineAbilityFor } from "@saas/auth"
import { NotAllowedError } from "./errors/not-allowed"
import { OrgazinationAlreadyExistsError } from "./errors/organization-already-exists"
import { MembersRepository } from "../repositories/members-repository"
import { OrganizationsRepository } from "../repositories/organizations-repository"

type UpdateOrganizationUseCaseRequest = {
    userId: string
    organizationId: string
    name?: string
    domain?: string
    shouldAttachUsersByDomain?: boolean
}

type UpdateOrganizationUseCaseResponse = void

export class UpdateOrganizationUseCase {
    constructor(
        private membersRepository: MembersRepository,
        private organizationRepository: OrganizationsRepository
    ) {}

    async execute({
        userId,
        organizationId,
        name,
        domain,
        shouldAttachUsersByDomain
    }: UpdateOrganizationUseCaseRequest): Promise<UpdateOrganizationUseCaseResponse> {
        const membership = await this.membersRepository.findByUserIdAndOrganizationId(
            userId,
            organizationId
        )

        const organization = await this.organizationRepository.findById(organizationId)

        if (!membership || !organization) {
            throw new NotAllowedError()
        }

        const authUser = userSchema.parse({
            id: userId,
            role: membership.role
        })

        const authOrganization = organizationSchema.parse({
            id: organization.id,
            ownerId: organization.ownerId
        })

        const permissions = defineAbilityFor(authUser)

        if (permissions.cannot('update', authOrganization)) {
            throw new NotAllowedError()
        }

        if (domain) {
            const otherOrganizationWithSameDomain = await this.organizationRepository.findByDomain(domain)

            if (otherOrganizationWithSameDomain) {
                throw new OrgazinationAlreadyExistsError()
            }

            organization.domain = domain
        }

        if (name) {
            organization.name = name
        }

        if (shouldAttachUsersByDomain) {
            organization.shouldAttachUsersByDomain = shouldAttachUsersByDomain
        }

        await this.organizationRepository.save(organization)

        return
    }
}