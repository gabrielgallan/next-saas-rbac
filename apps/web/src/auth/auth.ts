import { httpGetProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const Cookies = await cookies()

  return Cookies.get('token')?.value
}

export async function getCurrentOrg() {
  const Cookies = await cookies()

  return Cookies.get('org')?.value ?? null
}

export async function auth() {
  const Cookies = await cookies()
  const token = Cookies.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await httpGetProfile({ token })

    return { user, token }
  } catch (err) {
    console.error(err)
  }

  redirect('/api/auth/sign-out')
}