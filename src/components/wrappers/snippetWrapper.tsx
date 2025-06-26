'use client'

import SnippetCard from "@/components/snippet-card/card";
import { SnippetType } from "@/types";

export default function SnippetWrapper ({
    snippets
} : {
    snippets : SnippetType[]
}) {
    return (
        <div className="pt-10 pb-5">
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                {snippets.map((snippet) => {
                return (
                    <SnippetCard 
                        key={snippet.id} 
                        snippet={snippet}/>
                    )
                })}
            </div>
      </div>
    )
}