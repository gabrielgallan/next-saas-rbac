import { Account, AccountProvider, Prisma } from "prisma/client"

export interface AccountsRepository {
    create(data: Prisma.AccountCreateInput): Promise<void>
    findByProviderAndUserId(provider: AccountProvider, userId: string): Promise<Account | null>
}