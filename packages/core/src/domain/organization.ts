import { Entity } from "./entity"

interface OrganizationProps {
    ownerId: string
    name: string
    slug: string
    domain?: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl?: string | null
    createdAt?: Date
    updatedAt?: Date | null
}

export class Organization extends Entity<OrganizationProps> {
    static create(
        props: OrganizationProps, 
        id?: string
    ) {
        const user = new Organization({
            ...props,
            domain: props.domain ?? null,
            avatarUrl: props.avatarUrl ?? null,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? null
        }, id)

        return user
    }

    get name() {
        return this.props.name
    }
}