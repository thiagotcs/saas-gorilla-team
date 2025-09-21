import { ContactForm } from '@/components/contact-form'
import { SectionTitle } from '@/components/section-title'
import { Separator } from '@/components/ui/separator'
import { MapPin } from 'lucide-react'
export default function Contact() {
  return (
    <section className="flex w-full flex-col py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4">
        <SectionTitle
          title="Se é para duvidar de algo, duvide dos seus limites."
          subtitle="Fale com a GORILLA TEAM. Agende sua aula experimental, tire dúvidas e
          descubra como evoluir dentro e fora do tatame. Preencha o formulário e venha sentir nossa vibe."
        />
        <Separator className="my-10 h-px bg-gray-700" />
      </div>
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col-reverse items-start justify-around gap-8 px-4 lg:flex-row">
        <div className="w-full lg:max-w-[530px]">
          <ContactForm />
        </div>
        <div className="flex w-full flex-col rounded-lg bg-gray-800 p-5 py-8 pt-6 text-center lg:max-w-[530px] lg:text-left">
          <h1 className="m-auto my-3 mt-0 px-4 text-2xl font-bold">
            INFORMAÇÕES
          </h1>
          <strong className="text-1xl mb-1">GORILLA TEAM MATRIZ</strong>
          <p className="mb-4 flex gap-2">
            <MapPin />
            Av. João Pereira, 3951 - Jardim Paris III, Maringá - PR, 87080-685
          </p>
          <strong className="text-1xl mb-1">GORILLA TEAM CT2</strong>
          <p className="mb-4 flex gap-2">
            <MapPin />
            Av. Mario Clapier Urbinati, 1740 A - Zona 7, Maringá - PR, 87020-260
          </p>
          <strong className="text-1xl mb-1">GORILLA TEAM CT3</strong>
          <p className="mb-4 flex gap-2">
            <MapPin />
            R. José Bertão, 178 - Jd. Industrial, Marialva - PR, 86990-000
          </p>
        </div>
      </div>
    </section>
  )
}
