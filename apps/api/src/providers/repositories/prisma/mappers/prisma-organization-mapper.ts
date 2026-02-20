import { Organization } from "@saas/core";
import { Organization as PrismaOrganization } from "prisma/client";

export class PrismaOrganizationMapper {
    static toEntity(raw: PrismaOrganization): Organization {
        const organization = Organization.create({
            ownerId: raw.ownerId,
            name: raw.name,
            slug: raw.slug,
            domain: raw.domain,
            shouldAttachUsersByDomain: raw.shouldAttachUsersByDomain,
            avatarUrl: raw.avatarUrl,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt
        }, raw.id)

        return organization
    }

    static toPrisma(organization: Organization): PrismaOrganization {
        return {
            id: organization.id,
            ownerId: organization.ownerId,
            name: organization.name,
            slug: organization.slug,
            domain: organization.domain ?? null,
            shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
            avatarUrl: organization.avatarUrl,
            createdAt: organization.createdAt,
            updatedAt: organization.updatedAt
        }
    }
}