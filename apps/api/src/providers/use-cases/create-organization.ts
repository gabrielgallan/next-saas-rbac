import { Organization } from "@saas/core"
import { OrgazinationAlreadyExistsError } from "./errors/organization-already-exists"
import createSlug from "../utils/create-slug"
import { OrganizationsRepository } from "../repositories/organizations-repository"

type CreateOrganizationUseCaseRequest = {
    userId: string
    name: string,
    domain?: string,
    shouldAttachUsersByDomain: boolean
}

type CreateOrganizationUseCaseResponse = {
    organization: Organization
}

export class CreateOrganizationUseCase {
    constructor(
        private organizationsRepository: OrganizationsRepository
    ) {}

    async execute({
        userId,
        name,
        domain,
        shouldAttachUsersByDomain
    }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
        if (domain) {
            const organizationWithSameDomain = await this.organizationsRepository.findByDomain(domain)
            
            if (organizationWithSameDomain) {
                throw new OrgazinationAlreadyExistsError()
            }
        }

        const organization = Organization.create({
            ownerId: userId,
            name,
            slug: createSlug(name),
            domain,
            shouldAttachUsersByDomain
        })

        await this.organizationsRepository.create(organization)

        return {
            organization,
        }
    }
}