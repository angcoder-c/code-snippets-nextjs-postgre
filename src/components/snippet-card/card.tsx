"use client"

import { ComplexityBadge, LanguageBadge } from "@/components/snippet-card/badges";
import SnippetTextBox from "@/components/snippet-card/textBox";
import SnippetCardHeader from "@/components/snippet-card/header";
import SnippetTagWrapper from "@/components/snippet-card/tagWrapper";
import { SnippetType } from "@/types";
import { useOptimistic, useTransition } from "react";
import { createUpVote, createDownVote } from "@/app/lib/actions";
import { useSession } from "next-auth/react";

export default function SnippetCard ({
    snippet 
}: {
    snippet : SnippetType
}) {
    const [isUpvotePending, startUpvoteTransition] = useTransition()
    const [isDownvotePending, startDownvoteTransition] = useTransition()
    const {data: session} = useSession()

    const [optimisticUpvote, setOptimisticUpvotes] = useOptimistic(
        snippet.upvotes, 
        (state: number, newUpvotes:number) => newUpvotes
    )

    const [optimisticDownvote, setOptimisticDownvotes] = useOptimistic(
        snippet.downvotes, 
        (state: number, newDownvotes:number) => newDownvotes
    )

    const handleUpvote = async () => {
        const newUpvotes = optimisticUpvote + 1
        setOptimisticUpvotes(newUpvotes)
        startUpvoteTransition(async () => {
            try {
                await createUpVote(snippet.id as string, session?.user?.email ?? '')
            } catch (error) {
                console.error('Error upvote:', error)
                setOptimisticUpvotes(newUpvotes-1)
            }
        })
    }

    const handleDownvote = async () => {
        const newDownvotes = optimisticDownvote - 1
        setOptimisticDownvotes(newDownvotes)
        startDownvoteTransition(async () => {
            try {
                await createDownVote(snippet.id as string, session?.user?.email ?? '')
            } catch (error) {
                console.error('Error upvote:', error)
                setOptimisticDownvotes(newDownvotes+1)
            }
        })
    }

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

                <div className="flex gap-4 pt-5 text-white">
                    <button onClick={() => {
                        if (session?.user) { 
                            handleUpvote()
                        } else {
                            console.log('sign in')
                        }
                    }} className="flex gap-2 px-4 py-2 rounded-lg border border-gray-700 items-center bg-gray-800 hover:shadow hover:bg-gray-900 transition-all duration-200">
                        <svg className="size-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.4 122.88"><title>up-arrow</title><path d="M24.94,67.88A14.66,14.66,0,0,1,4.38,47L47.83,4.21a14.66,14.66,0,0,1,20.56,0L111,46.15A14.66,14.66,0,0,1,90.46,67.06l-18-17.69-.29,59.17c-.1,19.28-29.42,19-29.33-.25L43.14,50,24.94,67.88Z"/></svg>
                        {
                            isUpvotePending 
                            ? <span className="bg-yellow-500">{optimisticUpvote}</span>
                            : <span>{optimisticUpvote}</span>
                        }
                    </button>

                    <button onClick={() => {
                        if (session?.user) { 
                            handleDownvote()
                        } else {
                            console.log('sign in')
                        }
                    }} className="flex gap-2 px-4 py-2 rounded-lg border border-gray-700 items-center bg-gray-800 hover:shadow hover:bg-gray-900 transition-all duration-200">
                        <svg className="size-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.4 122.88"><title>down-arrow</title><path d="M24.94,55A14.66,14.66,0,0,0,4.38,75.91l43.45,42.76a14.66,14.66,0,0,0,20.56,0L111,76.73A14.66,14.66,0,0,0,90.46,55.82l-18,17.69-.29-59.17c-.1-19.28-29.42-19-29.33.24l.29,58.34L24.94,55Z"/></svg>
                         {
                            isDownvotePending 
                            ? <span className="bg-yellow-500">{optimisticDownvote}</span>
                            : <span>{optimisticDownvote}</span>
                        }
                    </button>
                </div>
        </div>
    </div>
    )
}