import { User, Organization } from "@saas/core";

export interface UsersRepository {
    create(user: User, joinOrganization?: Organization): Promise<void>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    save(user: User): Promise<void>
}