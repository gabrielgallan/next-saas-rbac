import { OrganizationsRepository } from "../organizations-repository";
import { prisma } from "@/lib/prisma";
import { PrismaOrganizationMapper } from "./mappers/prisma-organization-mapper";
import { Organization } from "@saas/core";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
    async findManyFromMemberUserId(userId: string) {
        const organizations = await prisma.organization.findMany({
            where: {
                members: {
                    some: {
                        userId
                    }
                }
            }
        })

        return organizations.map(PrismaOrganizationMapper.toEntity)
    }

    async create(organization: Organization) {
        const data = PrismaOrganizationMapper.toPrisma(organization)

        await prisma.organization.create({
            data: {
                ...data,
                members: {
                    create: {
                        userId: data.ownerId,
                        role: 'ADMIN'
                    }
                }
            }
        })

        return
    }

    async findByDomain(domain: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                domain,
            }
        })

        if (!organization) {
            return null
        }

        return PrismaOrganizationMapper.toEntity(organization)
    }

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