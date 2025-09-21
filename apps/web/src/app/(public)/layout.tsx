import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/lib/server-auth-utils'
import { PublicHeaderInfo } from '@/components/public-header-info'
import { PublicHeader } from '@/components/public-header'
import Footer from './footer/page'
export default async function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!(await isAuthenticated())) {
    redirect('/')
  }

  return (
    <>
      {sheet}
      <div className="hidden md:block">
        <PublicHeaderInfo />
      </div>
      <PublicHeader />
      {children}
      <Footer />
    </>
  )
}
