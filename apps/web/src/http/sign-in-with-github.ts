import { api } from './api-client'

interface HttpSignInWithGithubRequest {
    code: string
}

interface HttpSignInWithGithubResponse {
    token: string
}

export async function httpSignInWithGithub({
    code
}: HttpSignInWithGithubRequest) {
    const result = await api
        .post('sessions/github', {
            json: {
                code,
            },
        })
        .json<HttpSignInWithGithubResponse>()

    return result
}