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
            <a
            href={`https://github.com/${username}`}
            className="hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            >
                @{username}
            </a>
            <span className="text-xs">
                {date?.toISOString().split("T")[0].replace(/-/g, "/")}
            </span>
        </div>
    )
}