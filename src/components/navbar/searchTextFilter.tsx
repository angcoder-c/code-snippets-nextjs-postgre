'use client'

import useSearchActions from "@/hooks/useSearchActions"
import useSearchState from "@/hooks/useSearchState"
import { capitalize } from "@/utils"

export default function SearchTextFilter ({
    ftype
}:{
    ftype : 'dependency' | 'keyword' | 'date'
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

    const inputAttr = {
        date : {
            value: date.toISOString().split('T')[0],
            type : 'date',
            handleChange : handleChangeDate
        },
        dependency : {
            value : dependency,
            type : 'text',
            handleChange : handleChangeDependency
        },
        keyword : {
            value: keyword,
            type : 'text',
            handleChange : handleChangeKeyword
        }
    } [ftype]

    return (
        <input 
        value={inputAttr.value}
        type={inputAttr.type} 
        placeholder={capitalize(ftype)} 
        onChange={inputAttr.handleChange}/>
    )
}