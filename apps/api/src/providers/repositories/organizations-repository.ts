import { User, Organization } from "@saas/core";

export interface OrganizationsRepository {
    findByDomainAndShouldAttach(domain: string): Promise<Organization | null>
}