import type { RoleDTO } from "../role"
import { Entity } from "./entity"

interface InviteProps {
    authorId: string
    organizationId: string
    email: string
    role: RoleDTO,
    createdAt?: Date
}

export class Invite extends Entity<InviteProps> {
    static create(
        props: InviteProps, 
        id?: string
    ) {
        const user = new Invite({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id)

        return user
    }
}