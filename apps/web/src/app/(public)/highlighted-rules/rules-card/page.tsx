import Image from 'next/image'
import imgAcademy from '@/assets/IBJJF_Graduacao_PT.png'
import { Button } from '@/components/button'
import { Download } from 'lucide-react'
export const RulesCard = () => {
  return (
    <div className="group flex flex-col items-center gap-6 overflow-hidden rounded-lg border-2 border-gray-800 bg-gray-800 opacity-70 transition-all hover:border-emerald-500 hover:opacity-100 lg:flex-row lg:gap-12">
      <div className="h-48 w-full overflow-hidden  sm:h-[300px] lg:min-h-full  lg:w-[300px]">
        <Image
          src={imgAcademy}
          // width={300}
          // height={388}
          alt={`regras`}
          className="h-full w-full rounded-l-lg object-cover transition-all duration-500 group-hover:scale-110"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col p-8">
        <h3 className="flex items-center gap-3 text-lg font-medium text-gray-50">
          SISTEMA GERAL DE GRADUAÇÃO - IBJJF
        </h3>
        <p className="my-6 text-gray-400">
          A mais recente publicação do Sistema Geral de Graduação - IBJJF
          unifica e padroniza o ensino, a prática e as competições do Jiu-Jitsu,
          orientando como conduzir os atletas a evoluir e alcançar cada estágio
          do Jiu-Jitsu, da Faixa Branca à Vermelha.
        </p>
        <Button className="shadow-button w-max">
          Download
          <Download size={18} />
        </Button>
      </div>
    </div>
  )
}
