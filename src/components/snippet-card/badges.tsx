import { ComplexitySupport, LanguagesSupport } from "@/types"

export function ComplexityBadge ({
    complexity
}: {
    complexity : ComplexitySupport
}) {
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
            {complexity}
        </span>
    )
}

export function LanguageBadge ({
    language,
    languageVersion
}: {
    language: LanguagesSupport,
    languageVersion : string
}) {
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
            {language} {languageVersion}
        </span>
    )
}