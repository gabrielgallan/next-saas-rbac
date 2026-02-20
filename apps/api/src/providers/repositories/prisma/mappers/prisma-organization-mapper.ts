import { Organization } from "@saas/core";
import { Organization as PrismaOrganization, Prisma } from "prisma/client";

export class PrismaOrganizationMapper {
    static toEntity(raw: PrismaOrganization): Organization {
        const organization = Organization.create({
            ownerId: raw.userId,
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

    // static toPrisma(organization: Organization): Prisma.OrganizationUncheckedCreateInput {
    //     const prisma = {
    //         id: organization.id,
    //         name: organization.name,
    //         createdAt: organization.createdAt,
    //         updatedAt: organization.updatedAt ?? undefined
    //     }

    //     return prisma
    // }
}