import { useSnippetStore } from "@/stores/useSnippetStore"

export default function useSnippetState () {
    const snippets = useSnippetStore(state => state.snippets)
    const updateVotes = useSnippetStore(state => state.updateVotes)
    const setSnippetVotes = useSnippetStore(state => state.setSnippetVotes)
    return {
        snippets,
        updateVotes,
        setSnippetVotes
    }
}