'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useClickOutside from "@/hooks/useClickOutside"
import clsx from "clsx"
import Image from "next/image"

export default function AuthButton () {
    const {data:session, status} = useSession()
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)
    const ref = useClickOutside(()=>setShowMenu(false))

    if (status === 'unauthenticated') {
        return (
            <div className="max-h-fit">
                <button 
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="flex gap-3 bg-gray-800 font-bold shadow hover:bg-gray-900 active:bg-gray-900  transition-colors duration-200  border border-gray-700 text-white rounded-xl shadow-black px-3 py-2.5 min-w-28 cursor-pointer"
                >
                    <svg className="w-4.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                    Sign in
                </button>
            </div>
        )
    }

   return (
       <div className="flex flex-col gap-5 justify-end relative max-h-fit" ref={ref}>
            <button
            onClick={()=>setShowMenu(state => !state)}
            className="rounded-full hover:shadow-lg active:shadow-lg shadow shadow-black transition-all duration-300"
            >
                <Image
                src={session?.user?.image || ''}
                alt={`github:${session?.user?.name}`}
                width={60}
                height={60}
                className="rounded-full"
                />
            </button>
            <div className={
                clsx(
                    "absolute z-10 top-15 right-4 md:top-12 min-w-25 flex flex-col gap-3 items-end",
                    "origin-top-right transition-all duration-300",
                    showMenu ? 'scale-100' : 'scale-0'
                )
            }>    
                <button 
                onClick={() => router.push('/create/')}
                className={
                    clsx(
                        "py-2 px-4 rounded-lg text-right font-bold w-fit",
                        "origin-top-right transition-all duration-300",
                        "text-white border-1 border-gray-700 bg-gray-900 shadow-[inset_0px_-10px_20px_-10px_black]",
                        "hover:bg-white hover:text-gray-900 hover:shadow-none"
                    )
                }
                >
                    Create
                </button>

                <button 
                onClick={() => signOut()}
                className={
                    clsx(
                        "py-2 px-4 rounded-lg text-right font-bold w-fit",
                        "origin-top-right transition-all duration-300",
                        "text-white border-1 border-gray-700 bg-gray-900 shadow-[inset_0px_-10px_20px_-10px_black]",
                        "hover:bg-white hover:text-gray-900 hover:shadow-none"
                    )
                }
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}