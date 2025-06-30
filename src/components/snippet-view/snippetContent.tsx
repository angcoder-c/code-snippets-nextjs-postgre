'use client'

import VoteButtonsWrapper from "@/components/snippet-card/voteButtonsWrapper"
import SnippetCardHeader from "@/components/snippet-card/header"
import { LanguageBadge, ComplexityBadge } from "@/components/snippet-card/badges"
import SnippetTagWrapper from "@/components/snippet-card/tagWrapper"
import SnippetTextBoxExpand from "@/components/snippet-view/snippetTextBoxExpand"
import { SnippetType, LanguagesSupport, ComplexitySupport } from "@/types"
import LinkButton from "./linkButton"
import useSnippetState from "@/hooks/useSnippetSatate"
import { useEffect } from "react"

export default function SnippetContent({
    snippet,
    mode
}: {
    snippet: SnippetType | null,
    mode: 'inside' | 'outside'
}) {
    const { setSnippetVotes } = useSnippetState()
    
    useEffect(() => {
        if (!snippet?.id) return
        
        const userVote = snippet.alreadyVotes?.[0] 
        if (userVote) {
            setSnippetVotes(
                snippet.id, 
                snippet.upvotes, 
                snippet.downvotes, 
                {
                    id: userVote?.id || '', 
                    vote: userVote.vote, 
                    snippetId: userVote.snippetId
                }
            )
        }
    }, [
        snippet?.id, 
        snippet?.upvotes, 
        snippet?.downvotes, 
        snippet?.alreadyVotes, 
        setSnippetVotes
    ])

    if (!snippet) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Snippet not found
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-between mb-3">
                {mode === 'inside' && (
                    <LinkButton 
                        href={`/snippet/${snippet.id}`}
                        blank={true}
                    >
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                            <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/>
                        </svg>
                    </LinkButton>
                )}
                
                {mode === 'outside' && (
                    <LinkButton 
                        href="/"
                        blank={false}
                    >
                        <svg className="size-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/>
                        </svg>
                        Back
                    </LinkButton>
                )}

                <VoteButtonsWrapper
                snippetId={snippet.id || ''}
                />
            </div>

            <h1 className="font-bold text-2xl">
                {snippet.title}
            </h1>

            <SnippetCardHeader 
                username={snippet.by_user?.name || 'Anonymous'}
                image={snippet.by_user?.image || ''}
                date={snippet.created_at}
            />

            <div className="flex flex-wrap gap-2 mb-3">
                <LanguageBadge
                    language={snippet.language as LanguagesSupport}
                    languageVersion={snippet.language_version || ''}
                />
                <ComplexityBadge
                    complexity={snippet.complexity as ComplexitySupport}
                />
            </div>

            <SnippetTagWrapper
                tags={snippet.keywords || []}
                formatChar="#"
            />

            <div className="flex flex-col gap-2">
                <span className="font-light w-full">
                    Dependencies
                </span>
                <SnippetTagWrapper
                    tags={snippet.dependecies || []}
                    formatChar=""
                />
            </div>
            
            <SnippetTextBoxExpand 
                text={snippet.description || ''}
            />
        </>
    )
}