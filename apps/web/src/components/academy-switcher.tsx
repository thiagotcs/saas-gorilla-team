import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { getAcademys } from '@/http/get-academys'
import { getCurrentAcademy } from '@/lib/server-auth-utils'

export async function AcademySwitcher() {
  // const currentGym = (await cookies()).get('gyms')?.value
  const { academys } = await getAcademys()
  const currentAcademySlug = await getCurrentAcademy()

  const currentAcademy = academys.find((gym) => gym.slug === currentAcademySlug)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {currentAcademy ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentAcademy.avatarUrl && (
                <AvatarImage src={currentAcademy.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">{currentAcademy.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Selecione academia</span>
        )}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Academias</DropdownMenuLabel>
          {academys.map((academy) => {
            return (
              <DropdownMenuItem key={academy.id} asChild>
                <Link href={`/gyms/${academy.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {academy.avatarUrl && (
                      <AvatarImage src={academy.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{academy.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-academy">
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
