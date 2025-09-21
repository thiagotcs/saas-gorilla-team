import { SectionTitle } from '@/components/section-title'
import { AcademysList } from './academys-list/page'
import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'
import { AcademysPageData } from '@/types/page-info'
import { Separator } from '@/components/ui/separator'

const getAcademys = async (): Promise<AcademysPageData | null> => {
  const query = `
    query AcademysQuery {
      academys {
        slug
        title
        shortDescription
        thumbnail { url }
      }
    }
  `
  return fetchHygraphQuery<AcademysPageData>(query, 0)
}

export default async function Academys() {
  const data = await getAcademys()

  if (!data) {
    return <p>❌ Nenhuma academia encontrada.</p>
  }
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
      <AcademysList academys={data.academys} />
    </section>
  )
}
