import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from './ui/separator'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/academys', label: 'Academias' },
    { href: '/highlighted-rules', label: 'Regras' },
    { href: '/about', label: 'Sobre' },
    { href: '/adult-jiu-jitsu', label: 'Jiu-jitsu Adulto' },
    { href: '/kids-jiu-jitsu', label: 'Jiu-jitsu Infantil' },
    { href: '/class-schedule', label: 'Horário de aula' },
    { href: '/gallery', label: 'Galeria' },
    { href: '/contact', label: 'Fale Conosco' },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[250px] p-6 pt-10 sm:w-[300px]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
          {/* <button
            onClick={onClose}
            className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <span className="sr-only">Fechar Menu</span>
            </button> */}
        </SheetHeader>
        <Separator className="h-5" />
        <nav className="mt-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block items-center rounded-[10px] p-3 no-underline transition-all hover:bg-gray-700 hover:text-white data-[active]:underline"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
