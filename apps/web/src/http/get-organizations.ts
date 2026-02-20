import { OrganizationDTO } from '@saas/core'
import { api } from './api-client'

type HTTPGetOrganizationsRequest = {
    token: string
}

type HTTPGetOrganizationsResponse = {
    organizations: OrganizationDTO[]
}

export async function HTTPGetOrganizations({ token }: HTTPGetOrganizationsRequest)
{
    const result = await api
        .get('organizations', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .json<HTTPGetOrganizationsResponse>()

    return result
}