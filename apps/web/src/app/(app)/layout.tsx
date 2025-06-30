import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/lib/server-auth-utils'
export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
