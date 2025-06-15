import { useSearchStore } from "@/stores/useSearchStore";

export default function useSearchState () {
    const body = useSearchStore(state => state.body)
    const language = useSearchStore(state => state.language)
    const complexity = useSearchStore(state => state.complexity)
    const date = useSearchStore(state => state.date)
    const dependency = useSearchStore(state => state.dependency)
    const filters = useSearchStore(state => state.filters)
    const keyword = useSearchStore(state => state.keyword)

    return {
        body, 
        language, 
        complexity, 
        date, 
        dependency, 
        filters,
        keyword
    }
}