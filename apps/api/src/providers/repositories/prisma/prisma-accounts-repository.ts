import { AccountProvider } from "prisma/client";
import { AccountCreateInput } from "prisma/client/models";
import { AccountsRepository } from "../accounts-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAccountsRepository implements AccountsRepository {
    async create(data: AccountCreateInput) {
        await prisma.account.create({ data })

        return
    }

    async findByProviderAndUserId(
        provider: AccountProvider,
        userId: string
    ) {
        const account = await prisma.account.findUnique({
            where: {
                provider_userId: {
                    provider,
                    userId
                }
            }
        })

        return account
    }

}