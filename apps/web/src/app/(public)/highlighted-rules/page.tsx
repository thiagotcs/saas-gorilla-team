import { SectionTitle } from '@/components/section-title'
import { Separator } from '@/components/ui/separator'
import { RulesCard } from './rules-card/page'
export default function HighlightedRules() {
  return (
    <section className="flex w-full flex-col py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4">
        <SectionTitle title="Regras novas!" />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
        <RulesCard />
        <RulesCard />
        <RulesCard />
      </div>
    </section>
  )
}
