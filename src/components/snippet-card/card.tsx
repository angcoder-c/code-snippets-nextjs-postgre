"use client"

import { ComplexityBadge, LanguageBadge } from "@/components/snippet-card/badges";
import SnippetTextBox from "@/components/snippet-card/textBox";
import SnippetCardHeader from "@/components/snippet-card/header";
import SnippetTagWrapper from "@/components/snippet-card/tagWrapper";
import { SnippetType } from "@/types";
import VoteButtonsWrapper from "./voteButtonsWrapper";
import Link from "next/link";

export default function SnippetCard ({
    snippet 
}: {
    snippet : SnippetType
}) {
    return (
        <div className="break-inside-avoid mb-4">
            <div className="bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-300 border border-gray-700 shadow-black">
                <SnippetCardHeader
                username={snippet.by_user.name}
                image={snippet.by_user.image}
                date={snippet.created_at}
                />
                    
                {/* titulo */}
                <div className="flex gap-3 items-center mb-3">
                    <Link 
                    href={`/snippet/${snippet.id}`} 
                    className="text-lg font-semibold text-white line-clamp-2 hover:underline"
                    >
                        {snippet.title}
                    </Link>
                    <Link 
                    href={`/snippet/${snippet.id}`} 
                    target="_blank"
                    className="size-4 text-white scale-100 hover:scale-150 active:scale-150 transition-transform duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>
                    </Link>
                </div>
                

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
                <SnippetTagWrapper
                tags={snippet?.dependecies || []}
                formatChar=""
                />

                <div className="relative mb-3">
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