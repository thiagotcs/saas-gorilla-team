'use client'
import Link from 'next/link'
import Image from 'next/image'
import gorillaIconMenu from '@/assets/Logo-circle.svg'
import { PublicLoginButton } from './public-login-button'
import { Instagram, Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileMenu } from './mobile-menu'

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    <header className="sticky top-0 z-50 bg-white/80 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-full items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={gorillaIconMenu}
              alt="Gorilla Team"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              GORILLA TEAM
            </span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="AuiLinkButton-label relative flex justify-center after:absolute after:bottom-0 after:h-px after:w-0 after:bg-[currentColor] after:transition-all after:content-[''] hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* <PublicLoginButton /> */}
          <a
            href="/"
            rel="noopener noreferrer"
            className="block items-center rounded-[10px] p-3 no-underline transition-all hover:bg-gray-700 hover:text-white data-[active]:underline"
          >
            <Instagram className=" hidden size-6 md:block" />
          </a>
          <div
            className="flex items-center  rounded-[10px] p-3 no-underline transition-all hover:bg-gray-700 hover:text-white data-[active]:underline lg:hidden
        "
          >
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className=" text-gray-900 lg:hidden dark:text-white"
              aria-label="Abrir menu"
            >
              <Menu className="size-6 cursor-pointer " />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  )
}
