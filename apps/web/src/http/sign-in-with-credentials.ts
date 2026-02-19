import { api } from './api-client'

interface HttpSignInWithCredentialsRequest {
  email: string
  password: string
}

interface HttpSignInWithCredentialsResponse {
  token: string
}

export async function httpSignInWithCredentials({
  email,
  password,
}: HttpSignInWithCredentialsRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<HttpSignInWithCredentialsResponse>()

  return result
}