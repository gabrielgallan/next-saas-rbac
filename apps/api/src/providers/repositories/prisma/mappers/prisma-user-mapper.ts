import { User } from "@saas/entities";
import { User as PrismaUser, Prisma } from "prisma/client";

export class PrismaUserMapper {
    static toEntity(raw: PrismaUser): User {
        const user = User.create({
            name: raw.name,
            email: raw.email,
            passwordHash: raw.passwordHash,
            createdAd: raw.createdAt,
            updatedAt: raw.updatedAt
        }, raw.id)

        return user
    }

    static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
        const prisma = {
            id: user.id,
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            createdAt: user.createdAd,
            updatedAt: user.updatedAt ?? undefined
        }

        return prisma
    }
}