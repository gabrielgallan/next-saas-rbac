import { OrganizationsRepository } from "../organizations-repository";
import { prisma } from "@/lib/prisma";
import { PrismaOrganizationMapper } from "./mappers/prisma-organization-mapper";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
    async findByDomainAndShouldAttach(domain: string) {
        const organization = await prisma.organization.findFirst({
            where: {
                domain,
                shouldAttachUsersByDomain: true
            }
        })

        if (!organization) {
            return null
        }

        return PrismaOrganizationMapper.toEntity(organization)
    }
}