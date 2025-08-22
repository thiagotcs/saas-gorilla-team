import { SectionTitle } from '@/components/section-title'
import { AcademyCard } from './academy-card'
import imgAcademy from '@/assets/ct2.jpeg'
import { AcademysList } from '@/app/(public)/academys/academys-list/page'
import { Separator } from '@/components/ui/separator'
export const AcademysSection = () => {
  return (
    <section className=" flex w-full flex-col py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col px-4">
        <SectionTitle title="Academias" />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
      </div>
      {/* <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3 px-4  sm:grid-cols-2  md:grid-cols-3  lg:max-w-7xl  lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <AcademyCard
            title="Matriz"
            description="Av. João Pereira, 3951 - Jardim Paris III, Maringá - PR"
            imgUrl={imgAcademy}
            className=""
          />
        ))}
      </div> */}
      <AcademysList />
    </section>
  )
}
