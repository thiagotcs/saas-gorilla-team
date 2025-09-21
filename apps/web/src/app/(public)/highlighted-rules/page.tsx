import { RulesSection } from '@/components/pages/rules/rules-section'
import { Rules } from '@/types/rules'
import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'

const getRulesData = async (): Promise<{ highlightRules: Rules[] }> => {
  const query = `
    query RulesQuery {
      page(where: { slug: "home" }) {
        highlightRules {
          slug
          title
          shortDescription
          description { text }
          thumbnail { url }
          pdf { url }
        }
      }
    }
  `
  const data = await fetchHygraphQuery<{ page: { highlightRules: Rules[] } }>(
    query,
    60 * 60 * 24 // cache 1 dia
  )

  return { highlightRules: data.page.highlightRules }
}

export default async function HighlightedRules() {
  const { highlightRules } = await getRulesData()

  return <RulesSection rules={highlightRules ?? []} />
}
