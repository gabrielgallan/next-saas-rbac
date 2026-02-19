import type { AbilityBuilder } from "@casl/ability"
import type { AppAbility } from "."
import type { User } from "./models/user"
import type { Role } from "./roles"

type PermissionsByRole = (
    user: User, 
    builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
    ADMIN: (user, { can }) => {
        can(['transfer_ownership', 'update'], 'Organization', {
            ownerId: { $eq: user.id }
        })
    },
    MEMBER: (user, { can }) => {
        can('get', 'User')
        can(['create', 'get'], 'Project')
        can(['delete', 'update'], 'Project', { ownerId: { $eq: user.id } })

        // can(['create', 'get', 'delete'], 'Invite')
    },
    BILLING: (_, { can }) => {
        can(['manage'], 'Billing')
    }
}