import Link from "next/link"

export default function SnippetTag ({
    href,
    name,
    formatChar
}: {
    href: string,
    name:string,
    formatChar:string
}) {
    return (
        <Link 
        href={href}
        className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
            {formatChar}{name}
        </Link>
    )
}