import { UserDTO } from '@saas/core'
import { api } from './api-client'

interface HttpGetProfileRequest {
    token: string
}

interface HttpGetProfileResponse {
    user: Omit<UserDTO, 'id' | 'updatedAt' | 'passwordHash'>
}

export async function httpGetProfile({ token }: HttpGetProfileRequest)
{
    const result = await api
        .get('profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .json<HttpGetProfileResponse>()

    return result
}