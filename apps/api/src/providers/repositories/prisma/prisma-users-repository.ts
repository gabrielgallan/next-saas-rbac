import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";
import { PrismaUserMapper } from "./mappers/prisma-user-mapper";
import { Organization, User } from "@saas/core";

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

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return null
        }

        return PrismaUserMapper.toEntity(user)
    }

    async save(user: User) {
        const data = PrismaUserMapper.toPrisma(user)

        await prisma.user.update({
            where: {
                id: user.id
            },
            data
        })

        return
    }
}