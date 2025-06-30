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
    return (
        <input 
        defaultValue={value}
        type={ftype==='date'? 'date': 'text'} 
        placeholder={ftype==='date' ? 'dd-mm-aaaa': capitalize(ftype)} 
        onChange={handleChange}
        className="bg-gray-800 rounded-xl p-2 shadow shadow-black w-full"
        />
    )
}