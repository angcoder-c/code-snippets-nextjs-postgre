import { SnippetVotes } from "@/types"
import { create } from "zustand"

type SnippetStore = {
  snippets: Record<string, SnippetVotes>
  setSnippetVotes: (id: string, upvotes: number, downvotes: number, userVote?: {
      id: string,
      vote: number,
      snippetId: string
  }) => void
  updateVotes: (id: string, deltaUp: number, deltaDown: number, userVote?: {
      id: string,
      vote: number,
      snippetId: string
  } | undefined) => void
}

export const useSnippetStore = create<SnippetStore>((set) => ({
  snippets: {},
  setSnippetVotes: (id, upvotes, downvotes, userVote) =>
    set((state) => ({
      snippets: {
        ...state.snippets,
        [id]: { id, upvotes, downvotes, userVote },
      },
    })),
  updateVotes: (id, deltaUp, deltaDown, userVote) =>
    set((state) => {
      const snippet = state.snippets[id]
      if (!snippet) return state
      return {
        snippets: {
          ...state.snippets,
          [id]: {
            ...snippet,
            upvotes: snippet.upvotes + deltaUp,
            downvotes: snippet.downvotes + deltaDown,
            userVote,
          },
        },
      }
    }),
}))