import { BadGatewayError } from "@/http/errors/bad-gateway-error";
import { BadRequestError } from "@/http/errors/bad-request-error";
import { makeAuthenticateWithGithubUseCase } from "@/providers/use-cases/factories/make-authenticate-with-github-use-case";
import { env } from "@saas/env";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import ky from "ky";
import { z } from 'zod';

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

            const githubOAuthURL = 'https://github.com/login/oauth/access_token'

            const githubOAuthRespondeSchema = z.object({
                access_token: z.string(),
                token_type: z.literal('bearer'),
                scope: z.string()
            })

            const githubOAuthTokenResponse = await ky.post(githubOAuthURL, {
                searchParams: {
                    client_id: env.GITHUB_OAUTH_CLIENT_ID,
                    client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
                    redirect_uri: env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
                    code
                }
            }).json()

            const OAuthResult = githubOAuthRespondeSchema.safeParse(githubOAuthTokenResponse)

            if (!OAuthResult.success) {
                throw new BadGatewayError('Wrong data format returned from GitHub OAuth API')
            }

            const githubUserResponse = await ky.get('https://api.github.com/user', {
                headers: {
                    'Authorization': `Bearer ${OAuthResult.data.access_token}`
                }
            }).json()

            const githubUserResult = z.object({
                id: z.number().int().transform(String),
                email: z.string().nullable(),
                name: z.string().nullable(),
                avatar_url: z.string().url()
            }).safeParse(githubUserResponse)

            if (!githubUserResult.success) {
                throw new BadGatewayError('Wrong user data returned from GitHub API')
            }

            const {
                email,
                name,
                id: githubId,
                avatar_url: avatarUrl
            } = githubUserResult.data

            if (!email) {
                throw new BadRequestError('Provide a e-mail in your github account to authenticate!')
            }

            const authenticateWithGithub = makeAuthenticateWithGithubUseCase()

            const { userId } = await authenticateWithGithub.execute({
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