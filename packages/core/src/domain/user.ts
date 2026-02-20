import { Entity } from "./entity"
import type { Optional } from "./optional"

interface UserProps {
    name: string | null
    email: string
    avatarUrl: string | null
    passwordHash: string |null
    createdAt: Date
    updatedAt: Date | null
}

export class User extends Entity<UserProps> {
    static create(
        props: Optional<UserProps, 'name' | 'avatarUrl' | 'passwordHash' | 'createdAt' | 'updatedAt'>, 
        id?: string
    ) {
        const user = new User({
            ...props,
            name: props.name ?? null,
            avatarUrl: props.avatarUrl ?? null,
            passwordHash: props.passwordHash ?? null,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? null
        }, id)

        return user
    }

    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
    }

    get avatarUrl() {
        return this.props.avatarUrl
    }

    get passwordHash() {
        return this.props.passwordHash
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    set passwordHash(password: string | null) {
        this.props.passwordHash = password
    }
}