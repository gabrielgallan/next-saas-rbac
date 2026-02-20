import { TokenType } from "prisma/client";
import { TokensRepository } from "../tokens-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTokensRepository implements TokensRepository {
    async generate(userId: string, type: TokenType) {
        const token = await prisma.token.create({
            data: {
                userId,
                type
            }
        })

        return token
    }

    async findByIdAndType(id: string, type: TokenType) {
        const token = await prisma.token.findUnique({
            where: {
                id,
                type
            }
        })

        return token
    }

}