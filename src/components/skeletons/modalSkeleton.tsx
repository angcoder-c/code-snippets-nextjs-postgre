'use client'

import { useRouter } from 'next/navigation'
import useClickOutside from '@/hooks/useClickOutside'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function ModalSkeleton () {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div 
            key="modal"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
            className="text-white bg-gray-800 p-4 rounded max-w-0.8dvw border-4 border-gray-700 shadow-lg shadow-black" 
            ref={ref}
            >
              skeleton
              <button onClick={handleClose}>Close</button>
            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}