import { api } from './api-client'

type HTTPRegisterRequest = {
    name: string
    email: string
    password: string
}

type HTTPRegisterResponse = null

export async function HTTPRegister({
    name,
    email,
    password,
}: HTTPRegisterRequest) {
    const result = await api
        .post('accounts', {
            json: {
                name,
                email,
                password,
            },
        })
        .json<HTTPRegisterResponse>()

    return result
}