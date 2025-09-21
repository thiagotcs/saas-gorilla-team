'use client'
import { Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'
export default function Footer() {
  const footerLinks = [
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
    <footer className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="text-center md:text-start">
            <h4 className="text-lg font-semibold uppercase tracking-wide">
              Sobre o Gorilla Team
            </h4>
            <p className="mt-4 text-sm text-gray-400">
              O Gorilla Team é mais do que apenas uma academia de artes
              marciais; somos um sistema de sucesso que cultiva seu
              desenvolvimento pessoal:
            </p>
          </div>
          <div className="m-auto">
            <h4 className="text-lg font-semibold uppercase tracking-wide">
              Links
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="m-auto mt-0">
            <h4 className="text-lg font-semibold uppercase tracking-wide">
              Redes Sociais
            </h4>
            <div className="mt-4 flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="bg-background hover:text-primary rounded-full p-2 text-gray-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="bg-background hover:text-primary rounded-full p-2 text-gray-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center border-t border-gray-800 pt-8 text-sm text-gray-400 md:flex-row md:justify-between">
          <div>Gorilla Team © 2025 – Todos os direitos reservados</div>
          <div>Desenvolvido por Thiago Carvalho</div>
        </div>
      </div>
    </footer>
  )
}
