import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/strategies/authentication/auth'

export default async function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!(await isAuthenticated())) {
    redirect('/session/sign-in')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}