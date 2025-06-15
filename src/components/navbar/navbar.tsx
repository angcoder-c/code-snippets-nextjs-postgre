'use client'

import Link from "next/link"
import AuthButton from "@/components/auth/authButton"
import SearchBar from "@/components/navbar/searchBar"

export default function Navbar () {
    // flex flex-col border-1 gap-5 justify-between border-black p-4 md:flex-row
    // flex flex-col md:grid md:grid-cols-3 border-2 border-black
    return (
        <header className="bg-amber-500 p-4 sm:px-20 rounded-2xl mt-5">
            <nav className="flex flex-row border-1 gap-5 justify-between p-2 size-full">
                <div>
                    <Link href={'/'}>
                        Inicio
                    </Link>
                </div>
                <div className="hidden md:block w-full">
                    <SearchBar/>
                </div>
                <div>
                    <AuthButton/>
                </div>
            </nav>
            <div className="block md:hidden w-full">
                <SearchBar/>
            </div>
        </header>
    )
}