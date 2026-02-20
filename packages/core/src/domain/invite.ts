import type { RoleDTO } from "../role"
import { Entity } from "./entity"
import type { Optional } from "./optional"

interface InviteProps {
    authorId: string
    organizationId: string
    email: string
    role: RoleDTO,
    createdAt: Date
}

export class Invite extends Entity<InviteProps> {
    static create(
        props: Optional<InviteProps, 'createdAt'>, 
        id?: string
    ) {
        const user = new Invite({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id)

        return user
    }
}