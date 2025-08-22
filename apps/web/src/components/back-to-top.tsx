'use client'

// import { TbArrowNarrowUp } from 'react-icons/tb'
// import { Button } from '../button'
// import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { ArrowBigUp, ArrowUp } from 'lucide-react'
import { Button } from './button'

export const BackToTop = () => {
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

  if (!show) return null

  return (
    // <AnimatePresence>
    //     <motion.
    <div
      className="fixed bottom-4 right-4 z-20"
      // initial={{ opacity: 0, right: -10 }}
      // animate={{ opacity: 1, right: 16 }}
      // exit={{ opacity: 0, right: -10 }}
    >
      <Button
        onClick={scrollToTop}
        className="cursor-pointer shadow-lg shadow-emerald-400/20"
      >
        <ArrowUp size={20} />
      </Button>
      {/* </motion.> */}
    </div>
    // </AnimatePresence>
  )
}
