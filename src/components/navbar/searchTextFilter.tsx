'use client'

import useSearchActions from "@/hooks/useSearchActions"
import useSearchState from "@/hooks/useSearchState"
import { capitalize } from "@/utils"
import { DebouncedState } from "use-debounce"

export default function SearchTextFilter ({
    ftype,
    handleSearch
}:{
    ftype : 'dependency' | 'keyword' | 'date',
    handleSearch?: DebouncedState<(
        queryName: string, 
        value: string, 
    ) => void>
}) { 
    const { 
        handleChangeDate, 
        handleChangeDependency, 
        handleChangeKeyword 
    } = useSearchActions()

    const { 
        date, 
        dependency, 
        keyword 
    } = useSearchState()

    const handleDoubounceChangeFiled = (
            queryName:string, 
            event: React.ChangeEvent<HTMLInputElement>, 
            callback: (event: React.ChangeEvent<HTMLInputElement>
        )=>void) => {
        if (!handleSearch) { 
            callback(event)
            return
        }
        handleSearch(queryName, event.target.value)
        callback(event)
    }

    const inputAttr = {
        date : {
            value: date.toISOString().split('T')[0],
            type : 'date',
            handleChange : handleChangeDate
        },
        dependency : {
            value : dependency,
            type : 'text',
            handleChange : (
                event: React.ChangeEvent<HTMLInputElement>
            ) => handleDoubounceChangeFiled(
                'dependencies', 
                event, 
                handleChangeDependency
            )
        },
        keyword : {
            value: keyword,
            type : 'text',
            handleChange : (
                event: React.ChangeEvent<HTMLInputElement>
            ) => handleDoubounceChangeFiled(
                'keywords', 
                event, 
                handleChangeKeyword
            )
        }
    } [ftype]

    return (
        <input 
        value={inputAttr.value}
        type={inputAttr.type} 
        placeholder={capitalize(ftype)} 
        onChange={inputAttr.handleChange}
        className="bg-blue-500 rounded-xl p-2 shadow shadow-black"
        />
    )
}