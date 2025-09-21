'use client'
import { PiCoffeeBold } from 'react-icons/pi'

import {
  Accessibility,
  Cctv,
  Columns4,
  Paintbrush,
  ShowerHead,
  WashingMachine,
  Wifi,
} from 'lucide-react'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Academy } from '@/types/academys'

export default function AcademySections({
  academySections,
}: {
  academySections: Academy['sections']
}) {
  return (
    <section className=" my-12 flex w-full flex-col gap-8 px-4 md:my-10 md:gap-10">
      <div className="flex flex-col items-center gap-12">
        {academySections.map((section) => (
          <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 200, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            key={section.title}
            className="lg:min-w-7xl flex flex-col items-center gap-6 md:gap-12"
          >
            <h2 className="text-2xl font-medium text-gray-300 md:text-3xl">
              {section.title}
            </h2>
            <div className=" lg:h-[672px] lg:w-[1080px]">
              <Image
                width={1080}
                height={672}
                className="aspect-auto h-[672px] w-full rounded-lg object-cover lg:rounded-2xl"
                alt={`Imagem da sessão ${section.title}`}
                src={section.image.url}
                unoptimized
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="m-auto  flex flex-col  pt-12 lg:max-w-7xl">
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {[
            [
              <Wifi
                size={40}
                className="hover:text-2 transition-all hover:text-amber-300/80"
              />,
              'WI-FI',
              'Internet de alta velocidade Telecall.',
            ],
            [
              <ShowerHead
                size={40}
                className="hover:text-2 transition-all hover:text-amber-300/80"
              />,
              'chuveiros',
              'Box privativo com chuveiros.',
            ],
            [
              <Cctv
                strokeWidth={3}
                size={40}
                className="hover:text-2 transition-all hover:text-amber-300/80"
              />,
              'Segurança 24h',
              'Ambiente monitorado para sua tranquilidade.',
            ],
            [
              <Paintbrush
                size={40}
                className="hover:text-2 transition-all hover:text-amber-300/80"
              />,
              'Limpeza',
              'Ambiente higienizado diariamente.',
            ],
            [
              <PiCoffeeBold
                size={40}
                className="hover:text-2 transition-all hover:text-amber-300/80"
              />,
              'Café',
              'Café, sucos orgânicos prensados a frio e comidinhas saudáveis.',
            ],
            [
              <WashingMachine
                size={40}
                className="hover:text-2 transition-all hover:text-amber-300/80"
              />,
              'Lavanderia',
              'Serviço de lavanderia disponível para nossos alunos.',
            ],
            [
              <Columns4
                size={40}
                className="hover:text-2 transition-all hover:text-amber-300/80"
              />,
              'Tatame Olímpico',
              'Absorve melhor as quedas e tem efeito antibactericida para a comodidade e conforto dos nossos alunos.',
            ],
            [
              <Accessibility
                size={40}
                className="hover:text-2 transition-all hover:text-amber-300/80"
              />,
              'Acessibilidade',
              'Ambiente adaptado para pessoas com deficiência.',
            ],
            [
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10 transition-all hover:text-amber-300/80"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>,
              'Clube de descontos',
              'Descontos exclusivos para nossos alunos.',
            ],
          ].map(([emoji, title, desc], i) => (
            <motion.li
              key={typeof title === 'string' ? title : `academy-section-${i}`}
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
    </section>
  )
}
