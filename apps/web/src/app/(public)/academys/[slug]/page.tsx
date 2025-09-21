import AcademyDetails from '@/components/pages/academy/academy-details'
import AcademySections from '@/components/pages/academy/academy-sections'
import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'
import type { Academy } from '@/types/academys'

const getAcademyData = async (slug: string): Promise<{ academy: Academy }> => {
  const query = `
    query AcademyBySlug {
      academy(where: { slug: "${slug}" }) {
        slug
        title
        shortDescription
        description {
          raw
          text
        }
        thumbnail {
          url
        }
        pageThumbnail {
          url
        }
        sections {
          title
          image {
            url
          }
        }
      }
    }
  `
  return fetchHygraphQuery<{ academy: Academy }>(query, 0)
}

interface AcademyPageProps {
  params: { slug: string }
}
export default async function Academy({ params }: AcademyPageProps) {
  const { academy } = await getAcademyData(params.slug)

  return (
    <>
      <AcademyDetails academyDetails={academy} />
      <AcademySections academySections={academy.sections} />
    </>
  )
}
