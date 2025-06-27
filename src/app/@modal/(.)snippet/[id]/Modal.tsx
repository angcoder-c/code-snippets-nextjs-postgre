'use client'

import { useRouter } from 'next/navigation'
import useClickOutside from '@/hooks/useClickOutside'

export default function Modal ({ id }: { id: string }) {
  const router = useRouter()
  const ref = useClickOutside(()=>router.back())
  return (
    <div className="page-transition fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="text-white bg-gray-800 p-4 rounded aspect-square" ref={ref}>
        <h1>Snippet {id}</h1>
        <button onClick={() => router.back()}>Close</button>
      </div>
    </div>
  )
}