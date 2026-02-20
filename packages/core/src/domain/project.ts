import { Entity } from "./entity"
import type { Optional } from "./optional"

interface ProjectProps {
    ownerId: string
    organizationId: string
    name: string
    description: string
    slug: string
    createdAt: Date
    updatedAt: Date | null
}

export class Project extends Entity<ProjectProps> {
    static create(
        props: Optional<ProjectProps, 'createdAt' | 'updatedAt'>, 
        id?: string
    ) {
        const user = new Project({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? null
        }, id)

        return user
    }

    get name() {
        return this.props.name
    }
}