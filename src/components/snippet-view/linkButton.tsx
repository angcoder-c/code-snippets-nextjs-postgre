import Link from "next/link"
export default function LinkButton ({
    children,
    href,
    blank
}: {
    href: string,
    children: React.ReactNode,
    blank: boolean
}) {
    return (
        <Link href={href} target={blank ? '_blank': '_self'} className="flex gap-2 px-4 py-2 rounded-lg border font-bold border-gray-700 items-center bg-gray-800 hover:shadow active:shadow hover:bg-gray-900 active:bg-gray-900 transition-all duration-200">
            {children}
        </Link>
    )
}