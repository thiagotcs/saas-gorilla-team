import { AboutsSection } from '@/components/pages/home/abouts-section'
import { AcademysSection } from '@/components/pages/home/academys-section'
import { AdultJiuSection } from '@/components/pages/home/adult-jiu-section'
import { HeroSection } from '@/components/pages/home/hero-section'
import { KidsJiuSection } from '@/components/pages/home/kids-jiu-section'
import HighlightedRules from './highlighted-rules/page'
import ClassSchedule from './class-schedule/page'
import ContactSection from '@/components/pages/home/contact-section'

export default async function PublicHomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <AcademysSection />
      <HighlightedRules />
      <AboutsSection />
      <AdultJiuSection />
      <KidsJiuSection />
      <ClassSchedule />
      <ContactSection />
    </div>
  )
}
