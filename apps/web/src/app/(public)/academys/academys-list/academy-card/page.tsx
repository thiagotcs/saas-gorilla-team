import Image from 'next/image'
import imgAcademy from '@/assets/ct2.jpeg'

export const AcademyCard = () => {
  return (
    <div className="group flex h-[436px] flex-col overflow-hidden rounded-lg border-2 border-gray-800 bg-gray-800 opacity-70 transition-all hover:border-emerald-500 hover:opacity-100">
      <div className="h-48 w-full overflow-hidden">
        <Image
          className=" h-full w-full rounded-t-lg object-cover transition-all duration-500 group-hover:scale-110"
          src={imgAcademy}
          alt="Academia"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col p-8">
        <strong className="font-medium text-gray-50/90 transition-all group-hover:text-emerald-500">
          Matriz
        </strong>
        <p className="mt-2 line-clamp-4 text-gray-400">
          Av. João Pereira, 3951 - Jardim Paris III, Maringá - PR
        </p>
        <span className="mt-auto block truncate text-sm font-medium text-gray-300">
          Ver academia
        </span>
      </div>
    </div>
  )
}
