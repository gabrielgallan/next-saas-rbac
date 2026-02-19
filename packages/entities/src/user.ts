import { randomUUID } from "node:crypto"

interface UserProps {
    name?: string | null
    email: string
    passwordHash?: string |null
    createdAd?: Date
    updatedAt?: Date | null
}

export class User {
    private props: UserProps
    private _id: string

    private constructor(props: UserProps, _id?: string) {
        this.props = props
        this._id = _id ?? randomUUID()
    }

    static create(
        props: UserProps, 
        id: string
    ) {
        return new User(props, id)
    }

    get id() {
        return this._id
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

    get createdAd() {
        return this.props.createdAd
    }

    get updatedAt() {
        return this.props.updatedAt
    }
}