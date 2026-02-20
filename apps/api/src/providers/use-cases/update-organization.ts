import { prisma } from "@/lib/prisma"
import { organizationSchema, userSchema, defineAbilityFor } from "@saas/auth"
import { Organization } from "prisma/client"
import { NotAllowedError } from "./errors/not-allowed"
import { OrgazinationAlreadyExistsError } from "./errors/organization-already-exists"

type UpdateOrganizationUseCaseRequest = {
    userId: string
    organization: Organization
    name?: string
    domain?: string
    shouldAttachUsersByDomain?: boolean
}

type UpdateOrganizationUseCaseResponse = void

export class UpdateOrganizationUseCase {
    async execute({
        userId,
        organization,
        name,
        domain,
        shouldAttachUsersByDomain
    }: UpdateOrganizationUseCaseRequest): Promise<UpdateOrganizationUseCaseResponse> {
        const membership = await prisma.member.findFirst({
            where: {
                userId,
                organizationId: organization.id
            }
        })

        if (!membership) {
            throw new NotAllowedError()
        }

        const authUser = userSchema.parse({
            id: userId,
            role: membership.role
        })

        const authOrganization = organizationSchema.parse({
            id: organization.id,
            ownerId: organization.userId
        })

        const permissions = defineAbilityFor(authUser)

        if (permissions.cannot('update', authOrganization)) {
            throw new NotAllowedError()
        }

        if (domain) {
            const otherOrganizationWithSameDomain = await prisma.organization.findFirst({
                where: {
                    domain,
                    slug: {
                        not: organization.slug
                    }
                }
            })

            if (otherOrganizationWithSameDomain) {
                throw new OrgazinationAlreadyExistsError()
            }
        }

        await prisma.organization.update({
            where: {
                id: organization.id
            }, 
            data: {
                name,
                domain,
                shouldAttachUsersByDomain
            }
        })

        return
    }
}