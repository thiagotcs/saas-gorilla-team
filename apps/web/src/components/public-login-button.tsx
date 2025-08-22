'use client'
import { ChevronDown, User2Icon, LogInIcon, UserRoundPlus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function PublicLoginButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center outline-none">
        <div
          className="flex  items-center rounded-[10px] p-3 no-underline transition-all hover:bg-gray-700 hover:text-white data-[active]:underline
        "
        >
          <User2Icon className=" size-6 cursor-pointer " />
          <ChevronDown className="text-muted-foreground size-4 cursor-pointer " />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href="/">
            <LogInIcon className="mr-2 size-4" />
            Login
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/api/auth/sign-out">
            <UserRoundPlus className="mr-2 size-4" />
            Registre-se
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
