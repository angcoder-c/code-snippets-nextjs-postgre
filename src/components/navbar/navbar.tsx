'use client'

import AuthButton from "@/components/auth/authButton"
import SearchBar from "@/components/navbar/searchBar"
import Link from "next/link"

export default function Navbar () {
    // flex flex-col border-1 gap-5 justify-between border-black p-4 md:flex-row
    // flex flex-col md:grid md:grid-cols-3 border-2 border-black
    return (
        <header className="bg-white dark:bg-gray-800 p-4 sm:px-20 rounded-2xl shadow shadow-black border border-gray-200 dark:border-gray-700">
            <nav className="flex flex-row gap-5 justify-between p-2 size-full">
                <div className="max-h-fit">
                    <Link href={'/'} prefetch={true}>
                        Home
                    </Link>
                </div>
                <div className="hidden md:block w-full">
                    <SearchBar/>
                </div>
                <AuthButton/>
            </nav>
            <div className="block md:hidden w-full">
                <SearchBar/>
            </div>
        </header>
    )
}