import Image from 'next/image'
import bgKidsJiu from '@/assets/bg-kids-jiu.png'
import profilePicture from '@/assets/bjj-pro-curitiba.jpeg'
import { SectionTitle } from '@/components/section-title'
import { Star } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
export const KidsJiuSection = () => {
  return (
    <section className=" flex w-full flex-col py-16">
      <SectionTitle title="Jiu-Jitsu infantil" />
      <div className="relative w-full px-4 ">
        <Image
          // objectFit="cover"
          // layout="fill"
          src={bgKidsJiu}
          alt="foto da turma kids jiu-jitsu"
          className="aspect-auto w-full rounded-lg object-cover shadow-2xl"
          unoptimized
        />
      </div>
      <div className="m-auto mt-0 flex flex-col px-4 pt-12 lg:max-w-7xl">
        <h2 className="text-1xl m-auto text-center font-medium uppercase lg:text-2xl">
          TRANSFORME-SE: Autodefesa, Saúde e Confiança Forjadas com o Professor
          Mundial Juares.
        </h2>
        <div className="flex flex-col-reverse items-start justify-around py-12 lg:max-w-7xl lg:flex-row">
          <div
            className="w-full lg:max-w-[530px]"
            // initial={{ opacity: 0, x: -100 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -100 }}
            // transition={{ duration: 0.5 }}
          >
            <p className="my-6 text-gray-400">
              Na correria do dia a dia, encontrar um refúgio para a mente e um
              desafio para o corpo é essencial. Se você busca uma vida mais
              saudável, com mais confiança e um método comprovado para
              desestressar do trabalho enquanto treina corpo e mente em
              conjunto, o <span>Gorilla Team</span> é o seu lugar.
            </p>
            <p className="my-6 text-gray-400">
              Sob a liderança do{' '}
              <span>Mundialmente Reconhecido Professor Juares</span>,
              multicampeão mundial e um ícone do esporte, oferecemos programas
              de Jiu-Jitsu que vão além das técnicas de luta, moldando
              indivíduos mais fortes, resilientes e preparados para os desafios
              da vida.
            </p>
            <h3>Mais do que Luta: Benefícios que Transformam</h3>
            <p className="my-1 text-gray-400">
              Nossos programas são meticulosamente desenhados para proporcionar
              ganhos significativos em diversas áreas da sua vida:
            </p>
            <ul>
              <li className="my-1 flex items-center gap-2 py-1.5 text-gray-400">
                <Star size={15} />
                Autodefesa Eficaz
              </li>
              <li className="my-1 flex items-center gap-2 py-1.5 text-gray-400">
                <Star size={15} />
                Condicionamento Físico
              </li>
              <li className="my-1 flex items-center gap-2 py-1.5 text-gray-400">
                <Star size={15} />
                Bem-Estar Mental
              </li>
              <li className="my-1 flex items-center gap-2 py-1.5 text-gray-400">
                <Star size={15} />
                Confiança Inabalável
              </li>
              <li className="my-1 flex items-center gap-2 py-1.5 text-gray-400">
                <Star size={15} />
                Memória Aprimorada
              </li>
            </ul>
          </div>
          <div
            // initial={{ opacity: 0, y: 200, scale: 0.5 }}
            // whileInView={{ opacity: 1, y: 0, scale: 1 }}
            // exit={{ opacity: 0, y: 200, scale: 0.5 }}
            // transition={{ duration: 0.5 }}
            className="my-6 w-full origin-center lg:max-w-[420px]"
          >
            <Image
              src={profilePicture}
              alt="Foto de perfil do Gabriel Borges"
              className="aspect-auto w-full rounded-lg object-cover shadow-2xl"
              unoptimized
            />
          </div>
        </div>
        <h2 className="m-auto text-center text-3xl font-medium uppercase">
          O Diferencial do Gorilla Team: Um Sistema de Sucesso
        </h2>
        <h3 className="my-6 text-center text-xl text-gray-400">
          O que nos torna únicos é a nossa abordagem holística. Não somos apenas
          uma academia de artes marciais; somos um sistema de sucesso que
          cultiva seu desenvolvimento pessoal:
        </h3>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Currículo Aprimorado
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Nosso currículo de Jiu-Jitsu incorpora os melhores elementos de
                outras artes marciais, como o Judô, mantendo o Jiu-Jitsu como a
                base mais eficaz para a autodefesa e o crescimento pessoal.
              </p>
              <p>
                Cada aula é projetada para maximizar seu aprendizado, com
                técnicas que vão desde o básico até estratégias avançadas,
                garantindo que você se torne um praticante completo e confiante.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Instrução de Renome Mundial
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Nossas aulas são elaboradas e ministradas por Faixas Pretas de
                elite, certificadas pela IBJJF, garantindo o mais alto nível de
                ensino.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Ambiente de Apoio
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                No Gorilla Team, você encontrará um ambiente acolhedor e
                familiar, onde o respeito e o apoio mútuo são pilares. Focamos
                no desenvolvimento individual, respeitando suas diferenças e
                garantindo que você se sinta parte de uma comunidade que
                impulsiona seu sucesso.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Flexibilidade
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Nossas aulas acontecem de 2 a 5 vezes por semana, com duração de
                1 a 2 horas, para que você possa reter o aprendizado e conciliar
                o treino com seus objetivos e estilo de vida.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Metodologia Completa
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Cada aula inclui aquecimentos dinâmicos, ensino detalhado de
                técnicas, exercícios práticos e o emocionante "rolamento ao
                vivo", onde você aprimora suas habilidades com um parceiro.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Progresso Monitorado
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Sua frequência, notas e evolução são acompanhadas de perto em
                sua conta de aluno VIP, garantindo que você esteja sempre
                progredindo em direção aos seus objetivos.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <h2 className="m-auto pt-6 text-center text-3xl font-medium uppercase">
          A Hora de Agir é Agora!
        </h2>
        <span className="my-6 text-center text-xl text-gray-400">
          Existem dois tipos de pessoas no mundo: aquelas que sonham em ser tudo
          o que sabem que podem ser, mas nunca agem, e aquelas que agem quando a
          oportunidade surge. Se você chegou até aqui, acreditamos que você é
          uma das poucas pessoas que realmente buscam o melhor para si e para
          sua vida.
        </span>
        <span className="my-6 text-center text-xl text-gray-400">
          Não permita que a falta de confiança, o estresse ou a inatividade o
          impeçam de atingir todo o seu potencial. O ciclo de programas
          ineficazes termina hoje! No Gorilla Team, você obterá resultados e
          amará a jornada incrível rumo à vida que sempre sonhou.
        </span>
      </div>
    </section>
  )
}
