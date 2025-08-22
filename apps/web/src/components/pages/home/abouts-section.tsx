import { SectionTitle } from '@/components/section-title'
import { AboutTimeLine } from './about-timeline'

export const AboutsSection = () => {
  return (
    <section className="flex w-full flex-col py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex flex-col px-4">
        <SectionTitle title="Sobre" />
      </div>
      <div className="m-auto flex max-w-7xl flex-col ">
        <AboutTimeLine />
        <AboutTimeLine />
        <AboutTimeLine />
        <AboutTimeLine />
      </div>
    </section>
  )
}
