'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import bgKidsJiu from '@/assets/bg-kids-jiu.png'
import profilePicture from '@/assets/kids.webp'
import { SectionTitle } from '@/components/section-title'
import { AlertTriangle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
export const KidsJiuSection = () => {
  return (
    <section className="flex w-full flex-col bg-gray-900 py-16">
      <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4">
        <SectionTitle
          title="Jiu-jítsu Infantil"
          subtitle="Uma jornada de disciplina, respeito e confiança para crianças crescerem fortes no tatame e na vida.Treinos voltados para o desenvolvimento físico e emocional das crianças."
        />
        <Separator
          orientation="horizontal"
          className="my-8 max-w-7xl border-b border-b-gray-800"
        />
      </div>
      <motion.div
        className="relative w-full origin-center px-4"
        initial={{ opacity: 0, y: 200, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 200, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={bgKidsJiu}
          alt="Crianças treinando Jiu-Jitsu - Gorilla Team"
          className="aspect-auto w-full rounded-lg object-cover shadow-2xl"
          unoptimized
        />
      </motion.div>
      <div className="m-auto mt-0 flex flex-col px-4 pt-12 lg:max-w-7xl">
        <h2 className="m-auto text-center text-3xl font-medium uppercase">
          Formando Campeões para a Vida 🏆
        </h2>
        <div className=" flex flex-col-reverse items-start justify-around py-12 lg:max-w-7xl lg:flex-row">
          <motion.div
            className="w-full lg:max-w-[530px]"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <p className="my-6 text-justify text-xl text-gray-400">
              Com a orientação do professor Juares Santos, seu filho desenvolve
              autoconfiança, disciplina e respeito, dentro e fora do tatame.
            </p>
            <p className="my-6 text-justify text-xl text-gray-400">
              Na <span className="text-gray-100">GORILLA TEAM</span>,
              acreditamos que o Jiu-Jitsu é uma das ferramentas mais poderosas
              para a formação do caráter. Nossos programas, cuidadosamente
              desenvolvidos pelo renomado professor Juares Santos, são
              projetados para dar ao seu filho as habilidades de vida, a
              segurança e a mentalidade necessárias para prosperar no mundo de
              hoje.
            </p>
            <h3 className="text-xl text-gray-100">
              Benefícios que Vão Além do Tatame
            </h3>
            <p className="my-1 text-justify text-xl text-gray-400">
              Aqui, cada aula é um passo em direção a uma versão mais forte e
              confiante do seu filho. Ele irá desenvolver:
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            exit={{ opacity: 0, y: 200, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="my-6 w-full origin-center lg:max-w-[420px]"
          >
            <Image
              src={profilePicture}
              width={420}
              height={404}
              alt="Foto do Campeonato curitiba"
              className="aspect-auto h-[404px] w-full rounded-lg object-cover shadow-2xl lg:h-[420px]"
              unoptimized
            />
          </motion.div>
        </div>
        <div>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              [
                '🥋',
                'Autodefesa Inteligente',
                'Capacidade de se proteger com técnica, não com agressividade.',
              ],
              [
                '🎯',
                'Foco e Autocontrole',
                'Melhora da concentração na escola e em outras atividades.',
              ],
              [
                '🛡️',
                'Prevenção ao Bullying',
                'Postura e confiança para lidar com situações desafiadoras.',
              ],
              [
                '🤝',
                'Liderança e Respeito',
                'Aprender a liderar pelo exemplo e a respeitar colegas e mestres.',
              ],
              [
                '🧠',
                'Educação do Caráter',
                'Valores como disciplina, perseverança e honestidade.',
              ],
              [
                '💪',
                'Aptidão Física e Saúde',
                'Mais energia, coordenação e um estilo de vida ativo.',
              ],
              [
                '✨',
                'Confiança Inabalável',
                'A segurança de saber que é capaz de superar qualquer desafio.',
              ],
            ].map(([emoji, title, desc], i) => (
              <motion.li
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.15, delay: i * 0.1 }}
                key={String(title)}
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
        <h2 className="m-auto mt-12 text-center text-3xl font-bold uppercase text-gray-100">
          Pais, Nós Entendemos os Desafios de Hoje
        </h2>
        <p className="mx-auto my-6 max-w-4xl text-center text-lg leading-relaxed text-gray-400">
          Educar um filho no mundo moderno é uma jornada complexa. Entre a
          pressão social na escola, o bullying (muitas vezes silencioso) e as
          infinitas distrações digitais, é natural sentir-se sobrecarregado.
          Você quer dar ao seu filho as melhores ferramentas para ter sucesso,
          mas como protegê-lo e prepará-lo ao mesmo tempo?
        </p>
        <h2 className="m-auto mt-12 text-center text-3xl font-bold uppercase text-gray-100">
          A boa notícia é: você não precisa fazer isso sozinho.
        </h2>
        <p className="mx-auto my-6 max-w-4xl text-center text-lg leading-relaxed text-gray-400">
          O programa Kids da <span className="text-gray-100">GORILLA TEAM</span>{' '}
          é o seu maior aliado nessa missão. Nós ajudamos você a criar uma
          criança focada, respeitosa e confiante, que sabe se defender e, mais
          importante, sabe o valor do próprio esforço.
        </p>
        <h2 className="m-auto mt-12 text-center text-3xl font-bold uppercase text-gray-100">
          O Padrão de Excelência GORILLA TEAM: O Que Nos Torna Diferentes?
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-6 w-full max-w-4xl"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Método Comprovado para o Sucesso
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Nosso foco vai além da técnica. Construímos um sistema que une
                autodefesa, desenvolvimento de caráter e fortalecimento da
                confiança em um ambiente familiar e seguro. Não é apenas treino,
                é uma metodologia para o sucesso na vida.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Currículo de Jiu-Jitsu Completo
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Ensinamos o Jiu-Jitsu, a arte marcial mais eficaz do mundo, como
                nossa base. Além disso, incorporamos elementos valiosos de
                outras artes, como o Judô, para garantir que seu filho tenha um
                repertório de defesa completo e versátil.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Um Ambiente Inclusivo e Acolhedor
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Respeitamos a individualidade de cada criança. Nosso ambiente é
                preparado para acolher neurodivergências como TDAH, Dislexia e
                Autismo. Entendemos que cada um aprende em seu próprio ritmo, e
                nossos exercícios ajudam a melhorar a atenção, a coordenação
                motora e o autocontrole.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <span className="text-start text-lg font-medium text-gray-100">
                Instrutores de Elite
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                A qualidade do ensino é nossa prioridade. Todos os nossos
                professores são faixas-pretas certificados pela IBJJF
                (International Brazilian Jiu-Jitsu Federation), com anos de
                experiência e qualificação para ensinar no mais alto nível. Uma
                faixa preta leva, em média, mais de 10 anos para ser
                conquistada, e esse é o nível de dedicação que trazemos para o
                tatame.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="my-10 rounded-2xl border border-emerald-700/40 bg-gradient-to-r from-gray-900 via-gray-800/90 to-gray-900 p-10 shadow-2xl"
        >
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-8 w-8 text-emerald-500" />
            <h2 className="text-center text-3xl font-bold uppercase text-gray-100">
              Não Deixe Seu Filho Virar Apenas Mais um Número
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto my-6 max-w-4xl text-center text-lg leading-relaxed text-gray-300"
          >
            As estatísticas são preocupantes:{' '}
            <span className="font-bold text-red-400">
              1 em cada 5 crianças é vítima de bullying
            </span>
            .{' '}
            <span className="font-bold text-emerald-400">
              42% dos adolescentes experimentam drogas ou álcool
            </span>{' '}
            antes da vida adulta. A ansiedade e a falta de foco entre jovens
            atingem níveis recordes.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-gray-400"
          >
            Prepare-o para o sucesso com as ferramentas certas. Nossos alunos
            não apenas se tornam excelentes atletas, mas também{' '}
            <span className="text-emerald-400">
              líderes em suas comunidades
            </span>
            , com valores e uma confiança que levarão por toda a vida.
          </motion.p>
        </motion.div>
        <p className="mx-auto my-6 max-w-4xl text-center text-lg leading-relaxed text-gray-400">
          <strong className="text-gray-100">
            Tentou Outras Atividades e Não Deu Certo?
          </strong>{' '}
          Se você já investiu em outros esportes ou programas que não prenderam
          a atenção do seu filho, a experiência pode ter sido frustrante. Muitas
          escolas focam excessivamente em competição ou não possuem um ambiente
          verdadeiramente acolhedor. Nosso compromisso é diferente. Na GORILLA
          TEAM, o sucesso do seu filho é a nossa missão. Garantimos um ambiente
          familiar, onde o desenvolvimento individual é mais importante que
          qualquer medalha. Aqui, seu filho vai amar a jornada de se tornar mais
          forte, e você vai amar os resultados.
        </p>
        <h3 className="mx-auto mt-12 max-w-4xl text-center text-2xl font-semibold text-gray-100">
          Como Funcionam Nossas Aulas?
        </h3>
        <p className="mx-auto mt-4 max-w-4xl text-center text-lg leading-relaxed text-gray-400">
          Para garantir aprendizado contínuo e resultados visíveis, nossas aulas
          acontecem de 2 a 5 vezes por semana, dependendo do programa escolhido.
          Cada aula tem duração de 1 hora e é estruturada para máximo
          aproveitamento:
        </p>
        <ul className="mx-auto mt-6 max-w-2xl list-disc space-y-2 pl-5 text-left text-lg text-gray-400">
          <li>
            <strong className="text-gray-100">Aquecimento:</strong> Prepara o
            corpo e a mente.
          </li>
          <li>
            <strong className="text-gray-100">Técnica:</strong> Aprendizado dos
            movimentos com o Mestre Juares Santos e sua equipe.
          </li>
          <li>
            <strong className="text-gray-100">Exercícios Práticos:</strong>{' '}
            Repetição para fixar o conhecimento.
          </li>
          <li>
            <strong className="text-gray-100">Rola (Luta):</strong> Aplicação
            das técnicas de forma controlada e segura, desenvolvendo o
            raciocínio rápido e o condicionamento físico.
          </li>
        </ul>
        <p className="mx-auto mt-6 max-w-4xl text-center text-lg leading-relaxed text-gray-400">
          Todo o progresso, frequência e evolução do seu filho são monitorados
          de perto para garantir que ele esteja sempre avançando.
        </p>
        <div className="my-10 rounded-2xl border border-emerald-700/40 bg-black bg-gradient-to-r from-gray-900 via-gray-800/90 to-gray-900 px-4 py-12 text-center sm:py-20">
          <motion.h2
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            DÊ O PRIMEIRO PASSO PARA TRANSFORMAR O FUTURO DO SEU FILHO
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Permita que ele descubra a força, a disciplina e a confiança que já
            existem dentro dele. Estamos aqui para guiá-lo nessa jornada
            incrível.{' '}
            <span className="font-semibold text-emerald-500">
              Inscreva-se hoje mesmo
            </span>{' '}
            e veja a diferença que o Jiu-Jitsu pode fazer na vida do seu filho.
          </motion.p>

          {/* Divider suave antes do formulário */}
          <motion.div
            className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-emerald-600 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  )
}
