import { Header } from '@/components/header'
import { PublicHeader } from '@/components/public-header'
import { PublicHeaderInfo } from '@/components/public-header-info'
import { getAuthenticatedUser } from '@/lib/server-auth-utils'
import { HeroSection } from '../../components/pages/home/hero-section'
import { AcademysSection } from '@/components/pages/home/academys-section'
import { HighlightedRules } from '@/components/pages/home/highlighted-rules'
import { AboutsSection } from '@/components/pages/home/abouts-section'
import { AdultJiuSection } from '@/components/pages/home/adult-jiu-section'
import { KidsJiuSection } from '@/components/pages/home/kids-jiu-section'
import Calendar from '@/components/calendar'
import { ContactForm } from '@/components/contact-form'

export default async function Dashboard() {
  // const { user } = await getAuthenticatedUser()
  // return <pre>{JSON.stringify(user, null, 2)}</pre>
  return (
    <div className="space-y-4 py-4">
      {/* <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <p className="text-muted-foreground text-sm">Selecione uma academia</p>
      </main> */}
      <PublicHeaderInfo />
      <PublicHeader />
      <HeroSection />
      <AcademysSection />
      <HighlightedRules />
      <AboutsSection />
      <AdultJiuSection />
      <KidsJiuSection />
      <Calendar />
      <ContactForm />
    </div>
  )
}
