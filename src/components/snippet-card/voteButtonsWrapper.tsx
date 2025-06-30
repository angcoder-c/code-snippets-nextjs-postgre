'use client'

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { createVote, deleteVote } from "@/app/lib/actions";
import VoteButton from "./voteButton";
import useSnippetState from "@/hooks/useSnippetSatate";

export default function VoteButtonWrapper({ snippetId }: { snippetId: string }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const isLoggedIn = status === 'authenticated'

    const [, startTransition] = useTransition()
    const { snippets, updateVotes } = useSnippetState()
    const snippet = snippets[snippetId]

    if (!snippet) return null

    const { 
        upvotes, 
        downvotes, 
        userVote 
    } = snippet
    const vote = userVote?.vote

    const handleVote = (rootVote: 1 | -1) => {
        if (!isLoggedIn) return

        let deltaUp = 0
        let deltaDown = 0
        let newVote: typeof userVote | undefined = undefined

        // change vote
        if (vote === rootVote * -1) {
            deltaUp = rootVote === 1 ? 1 : -1
            deltaDown = rootVote === -1 ? 1 : -1
            newVote = { 
                id: userVote?.id || '', 
                vote: rootVote, 
                snippetId 
            }
        }

        // delete vote
        else if (vote === rootVote && userVote?.id) {
            deltaUp = rootVote === 1 ? -1 : 0
            deltaDown = rootVote === -1 ? -1 : 0
            newVote = undefined
        }

        // new vote voto
        else if (vote === undefined) {
            deltaUp = rootVote === 1 ? 1 : 0
            deltaDown = rootVote === -1 ? 1 : 0
            newVote = { id: '', vote: rootVote, snippetId }
        }

        // optimistic values
        updateVotes(snippetId, deltaUp, deltaDown, newVote)

        startTransition(async () => {
            try {
                if (vote === rootVote && userVote?.id) {
                    await deleteVote(userVote.id)
                } else {
                    await createVote(snippetId, session?.user?.email ?? '', rootVote)
                }
                router.refresh()
            } catch (err) {
                console.error('Error vote', err)
                updateVotes(snippetId, -deltaUp, -deltaDown, userVote)
            }
        })
    }
    return (
        <div className="flex gap-4 text-white">
            <VoteButton
            type="up"
            isLoggedin={isLoggedIn}
            vote={vote}
            votes={upvotes}
            onClick={() => handleVote(1)}
            >
                <svg className="size-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.4 122.88"><title>up-arrow</title><path d="M24.94,67.88A14.66,14.66,0,0,1,4.38,47L47.83,4.21a14.66,14.66,0,0,1,20.56,0L111,46.15A14.66,14.66,0,0,1,90.46,67.06l-18-17.69-.29,59.17c-.1,19.28-29.42,19-29.33-.25L43.14,50,24.94,67.88Z"/></svg>
            </VoteButton>

            <VoteButton
            type="down"
            isLoggedin={isLoggedIn}
            vote={vote}
            votes={downvotes}
            onClick={() => handleVote(-1)}
            >
                <svg className="size-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.4 122.88"><title>down-arrow</title><path d="M24.94,55A14.66,14.66,0,0,0,4.38,75.91l43.45,42.76a14.66,14.66,0,0,0,20.56,0L111,76.73A14.66,14.66,0,0,0,90.46,55.82l-18,17.69-.29-59.17c-.1-19.28-29.42-19-29.33.24l.29,58.34L24.94,55Z"/></svg>
            </VoteButton>
        </div>
    )
}