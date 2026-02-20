import { Role } from "@saas/auth/src/roles"
import { Member } from "prisma/client"

export interface MembersRepository {
    findMemberRole(userId: string, organizationId: string): Promise<Role>
    findByUserIdAndOrganizationId(userId: string, organizationId: string): Promise<Member>
}