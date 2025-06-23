import { useSearchStore } from "@/stores/useSearchStore";
import { ReadonlyURLSearchParams } from "next/navigation";

export default function useSearchState ({
    searchParams,
    pathname
}: {
    searchParams?: ReadonlyURLSearchParams,
    pathname?: string,
}={}) {
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