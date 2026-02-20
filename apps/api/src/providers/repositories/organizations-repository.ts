import { Organization } from "@saas/core";

export interface OrganizationsRepository {
    create(organization: Organization): Promise<void>
    findByDomain(domain: string): Promise<Organization | null>
    findById(id: string): Promise<Organization | null>
    findByDomainAndShouldAttach(domain: string): Promise<Organization | null>
    findManyFromMemberUserId(userId: string): Promise<Organization[]>
    save(organization: Organization): Promise<void>
}