import { BadRequestError } from "@/http/errors/bad-request-error";
import { AuthenticateWithGithubUseCase } from "@/providers/use-cases/authenticate-with-github";
import { env } from "@saas/env";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'

export async function authenticateWithGithub(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/sessions/github',
        {
            schema: {
                summary: 'Authenticate with GitHub',
                tags: ['auth'],
                body: z.object({
                    code: z.string()
                }),
                response: {
                    201: z.object({
                        token: z.string()
                    })
                }
            }
        },
        async (request, reply) => {
            const { code } = request.body

            const githubOAuthURL = new URL(
                'https://github.com/login/oauth/access_token',
            )

            githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
            githubOAuthURL.searchParams.set('client_secret', env.GITHUB_OAUTH_CLIENT_SECRET)
            githubOAuthURL.searchParams.set('redirect_uri', env.GITHUB_OAUTH_CLIENT_REDIRECT_URI)
            githubOAuthURL.searchParams.set('code', code)

            const githubOAuthTokenResponse = await fetch(githubOAuthURL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                }
            })

            const githubOAuthTokenData = await githubOAuthTokenResponse.json()

            const schema = z.object({
                access_token: z.string(),
                token_type: z.literal('bearer'),
                scope: z.string()
            })

            const { access_token: githubAccessToken } = schema.parse(githubOAuthTokenData)

            const githubUserResponse = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${githubAccessToken}`,
                },
            })

            const githubUserData = await githubUserResponse.json()

            // console.log(githubUserData)

            const {
                id: githubId,
                name,
                email,
                avatar_url: avatarUrl
            } = z.object({
                id: z.number().int().transform(String),
                email: z.string().nullable(),
                name: z.string().nullable(),
                avatar_url: z.string().url()
            }).parse(githubUserData)

            if (!email) {
                throw new BadRequestError('Provide a e-mail in your github account to authenticate!')
            }

            const { userId } = await new AuthenticateWithGithubUseCase().execute({
                githubId,
                name,
                email,
                avatarUrl
            })

            const token = await reply.jwtSign(
                {
                    sub: userId
                },
                {
                    expiresIn: '1h'
                }
            )

            const refreshToken = await reply.jwtSign(
                {
                    sub: userId
                },
                {
                    expiresIn: '7d'
                }
            )

            return reply
                .setCookie('refreshToken', refreshToken)
                .status(201)
                .send({ token })
        }
    )
}