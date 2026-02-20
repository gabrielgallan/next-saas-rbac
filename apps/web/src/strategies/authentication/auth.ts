import { HTTPGetProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function isAuthenticated() {
  const storageCookies = await cookies()

  return storageCookies.get('token')?.value ? true : false
}

async function currentUser() {
  const storageCookies = await cookies()

  const token = storageCookies.get('token')?.value
  
  if (!token) {
    redirect('/session/sign-in')
  }
  
  try {
    const { user } = await HTTPGetProfile({ token })
    
    return { user, token }
  } catch {
    redirect('/api/auth/sign-out')
  }
}

export {
  currentUser,
  isAuthenticated
}

export async function getCurrentOrg() {
  const Cookies = await cookies()

  return Cookies.get('org')?.value ?? null
}