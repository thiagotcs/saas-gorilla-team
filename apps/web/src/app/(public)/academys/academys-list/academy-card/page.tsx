import Image from 'next/image'
import { Academy } from '@/types/academys'
import { ArrowUpRight } from 'lucide-react'

export const AcademyCard = ({ academy }: { academy: Academy }) => {
  const imgAcademy = academy?.thumbnail?.url || ''
  return (
    <div className="group flex h-[436px] flex-col overflow-hidden rounded-lg border-2 border-gray-800 bg-gray-800 opacity-70 transition-all hover:border-emerald-500 hover:opacity-100">
      <div className="h-75 w-full overflow-hidden">
        <Image
          width={400}
          height={192}
          className="h-full w-full rounded-t-lg object-cover transition-all duration-500 group-hover:scale-110"
          src={imgAcademy}
          alt="Academia"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <strong className="font-medium text-gray-50/90 transition-all group-hover:text-emerald-500">
          {academy?.title}
        </strong>
        <p className="mt-2 line-clamp-4 text-gray-400">
          {academy?.shortDescription}
        </p>
        <span className=" mt-4 block flex-1 items-center justify-end truncate text-sm font-medium text-gray-300 transition-all group-hover:text-emerald-500 flex">
          Ver academia
          <ArrowUpRight size={20} />
        </span>
      </div>
    </div>
  )
}
