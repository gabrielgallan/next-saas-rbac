import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { httpSignInWithGithub } from '@/http/sign-in-with-github'
import { HTTPError } from 'ky'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  console.log('code: ', code)

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth  code was not found.' },
      { status: 400 },
    )
  }

  try {
    const { token } = await httpSignInWithGithub({ code })
  
    const Cookies = await cookies()
  
    Cookies.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7days
    })

  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      console.error('API Error', { message, err })
    }
  }

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}