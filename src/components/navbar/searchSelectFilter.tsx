'use client'

import { LanguagesSupportArray, ComplexitySupportArray, capitalize } from "@/utils"

export default function SearchSelectFilter ({
    ftype,
    value,
    handleChange
}:{
    ftype : 'language' | 'complexity',
    value: string,
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) { 

    const inputAttr = {
        language : {
            opts : LanguagesSupportArray,
        },
        complexity : {
            opts : ComplexitySupportArray,
        }
    } [ftype]

    return (
        <div className="flex flex-col gap-3">
            <label>{capitalize(ftype)}</label>
            <select 
            key={`${ftype}-${value}`}
            className="bg-gray-800 p-2 rounded-xl shadow shadow-black" 
            defaultValue={value} 
            onChange={handleChange}
            >
                {
                    inputAttr.opts.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))
                }
            </select>
        </div>
    )
}