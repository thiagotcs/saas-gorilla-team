import { RulesCard } from '@/app/(public)/highlighted-rules/rules-card/page'
import { SectionTitle } from '@/components/section-title'
import { Separator } from '@/components/ui/separator'
import { Rules } from '@/types/rules'

type RulesSectionProps = {
  rules: Rules[]
}

export function RulesSection({ rules }: RulesSectionProps) {
  if (!rules?.length) return null

  return (
    <section className="flex w-full flex-col ">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4 py-10">
        <SectionTitle
          title="Novas Regras Oficiais"
          subtitle="Diretrizes que garantem disciplina, respeito e segurança dentro e fora do tatame."
        />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
        {rules.map((rule) => (
          <RulesCard key={rule.slug} rule={rule} />
        ))}
      </div>
    </section>
  )
}
