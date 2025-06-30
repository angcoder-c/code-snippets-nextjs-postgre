'use client'

import { useRouter } from 'next/navigation'
import useClickOutside from '@/hooks/useClickOutside'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import clsx from 'clsx'

export default function Modal ({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  
  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      router.back()
    }, 200)
  }
  const ref = useClickOutside(handleClose)

  return (
    <AnimatePresence>
      {
        isOpen && (
          <motion.div 
          key="backdrop"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center min-h-[100dvh] min-w-[100dvw]"
          >
            <motion.div 
            key="modal"
            initial={{ scale: 0.95, opacity: 1, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
            className="text-white bg-gray-800 rounded p-4 max-w-[80dvw] max-h-[90dvh] w-full h-fit border-4 border-gray-700 shadow-lg shadow-black box-content flex flex-col" 
            ref={ref}
            >
              { children }
              <button 
              onClick={handleClose}
              className={
                clsx(
                  "py-2 px-4 mt-3 w-fit rounded-lg text-right font-bold transition-all duration-300",
                  "text-white border-1 border-gray-700 bg-gray-900 shadow-[inset_0px_-10px_20px_-10px_black]",
                  "hover:bg-white hover:text-gray-900 hover:shadow-none",
                )
              }
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}