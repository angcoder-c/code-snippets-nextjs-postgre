export default function SnippetTextBox ({
    text
}: {
    text:string
}) {
    return (
        <div className="h-25 overflow-hidden shadow-[inset_0px_-10px_20px_-10px_black] bg-gray-900 p-3 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                {text}
            </p>
        </div>
    )
}