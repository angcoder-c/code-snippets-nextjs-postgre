import Link from "next/link"

export default function SnippetCardHeader ({
    username,
    image,
    date
}: {
    username:string,
    image: string | null,
    date: Date | undefined
}) {
    return (
        <div className="flex justify-between items-start mb-3 text-sm text-gray-400">
            <span className="hidden">{image}</span>
            <Link
            href={`https://github.com/${username}`}
            className="hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            >
                @{username}
            </Link>
            <span className="text-xs">
                {date?.toISOString().split("T")[0].replace(/-/g, "/")}
            </span>
        </div>
    )
}