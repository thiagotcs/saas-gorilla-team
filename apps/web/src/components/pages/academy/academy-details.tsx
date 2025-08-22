import { SectionTitle } from '@/components/section-title'
import {
  Accessibility,
  Cctv,
  Columns4,
  Crown,
  Paintbrush,
  ShowerHead,
  WashingMachine,
  Wifi,
} from 'lucide-react'

export default function AcademyDetails() {
  return (
    <section className="relative flex w-full flex-col  items-center justify-end overflow-hidden px-6 py-24 pb-10 sm:min-h-[750px] sm:pb-24">
      <div
        className="absolute inset-0 z-[-1] m-auto mt-0 flex px-4"
        style={{
          background: `url(/images/Academy-hero-bg.png) no-repeat center/cover, url(/images/gorilla-hero-bg.png) no-repeat center/cover`,
        }}
      />

      <div className="m-auto max-w-[640px] text-center text-sm text-gray-400 sm:mt-2.5 sm:text-base">
        <h3 className="mt-50 text-center text-3xl font-medium uppercase text-gray-100">
          GORILLA TEAM - MATRIZ
        </h3>
        <p className="mt-10">
          A <strong>GORILLA TEAM</strong> oferece aulas para homens, mulheres e
          crianças a partir dos 4 anos. Mais do que treinos, proporcionamos
          experiências transformadoras, incentivamos um estilo de vida saudável
          e cultivamos o cuidado com o meio ambiente e a responsabilidade
          social.
          <br />
          Nossa metodologia é única e diferenciada, em um ambiente acolhedor que
          valoriza cada aluno. Muito além de uma arte marcial, a
          <strong>GORILLA TEAM</strong> representa um verdadeiro estilo de vida.
        </p>
      </div>
      <div className="flex w-full max-w-[330px] flex-wrap items-center justify-center gap-2">
        <Wifi
          size={40}
          className="hover:text-2 transition-all hover:text-amber-300/80"
        />
        <ShowerHead
          size={40}
          className="hover:text-2 transition-all hover:text-amber-300/80"
        />
        <Cctv
          strokeWidth={3}
          size={40}
          className="hover:text-2 transition-all hover:text-amber-300/80"
        />
        <Paintbrush
          size={40}
          className="hover:text-2 transition-all hover:text-amber-300/80"
        />
        <WashingMachine
          size={40}
          className="hover:text-2 transition-all hover:text-amber-300/80"
        />
        <Columns4
          size={40}
          className="hover:text-2 transition-all hover:text-amber-300/80"
        />
        <Accessibility
          size={40}
          className="hover:text-2 transition-all hover:text-amber-300/80"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="hover:text-2 size-10 transition-all hover:text-amber-300/80"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
          />
        </svg>
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
        </svg>
      </div>
    </section>
  )
}
