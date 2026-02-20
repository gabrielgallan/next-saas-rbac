import { api } from './api-client'

type HTTPRecoverPasswordRequest = {
    email: string
}

type HTTPRecoverPasswordResponse = null

export async function HTTPRecoverPassword({
    email
}: HTTPRecoverPasswordRequest) {
    const result = await api
        .post('password/recover', {
            json: {
                email
            }
        })
        .json<HTTPRecoverPasswordResponse>()

    return result
}