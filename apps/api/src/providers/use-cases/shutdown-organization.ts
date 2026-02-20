import { prisma } from "@/lib/prisma"
import { organizationSchema, userSchema, defineAbilityFor } from "@saas/auth"
import { Member, Organization } from "prisma/client"
import { NotAllowedError } from "./errors/not-allowed"

type ShutdownOrganizationUseCaseRequest = {
    membership: Member
    organization: Organization
}

type ShutdownOrganizationUseCaseResponse = void

export class ShutdownOrganizationUseCase {
    async execute({
        membership,
        organization,
    }: ShutdownOrganizationUseCaseRequest): Promise<ShutdownOrganizationUseCaseResponse> {
        const authUser = userSchema.parse({
            id: membership.userId,
            role: membership.role
        })

        const authOrganization = organizationSchema.parse({
            id: organization.id,
            ownerId: organization.ownerId
        })

        const permissions = defineAbilityFor(authUser)

        if (permissions.cannot('delete', authOrganization)) {
            throw new NotAllowedError()
        }

        await prisma.organization.delete({
            where: {
                id: organization.id
            }
        })

        return
    }
}