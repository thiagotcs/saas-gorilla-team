import { SectionTitle } from '@/components/section-title'
import { AcademysList } from './academys-list/page'
// import { AcademyCard } from './academy-card'
// import imgAcademy from '@/assets/ct2.jpeg'
export default function Academys() {
  return (
    <section className=" flex w-full flex-col py-16">
      <div className="m-auto mt-0 flex max-w-lg px-4">
        <SectionTitle title="E aí, onde você quer treinar?" />
      </div>
      <AcademysList />
    </section>
  )
}
