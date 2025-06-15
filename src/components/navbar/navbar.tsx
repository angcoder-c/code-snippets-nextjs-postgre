'use client'

import Link from "next/link"
import AuthButton from "@/components/auth/authButton"
import SearchBar from "@/components/navbar/searchBar"
export default function NavBar () {
    // flex flex-col border-1 gap-5 justify-between border-black p-4 md:flex-row
    // flex flex-col md:grid md:grid-cols-3 border-2 border-black
    return (
        <nav className="flex flex-col border-1 gap-5 justify-between border-black p-4 md:flex-row">
            <div>
                <Link href={'/'}>
                    Inicio
                </Link>
            </div>
            <div className="w-full">
                <SearchBar/>
            </div>
            <div>
                <AuthButton/>
            </div>
        </nav>
    )
}