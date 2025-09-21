import { SectionTitle } from '@/components/section-title'
import { AcademysList } from '@/app/(public)/academys/academys-list/page'
import { Separator } from '@/components/ui/separator'
import { Academy } from '@/types/academys'

type AcademysSectionProps = {
  academys: Academy[]
}
export const AcademysSection = ({ academys }: AcademysSectionProps) => {
  return (
    <section className="flex w-full flex-col px-4">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8  py-10">
        <SectionTitle
          title="E aí, onde você quer treinar?"
          subtitle="Conheça nossas unidades, estrutura e onde você pode treinar com a família Gorilla Team."
        />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
      </div>
      <AcademysList academys={academys} />
    </section>
  )
}
