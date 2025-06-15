import { useSearchStore } from "@/stores/useSearchStore"
import { ComplexitySupport, LanguagesSupport } from "@/types"

export default function useSearchActions () {
    const update = useSearchStore(state => state.update)
    const toggleFilters = useSearchStore(state => state.toggleFilters)
    const reset = useSearchStore(state => state.reset)

    const handleChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => {
        update({ body : event.target.value })
    }

    const handleChangeDependency = (event: React.ChangeEvent<HTMLInputElement>) => {
        update({ dependency : event.target.value })
    }

    const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        update({ keyword : event.target.value })
    }

    const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        update({ language : event.target.value as LanguagesSupport })
    }

    const handleChangeComplexity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        update({ complexity : event.target.value as ComplexitySupport })
    }

    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        update({ date : new Date(event.target.value) })
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
        handleChangeKeyword
    }
}

