'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthButton () {
    const {data: session, status} = useSession()
    if (status === 'unauthenticated') {
        return (
            <button 
            onClick={() => signIn("github")}
            className="bg-blue-500 rounded-xl shadow shadow-black p-2 min-w-20 hover:bg-blue-600 cursor-pointer"
            >
                Sign in
            </button>
        )
    }

    return (
        <button 
        onClick={() => signOut()}
        className="border-1 border-black cursor-pointer"
        >
            Cerrar sesión
        </button>
    )
}