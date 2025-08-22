import { SectionTitle } from '@/components/section-title'
import { Separator } from '@/components/ui/separator'
export default function About() {
  return (
    <section className="flex w-full flex-col py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4">
        <SectionTitle title="Sobre" />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
      </div>
    </section>
  )
}
