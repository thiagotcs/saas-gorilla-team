'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from './button'
import Link from 'next/link'
import Image from 'next/image'
import logoWhatsApp from '@/assets/whatsapp-logo.svg'

export const ContactWhatsApp = () => {
  const [show, setShow] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleScroll = useCallback(() => {
    if (!show && window.scrollY > 500) setShow(true)
    if (show && window.scrollY <= 500) setShow(false)
  }, [show])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // if (!show) return null

  return (
    // <AnimatePresence>
    //     <motion.
    <div
      className="fixed bottom-4 right-4 z-20"
      // initial={{ opacity: 0, right: -10 }}
      // animate={{ opacity: 1, right: 16 }}
      // exit={{ opacity: 0, right: -10 }}
    >
      {/* </motion.> */}
      <Link href="https://wa.me/5511999999999" target="_blank">
        <Button className="cursor-pointer shadow-lg shadow-emerald-400/20">
          <Image
            src={logoWhatsApp}
            className="size-5 "
            alt="CT Gorilla Team Matriz "
          />
        </Button>
      </Link>
    </div>
    // </AnimatePresence>
  )
}
