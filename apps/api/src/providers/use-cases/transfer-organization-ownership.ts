import { prisma } from "@/lib/prisma"
import { organizationSchema, userSchema, defineAbilityFor } from "@saas/auth"
import { Member, Organization } from "prisma/client"
import { NotAllowedError } from "./errors/not-allowed"
import { MemberIsNotPartOfOrgError } from "./errors/member-is-not-part-of-org"

type TransferOrganizationOwnershipUseCaseRequest = {
  membership: Member
  organization: Organization
  transferToUserId: string
}

type TransferOrganizationOwnershipUseCaseResponse = void

export class TransferOrganizationOwnershipUseCase {
  async execute({
    membership,
    organization,
    transferToUserId
  }: TransferOrganizationOwnershipUseCaseRequest): Promise<TransferOrganizationOwnershipUseCaseResponse> {
    const transferMembership = await prisma.member.findUnique({
      where: {
        organizationId_userId: {
          organizationId: organization.id,
          userId: transferToUserId,
        },
      },
    })

    if (!transferMembership) {
      throw new MemberIsNotPartOfOrgError()
    }

    const authUser = userSchema.parse({
      id: membership.userId,
      role: membership.role
    })

    const authOrganization = organizationSchema.parse({
      id: organization.id,
      ownerId: organization.userId
    })

    const permissions = defineAbilityFor(authUser)

    if (permissions.cannot('transfer_ownership', authOrganization)) {
      throw new NotAllowedError()
    }

    await prisma.$transaction([
      prisma.member.update({
        where: {
          organizationId_userId: {
            organizationId: organization.id,
            userId: transferToUserId,
          },
        },
        data: {
          role: 'ADMIN',
        },
      }),
      prisma.organization.update({
        where: { id: organization.id },
        data: { userId: transferToUserId },
      }),
    ])

    return
  }
}