import Image from 'next/image'

import logoCTG from '@/assets/Logo-circle.svg'
import { ProfileButton } from './profile-button'
import { AcademySwitcher } from './academy-switcher'
import { Slash } from 'lucide-react'
import { defineUserAbility } from '@/lib/server-auth-utils'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await defineUserAbility()
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        <Image
          src={logoCTG}
          className="size-8 "
          alt="CT Gorilla Team Matriz "
        />
        <Slash className="text-border size-5 -rotate-[24deg]" />
        <AcademySwitcher />
        {permissions?.can('get', 'Academy') && <p>Project Placeholder</p>}
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
