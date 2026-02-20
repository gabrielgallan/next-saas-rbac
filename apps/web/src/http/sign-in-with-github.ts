import { api } from './api-client'

type HTTPSignInWithGithubRequest = {
    code: string
}

type HTTPSignInWithGithubResponse = {
    token: string
}

export async function HTTPSignInWithGithub({
    code
}: HTTPSignInWithGithubRequest) {
    const result = await api
        .post('sessions/github', {
            json: {
                code,
            },
        })
        .json<HTTPSignInWithGithubResponse>()

    return result
}