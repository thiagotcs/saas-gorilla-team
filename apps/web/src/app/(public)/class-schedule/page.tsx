import Calendar from '@/components/calendar'
import { SectionTitle } from '@/components/section-title'
import { Separator } from '@/components/ui/separator'
export default function ClassSchedule() {
  return (
    <section className="flex w-full flex-col px-4 py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4">
        <SectionTitle
          title="Programação de Aulas – Horários, Professores e Conteúdo"
          subtitle="Encontre sua próxima aula, conheça o professor responsável e descubra o que vai aprender."
        />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
      </div>
      <Calendar />
    </section>
  )
}
