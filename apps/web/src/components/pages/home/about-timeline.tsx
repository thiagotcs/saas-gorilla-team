import { Crown } from 'lucide-react'

export const AboutTimeLine = () => {
  return (
    <div className="grid grid-cols-[1fr_40px_1fr]   gap-4 md:gap-10">
      {/* texto1 */}
      <div className="flex flex-col gap-2 rounded-lg  p-6 text-gray-500 transition-all hover:bg-gray-600/30 ">
        <div className="flex flex-col gap-2 text-sm sm:text-base">
          <h1 className="text-3xl text-gray-300">Juares Santos datas</h1>
          <div className="text-gray-400">
            <p>
              Explore a jornada de um verdadeiro campeão e inspire-se na arte
              suave de Juares Santos.
            </p>
          </div>
        </div>
      </div>
      {/* icone */}
      <div className=" flex flex-col items-center">
        <div className="rounded-full border border-gray-500 p-3 transition-all hover:border-2 hover:border-amber-300/80 ">
          <Crown
            size={40}
            className="hover:text-2 transition-all hover:text-amber-300/80"
          />
        </div>
        <div className="h-full border border-gray-500 transition-all hover:border-amber-300/80" />
      </div>
      {/* texto */}
      <div className="flex flex-col gap-2 rounded-lg  p-6 text-gray-500 transition-all hover:bg-gray-600/30 hover:text-emerald-500">
        <div className="flex flex-col gap-2 text-sm sm:text-base">
          <h1 className="text-3xl text-gray-300">Juares Santos datas</h1>
          <div className="text-gray-400">
            <p>
              Explore a jornada de um verdadeiro campeão e inspire-se na arte
              suave de Juares Santos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
