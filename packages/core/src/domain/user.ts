import { Entity } from "./entity"

interface UserProps {
    name?: string | null
    email: string
    passwordHash?: string |null
    createdAt?: Date
    updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
    static create(
        props: UserProps, 
        id?: string
    ) {
        const user = new User({
            ...props,
            name: props.name ?? null,
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

    get passwordHash() {
        return this.props.passwordHash
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }
}