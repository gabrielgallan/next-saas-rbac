import { api } from './api-client'

interface HttpGetOrganizationsRequest {
    token: string
}

interface HttpGetOrganizationsResponse {
    organizations: any
}

export async function httpGetOrganizations({ token }: HttpGetOrganizationsRequest)
{
    const result = await api
        .get('organizations', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .json<HttpGetOrganizationsResponse>()

    return result
}