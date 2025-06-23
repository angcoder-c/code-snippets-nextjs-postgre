import { useSearchStore } from "@/stores/useSearchStore"
import { ComplexitySupport, LanguagesSupport } from "@/types"
import { ComplexitySupportArray, LanguagesSupportArray } from "@/utils"
import { useCallback } from "react"

export default function useSearchActions () {
    const update = useSearchStore(state => state.update)
    const toggleFilters = useSearchStore(state => state.toggleFilters)
    const reset = useSearchStore(state => state.reset)

    // handlers individuales
    const handleChangeBody = useCallback((value: string) => {
        update({ body: value })
    }, [update])

    const handleChangeDependency = useCallback((value: string) => {
        update({ dependency: value })
    }, [update])

    const handleChangeKeyword = useCallback((value: string) => {
        update({ keyword: value })
    }, [update])

    const handleChangeLanguage = useCallback((value: string) => {
        if (!LanguagesSupportArray.includes(value)) return
        
        const languageValue = value as LanguagesSupport
        update({ language: languageValue })
    }, [update])

    const handleChangeComplexity = useCallback((value: string) => {
        if (!ComplexitySupportArray.includes(value)) return
        
        const complexityValue = value as ComplexitySupport
        update({ complexity: complexityValue })
    }, [update])

    const handleChangeDate = useCallback((value: string) => {        
        if (!value) {
            update({ date: undefined })
            return
        }

        const parsed = new Date(value)
        if (isNaN(parsed.getTime())) {
            update({ date: undefined })
            return
        }

        update({ date: parsed })
    }, [update])

    const handleToggleFilters = useCallback(
        () => toggleFilters(), 
        [toggleFilters]
    )

    const handleReset = useCallback(() => {
        reset()
    }, [reset])

    return {
        handleChangeBody,
        handleChangeDependency,
        handleChangeKeyword,
        handleChangeLanguage,
        handleChangeComplexity,
        handleChangeDate,
        handleToggleFilters,
        handleReset
    }
}