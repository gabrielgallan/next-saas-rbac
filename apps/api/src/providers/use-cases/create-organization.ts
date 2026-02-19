import { prisma } from "@/lib/prisma"
import { Organization } from "prisma/client"
import { OrgazinationAlreadyExistsError } from "./errors/organization-already-exists"
import createSlug from "../utils/create-slug"

type CreateOrganizationUseCaseRequest = {
    userId: string
    name: string,
    domain?: string,
    shouldAttachUsersByDomain: boolean
}

type CreateOrganizationUseCaseResponse = {
    organization: Organization
}

export class CreateOrganizationUseCase {
    async execute({
        userId,
        name,
        domain,
        shouldAttachUsersByDomain
    }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
        const organizationWithSameDomain = await prisma.organization.findUnique({
            where: { domain }
        })

        if (organizationWithSameDomain) {
            throw new OrgazinationAlreadyExistsError()
        }

        const organization = await prisma.organization.create({
            data: {
                name,
                slug: createSlug(name),
                domain,
                shouldAttachUsersByDomain,
                userId,
                members: {
                    create: {
                        userId,
                        role: 'ADMIN'
                    }
                }
            }
        })

        return {
            organization,
        }
    }
}