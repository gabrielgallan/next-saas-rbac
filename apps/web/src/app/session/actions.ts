'use server'

import { redirect } from "next/navigation"
// import { env } from "@saas/env"

export async function signInWithGithub() {
    const githubOAuthURL = new URL(
        'https://github.com/login/oauth/authorize',
    )

    githubOAuthURL.searchParams.set('client_id', 'Ov23liEE6t7N3Uli4ATL')
    githubOAuthURL.searchParams.set('redirect_uri', 'http://localhost:3000/api/auth/callback')
    githubOAuthURL.searchParams.set('scope', 'user:email')

    redirect(githubOAuthURL.toString())
}