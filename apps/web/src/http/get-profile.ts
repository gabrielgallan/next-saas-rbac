import { UserDTO } from '@saas/core'
import { api } from './api-client'

type HTTPGetProfileRequest = {
    token: string
}

type HTTPGetProfileResponse = {
    user: Omit<UserDTO, 'id' | 'updatedAt' | 'passwordHash'>
}

export async function HTTPGetProfile({ token }: HTTPGetProfileRequest)
{
    const result = await api
        .get('profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .json<HTTPGetProfileResponse>()

    return result
}