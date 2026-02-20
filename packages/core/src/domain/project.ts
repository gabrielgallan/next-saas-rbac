import { Entity } from "./entity"

interface ProjectProps {
    ownerId: string
    organizationId: string
    name: string
    description: string
    slug: string
    avatarUrl?: string | null
    createdAt?: Date
    updatedAt?: Date | null
}

export class Project extends Entity<ProjectProps> {
    static create(
        props: ProjectProps, 
        id?: string
    ) {
        const user = new Project({
            ...props,
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