import { SectionTitle } from '@/components/section-title'
import { AboutTimeLine } from './about-timeline'
import { Separator } from '@/components/ui/separator'

export const AboutsSection = () => {
  return (
    <section className="flex w-full flex-col px-4">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8  py-10">
        <SectionTitle
          title="Jornada no Jiu-Jitsu - Da Primeira Faixa às Grandes Conquistas"
          subtitle="Do primeiro passo no kimono às vitórias mais marcantes: sua história registrada no Jiu-Jitsu."
        />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
      </div>
      {/* <div className="m-auto flex max-w-7xl flex-col "> */}
      <AboutTimeLine />
      {/* </div> */}
    </section>
  )
}
