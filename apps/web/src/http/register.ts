import { api } from './api-client'

interface HttpRegisterRequest {
    name: string
    email: string
    password: string
}

interface HttpRegisterResponse {
}

export async function httpRegister({
    name,
    email,
    password,
}: HttpRegisterRequest) {
    const result = await api
        .post('accounts', {
            json: {
                name,
                email,
                password,
            },
        })
        .json<HttpRegisterResponse>()

    return result
}