'use client'

import { capitalize } from "@/utils"
import { useState } from "react"

export default function SearchTextFilter ({
    ftype,
    value,
    handleChange,
}:{
    ftype : 'dependency' | 'keyword' | 'date',
    value : string | undefined
    handleChange : (event: React.ChangeEvent<HTMLInputElement>)=>void
}) { 
    const [inputType, setInputType] = useState('text');

    return (
        <input 
        defaultValue={value}
        type={inputType} 
        placeholder={ftype==='date'? 'dd-mm-yyyy' : capitalize(ftype)} 
        onFocus={event => {
            if (!event.target.value) {
                setInputType('date');
            }
        }}
        onBlur={()=>setInputType('text')}
        onChange={handleChange}
        className="bg-gray-800 rounded-xl p-2 shadow shadow-black w-full"
        />
    )
}