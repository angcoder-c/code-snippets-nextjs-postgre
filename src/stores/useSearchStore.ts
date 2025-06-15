import { SearchBarType, SearchBarUpdate } from "@/types";
import { create } from "zustand";

const initialState: SearchBarUpdate = {
    body : "",
    language : "No select",
    dependency : "",
    date : new Date(),
    complexity : "No select",
    filters: false,
    keyword : ""
}

export const useSearchStore = create<SearchBarType>((set) => ({
    ...initialState,
    update: (update: Partial<SearchBarUpdate>) => set(
        (state) => ({ ...state, ...update })
    ),
    toggleFilters : () => set(
        state => ({
            filters: !state.filters
        })
    ),
    reset : () => set(initialState)
}))