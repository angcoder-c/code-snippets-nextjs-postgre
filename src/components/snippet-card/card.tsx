"use client"

import { ComplexityBadge, LanguageBadge } from "@/components/snippet-card/badges";
import SnippetTextBox from "@/components/snippet-card/textBox";
import SnippetCardHeader from "@/components/snippet-card/header";
import SnippetTagWrapper from "@/components/snippet-card/tagWrapper";
import { SnippetType } from "@/types";
import VoteButtonsWrapper from "./voteButtonsWrapper";

export default function SnippetCard ({
    snippet 
}: {
    snippet : SnippetType
}) {    
    return (
        <div className="break-inside-avoid mb-4">
            <div className="bg-gray-800 rounded-2xl p-4 shadow hover:shadow-lg transition-shadow duration-300 border border-gray-700 shadow-black">
                <SnippetCardHeader
                username={snippet.by_user.name}
                image={snippet.by_user.image}
                date={snippet.created_at}
                />
                    
                {/* titulo */}
                <h2 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                    {snippet.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-3">
                    <LanguageBadge
                    language={snippet.language}
                    languageVersion={snippet.language_version}
                    />
                    <ComplexityBadge
                    complexity={snippet.complexity}
                    />
                </div>

                <SnippetTagWrapper
                tags={snippet.keywords}
                formatChar="#"
                />

                <div className="relative">
                    <SnippetTextBox
                    text={snippet.description}
                    />
                </div>
                <VoteButtonsWrapper
                snippetId={snippet.id}
                upvotes={snippet.upvotes}
                downvotes={snippet.downvotes}
                alreadyVotes={snippet.alreadyVotes}
                />
            </div>
        </div>
    )
}