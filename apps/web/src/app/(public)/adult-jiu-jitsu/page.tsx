'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import profilePicture from '@/assets/bjj-pro-curitiba.jpeg'
import bgAdultJiu from '@/assets/bg-adult-jiu.png'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionTitle } from '@/components/section-title'
import { Separator } from '@/components/ui/separator'
export default function AdultJiuJitsu() {
  return (
    <section className="flex w-full flex-col py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4">
        <SectionTitle
          title="Jiu-jítsu Adulto"
          subtitle="Treinos voltados para força, estratégia e evolução pessoal, do iniciante ao competidor."
        />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
      </div>
      <motion.div
        className="relative w-full origin-center px-4"
        initial={{ opacity: 0, y: 200, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={bgAdultJiu}
          alt="Alunos de Jiu-Jitsu adulto - Gorilla Team"
          className="aspect-auto w-full rounded-lg object-cover shadow-2xl"
          unoptimized
        />
      </motion.div>

      <div className="m-auto mt-0 flex flex-col px-4 pt-12 lg:max-w-7xl">
        <h2 className="m-auto text-center text-3xl font-medium uppercase lg:text-4xl">
          TRANSFORME-SE: Autodefesa, Saúde e Confiança Forjadas com o Professor
          Mundial Juares
        </h2>

        <div className="flex flex-col-reverse items-start justify-around py-12 lg:max-w-7xl lg:flex-row">
          <motion.div
            className="w-full lg:max-w-[530px]"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="my-6 text-justify text-xl text-gray-400">
              Na correria do dia a dia, encontrar um refúgio para a mente e um
              desafio para o corpo é essencial. Se você busca uma vida mais
              saudável, com mais confiança e um método comprovado para
              desestressar do trabalho enquanto treina corpo e mente em
              conjunto, a <span className="text-gray-100">GORILLA TEAM</span> é
              o seu lugar.
            </p>
            <p className="my-6 text-justify text-xl text-gray-400">
              Sob a liderança do{' '}
              <span className="text-gray-100">
                Mundialmente Reconhecido Professor Juares
              </span>
              , multicampeão mundial e um ícone do esporte, oferecemos programas
              de Jiu-Jitsu que vão além das técnicas de luta, moldando
              indivíduos mais fortes, resilientes e preparados para os desafios
              da vida.
            </p>

            <h3 className="text-xl text-gray-100">
              Mais do que Luta: Benefícios que Transformam
            </h3>
            <p className="my-1 text-justify text-xl text-gray-400">
              Nossos programas são desenhados para proporcionar ganhos
              significativos em diversas áreas da sua vida:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="my-6 w-full origin-center lg:max-w-[420px]"
          >
            <Image
              src={profilePicture}
              alt="Foto do campeonato Curitiba - Gorilla Team"
              className="aspect-auto w-full rounded-lg object-cover shadow-2xl"
              unoptimized
            />
          </motion.div>
        </div>

        <div>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              [
                '🥋',
                'Autodefesa Eficaz',
                'Domine técnicas para se proteger com segurança.',
              ],
              [
                '💪',
                'Condicionamento Físico',
                'Aprimore força, resistência e energia.',
              ],
              [
                '🧘',
                'Bem-Estar Mental',
                'Reduza o estresse e fortaleça o equilíbrio emocional.',
              ],
              [
                '🔥',
                'Confiança Inabalável',
                'Supere desafios dentro e fora do tatame.',
              ],
              [
                '🧠',
                'Memória Aprimorada',
                'Treine foco, disciplina e raciocínio rápido.',
              ],
            ].map(([emoji, title, desc], i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: i * 0.1 }}
                className="flex gap-3 rounded-md border-2 border-gray-800 bg-gray-800 p-3 opacity-70 transition-all hover:border-emerald-500 hover:opacity-100"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-sm">
                  <span aria-hidden className="text-xl">
                    {emoji}
                  </span>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-100">
                    {title}
                  </div>
                  <div className="mt-1 text-base text-gray-300">{desc}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <h2 className="m-auto pt-12 text-center text-3xl font-medium uppercase">
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
          className="mx-auto mt-6 w-full max-w-4xl"
          defaultValue="item-1"
        >
          {[
            [
              'item-1',
              'Currículo Aprimorado',
              'Nosso currículo de Jiu-Jitsu incorpora os melhores elementos de outras artes marciais, como o Judô, mantendo o Jiu-Jitsu como a base mais eficaz para a autodefesa e o crescimento pessoal.',
            ],
            [
              'item-2',
              'Instrução de Renome Mundial',
              'Aulas ministradas por Faixas Pretas de elite certificadas pela IBJJF, garantindo o mais alto nível de ensino.',
            ],
            [
              'item-3',
              'Ambiente de Apoio',
              'Um ambiente acolhedor e familiar, onde respeito e apoio mútuo são pilares para o seu crescimento.',
            ],
            [
              'item-4',
              'Flexibilidade',
              'Aulas de 2 a 5 vezes por semana (1 a 2h), conciliando treino com seu estilo de vida.',
            ],
            [
              'item-5',
              'Metodologia Completa',
              'Aquecimento, técnicas, prática e rola ao vivo para fixar o aprendizado.',
            ],
            [
              'item-6',
              'Progresso Monitorado',
              'Sua evolução é acompanhada de perto, garantindo crescimento contínuo.',
            ],
          ].map(([value, title, desc]) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>
                <span className="text-start text-lg font-medium text-gray-100">
                  {title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>{desc}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-12 text-center"
        >
          <h2 className="m-auto text-center text-3xl font-medium uppercase lg:text-4xl">
            A Hora de Agir é Agora!
          </h2>
          <p className="my-6 text-xl text-gray-400">
            Existem dois tipos de pessoas no mundo: aquelas que sonham em ser
            tudo o que sabem que podem ser, mas nunca agem, e aquelas que agem
            quando a oportunidade surge. Se você chegou até aqui, acreditamos
            que você é uma dessas pessoas que busca o melhor para si e para sua
            vida.
          </p>
          <p className="my-6 text-xl text-gray-400">
            Não permita que a falta de confiança, o estresse ou a inatividade o
            impeçam de atingir todo o seu potencial. No Gorilla Team, você
            obterá resultados reais e amará a jornada incrível rumo à vida que
            sempre sonhou.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
