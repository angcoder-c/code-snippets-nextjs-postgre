'use client'

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { useOptimistic, useTransition, useState } from "react";
import { createVote, deleteVote } from "@/app/lib/actions";
import { VoteType } from "@/types";
import { TransitionStartFunction } from "react";
import VoteButton from "./voteButton";

export default function VoteButtonsWrapper ({
    snippetId,
    downvotes,
    upvotes,
    alreadyVotes
}: {
    snippetId: string | undefined,
    downvotes: number,
    upvotes: number,
    alreadyVotes: VoteType[] | undefined
}) {
    const router = useRouter()
    const {data: session} = useSession()
    const isLoggedin = session?.user ? true : false
    const alreadyVote = alreadyVotes?.find(vote => vote.snippetId===snippetId)
    const [vote, setVote] = useState(alreadyVote?.vote)
    
    // optimistic up-votes
    const [isUpvotePending, startUpvoteTransition] = useTransition()
    const [optimisticUpvote, setOptimisticUpvotes] = useOptimistic(
        upvotes,
        (state:number, newVote:number) => newVote
    )

    // optimistic down-votes
    const [isDownvotePending, startDownvoteTransition] = useTransition()
    const [optimisticDownvote, setOptimisticDownvotes] = useOptimistic(
        downvotes,
        (state:number, newVote:number) => newVote
    )

    const createNewVote = async (
        setVotes: (action: number) => void,
        votes: number,
        vote: 1 | -1
    ) => {
        setVotes(votes+1)
        await createVote(snippetId as string, session?.user?.email ?? '', vote)
        .then(() => router.refresh())
        .catch(err => {
            console.error('Error vote:', err)
            setVotes(votes-1)
        })
    }

    const deleteExistsVote = async (
        setVotes: (action: number) => void,
        votes: number,
        voteId: string
    ) => {
        setVotes(votes-1)
        await deleteVote(voteId as string)
        .then(() => router.refresh())
        .catch(err => {
            console.error('Error upvote delete: ', err)
            setVotes(votes+1)
        })
    }

    const handleVote = (
        rootVote: 1 | -1,
        startTransition: TransitionStartFunction,
        xvotes: number,
        setXVotes: (action: number) => void,
        yvotes: number,
        setYVotes: (action: number) => void
    ) => {
        if(vote===rootVote*-1) setVote(rootVote)
        if(vote===rootVote) setVote(undefined)
        if(vote===undefined) setVote(rootVote)

        startTransition(async ()=> {
            if(vote===rootVote*-1) setYVotes(yvotes-1)
            if(vote===rootVote && alreadyVote?.id) {
                await deleteExistsVote(setXVotes, xvotes, alreadyVote.id)
                return
            }
            if(vote===undefined) await createNewVote(setXVotes, xvotes, rootVote)
        })
    }
    return (
        <div className="flex gap-4 pt-5 text-white">
            <VoteButton
            type="up"
            isLoggedin={isLoggedin}
            disabled={isDownvotePending}
            vote={vote}
            votes={optimisticUpvote}
            onClick={() => handleVote(
                1, 
                startUpvoteTransition, 
                optimisticUpvote, 
                setOptimisticUpvotes, 
                optimisticDownvote, 
                setOptimisticDownvotes
            )}
            >
                <svg className="size-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.4 122.88"><title>up-arrow</title><path d="M24.94,67.88A14.66,14.66,0,0,1,4.38,47L47.83,4.21a14.66,14.66,0,0,1,20.56,0L111,46.15A14.66,14.66,0,0,1,90.46,67.06l-18-17.69-.29,59.17c-.1,19.28-29.42,19-29.33-.25L43.14,50,24.94,67.88Z"/></svg>
            </VoteButton>

            <VoteButton
            type="down"
            isLoggedin={isLoggedin}
            disabled={isUpvotePending}
            vote={vote}
            votes={optimisticDownvote}
            onClick={() => handleVote(
                -1, 
                startDownvoteTransition, 
                optimisticDownvote, 
                setOptimisticDownvotes,
                optimisticUpvote, 
                setOptimisticUpvotes
            )}
            >
                <svg className="size-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.4 122.88"><title>down-arrow</title><path d="M24.94,55A14.66,14.66,0,0,0,4.38,75.91l43.45,42.76a14.66,14.66,0,0,0,20.56,0L111,76.73A14.66,14.66,0,0,0,90.46,55.82l-18,17.69-.29-59.17c-.1-19.28-29.42-19-29.33.24l.29,58.34L24.94,55Z"/></svg>
            </VoteButton>
        </div>
    )
}