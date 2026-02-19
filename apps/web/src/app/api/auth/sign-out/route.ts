import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  const Cookies = await cookies()

  Cookies.delete('token')

  return NextResponse.redirect(redirectUrl)
}