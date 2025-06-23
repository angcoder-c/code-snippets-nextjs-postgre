import { useSearchStore } from "@/stores/useSearchStore"
import { ComplexitySupport, LanguagesSupport } from "@/types"
import { ComplexitySupportArray, LanguagesSupportArray } from "@/utils"
import { useRouter } from 'next/navigation'
import { ReadonlyURLSearchParams } from "next/navigation"

export default function useSearchActions ({
    searchParams,
    pathname
}: {
    searchParams?: ReadonlyURLSearchParams,
    pathname?: string,
}={}) {
    const update = useSearchStore(state => state.update)
    const toggleFilters = useSearchStore(state => state.toggleFilters)
    const reset = useSearchStore(state => state.reset)

    // query params
    const router = useRouter()
    const setQueryParams = (
        queryName:string, value:string
    )=> {
        if (!searchParams || !pathname) return
        const params = new URLSearchParams(searchParams)
        if(value!=='No select' && value){
            params.set(queryName, value)
        } else {
            params.delete(queryName)
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }


    const handleChangeBody = (value:string) => {
        update({ body : value })
    }

    const handleChangeDependency = (value:string) => {
        update({ dependency : value })
    }

    const handleChangeKeyword = (value:string) => {
        update({ keyword : value })
    }

    const handleChangeLanguage = (value: string) => {
        if (!LanguagesSupportArray.includes(value)){
            update({ language : value as LanguagesSupport })
            setQueryParams('language', value)
        }
    }

    const handleChangeComplexity = (value: string) => {
        if (ComplexitySupportArray.includes(value)) {
            update({ complexity : value as ComplexitySupport })
            setQueryParams('complexity', value)
        }
    }

    const handleChangeDate = (value: string) => {
        if (value) {
            update({ date : new Date(value) })
            setQueryParams('date', value)
        }
    }

    const handleToggleFilters = () => toggleFilters()
    const handleReset = () => reset()
    return {
        handleChangeBody,
        handleChangeDependency,
        handleChangeLanguage,
        handleChangeComplexity,
        handleChangeDate,
        handleToggleFilters,
        handleReset,
        handleChangeKeyword,
    }
}

