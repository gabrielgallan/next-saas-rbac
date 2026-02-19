import { User, Organization } from "@saas/entities";

export interface UsersRepository {
    create(user: User, joinOrganization?: Organization): Promise<void>
    findByEmail(email: string): Promise<User | null>
}