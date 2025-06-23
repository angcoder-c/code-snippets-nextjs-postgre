import { DependencyType, KeywordType } from "@/types";
import SnippetTag from "@/components/snippet-card/tag";

export default function SnippetTagWrapper ({
    tags,
    formatChar
} : {
    tags : KeywordType[] | DependencyType[],
    formatChar : string
}) {
    if (tags && tags.length) {
        return (
            <div className="flex flex-wrap gap-1 mb-3">
                {
                tags.map((tag) => (
                    <SnippetTag
                    key={tag.id}
                    href={'/' /* tag.id */}
                    name={tag.name}
                    formatChar={formatChar}
                    />
                ))
                }
            </div>
        )
    } 
}