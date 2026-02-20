import { api } from './api-client'

type HTTPSignInWithCredentialsRequest = {
  email: string
  password: string
}

type HTTPSignInWithCredentialsResponse = {
  token: string
}

export async function HTTPSignInWithCredentials({
  email,
  password,
}: HTTPSignInWithCredentialsRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<HTTPSignInWithCredentialsResponse>()

  return result
}