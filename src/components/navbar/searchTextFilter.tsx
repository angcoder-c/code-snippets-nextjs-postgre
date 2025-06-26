'use client'

import { capitalize } from "@/utils"

export default function SearchTextFilter ({
    ftype,
    value,
    handleChange,
}:{
    ftype : 'dependency' | 'keyword' | 'date',
    value : string | undefined
    handleChange : (event: React.ChangeEvent<HTMLInputElement>)=>void
}) { 

    if (ftype==='date') {
        return (
            <input 
            defaultValue={value ? value : ''}
            type="date" 
            placeholder={capitalize(ftype)} 
            onChange={handleChange}
            className="bg-gray-800 rounded-xl p-2 shadow shadow-black"
            />
        )
    }    

    return (
        <input 
        defaultValue={value}
        type="text" 
        placeholder={capitalize(ftype)} 
        onChange={handleChange}
        className="bg-gray-800 rounded-xl p-2 shadow shadow-black"
        />
    )
}