import Link from "next/link"
import AuthButton from "@/components/auth/authButton"
import SearchBar from "@/components/navbar/search-bar"

export default function NavBar () {
    return (
        <nav className="flex flex-col border-1 border-black justify-around p-4 md:flex-row">
            <Link href={'/'}>
                Inicio
            </Link>
            <div>
                <SearchBar/>
            </div>
            <AuthButton/>
        </nav>
    )
}