import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";
import { PrismaUserMapper } from "./mappers/prisma-user-mapper";
import { Organization, User } from "@saas/entities";

export class PrismaUsersRepository implements UsersRepository {
    async create(user: User, joinOrganization?: Organization) {
        const prismaUser = PrismaUserMapper.toPrisma(user)

        await prisma.user.create({
            data: {
                ...prismaUser,
                members_on: joinOrganization ?
                {
                    create: {
                        organizationId: joinOrganization.id
                    }
                } : undefined
            }
        })
        
        return
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return null
        }

        return PrismaUserMapper.toEntity(user)
    }
}