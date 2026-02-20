import { TokenType, Token } from "prisma/client";

export interface TokensRepository {
    generate(userId: string, type: TokenType): Promise<Token>
    findByIdAndType(id: string, type: TokenType): Promise<Token | null>
}