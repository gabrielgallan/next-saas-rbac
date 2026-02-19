import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next SaaS',
  description: 'Next SaaS app with RBAC rules',
}

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <body>
        {children}
      </body>
    </html>
  )
}