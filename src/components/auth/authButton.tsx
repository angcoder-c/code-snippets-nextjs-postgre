'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthButton () {
    const {data: session, status} = useSession()
    if (status === 'unauthenticated') {
        return (
            <button 
            onClick={() => signIn("github")}
            className="border-1 border-black"
            >
                Iniciar sesión
            </button>
        )
    }

    return (
        <button 
        onClick={() => signOut()}
        className="border-1 border-black"
        >
            Cerrar sesión
        </button>
    )
}