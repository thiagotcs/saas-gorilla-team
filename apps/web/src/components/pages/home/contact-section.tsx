import { ContactForm } from '@/components/contact-form'
import { SectionTitle } from '@/components/section-title'
import { Separator } from '@/components/ui/separator'
export default function ContactSection() {
  return (
    <section className="flex w-full flex-col py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4">
        <SectionTitle
          title="Se é para duvidar de algo, duvide dos seus limites."
          subtitle="Fale com a GORILLA TEAM. Agende sua aula experimental, tire dúvidas e
        descubra como evoluir dentro e fora do tatame. Preencha o formulário e
        vamos começar."
        />
      </div>
      <ContactForm />
    </section>
  )
}
