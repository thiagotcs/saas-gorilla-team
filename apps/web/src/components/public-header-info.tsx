import Link from 'next/link'
import Image from 'next/image'
import gorillaIconMenu from '@/assets/gorilla_icon.png'
import { Mail, Phone } from 'lucide-react'
import { Separator } from './ui/separator'
import { TrialClass } from './pages/home/trial-class'

export function PublicHeaderInfo() {
  return (
    <header className="w-full bg-[#fef3c7] p-2 dark:bg-[#121214]">
      <div className="mx-auto flex flex-col items-center  justify-between  gap-1 px-4 sm:flex-row lg:max-w-7xl">
        <div className="flex gap-6">
          {/* <Link href="/" className="flex items-center gap-2"> */}
          <div className="flex items-center gap-2">
            <Phone className="size-4" />
            <a className="text-[13px] font-semibold text-gray-900 dark:text-white">
              (44) 99936-6019
            </a>
          </div>
          <Separator orientation="vertical" className="h-6 bg-amber-50" />
          <div className="flex items-center gap-2">
            <Mail className="size-4" />
            <a className="text-[13px] font-semibold text-gray-900 dark:text-white">
              info@gorillateambjj.com
            </a>
          </div>
          {/* </Link> */}
        </div>

        <div className="sm:max-w-3xs flex w-full gap-4">
          <TrialClass />
        </div>
      </div>
    </header>
  )
}
