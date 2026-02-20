import { Entity } from "./entity"
import type { Optional } from "./optional"

interface OrganizationProps {
    ownerId: string
    name: string
    slug: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
}

export class Organization extends Entity<OrganizationProps> {
    static create(
        props: Optional<OrganizationProps, 'avatarUrl' | 'createdAt' | 'domain' | 'updatedAt'>, 
        id?: string
    ) {
        const user = new Organization({
            ...props,
            domain: props.domain ?? null,
            avatarUrl: props.avatarUrl ?? null,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }, id)

        return user
    }

    get name() {
        return this.props.name
    }
    
    get ownerId(): OrganizationProps['ownerId'] {
        return this.props.ownerId
    }

    get slug(): OrganizationProps['slug'] {
        return this.props.slug
    }

    get domain(): OrganizationProps['domain'] {
        return this.props.domain
    }

    get shouldAttachUsersByDomain(): OrganizationProps['shouldAttachUsersByDomain'] {
        return this.props.shouldAttachUsersByDomain
    }

    get avatarUrl(): OrganizationProps['avatarUrl'] {
        return this.props.avatarUrl
    }

    get createdAt(): OrganizationProps['createdAt'] {
        return this.props.createdAt
    }

    get updatedAt(): OrganizationProps['updatedAt'] {
        return this.props.updatedAt
    }

    set name(name: string) {
        this.props.name = name
    }

    set domain(domain: string) {
        this.props.domain = domain
    }

    set shouldAttachUsersByDomain(should: boolean) {
        this.props.shouldAttachUsersByDomain = should
    }
}