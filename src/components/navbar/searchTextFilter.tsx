'use client'

import { capitalize } from "@/utils"
import useSearchState from "@/hooks/useSearchState"

export default function SearchTextFilter ({
    ftype,
    value,
    handleChange,
}:{
    ftype : 'dependency' | 'keyword' | 'date',
    value : string
    handleChange : (event: React.ChangeEvent<HTMLInputElement>)=>void
}) { 
    const state = useSearchState()
    console.log(state)
    const inputType = {
        date : 'date',
        dependency : 'text',
        keyword : 'text'
    }[ftype]

    return (
        <input 
        defaultValue={value}
        type={inputType} 
        placeholder={capitalize(ftype)} 
        onChange={handleChange}
        className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow shadow-black"
        />
    )
}