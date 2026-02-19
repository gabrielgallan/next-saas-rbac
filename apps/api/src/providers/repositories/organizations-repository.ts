import { User, Organization } from "@saas/entities";

export interface OrganizationsRepository {
    findByDomainAndShouldAttach(domain: string): Promise<Organization | null>
}