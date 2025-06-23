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
            value : LanguagesSupportArray.includes(value) ? value : 'No select',
            opts : LanguagesSupportArray,
        },
        complexity : {
            value : ComplexitySupportArray.includes(value) ? value : 'No select',
            opts : ComplexitySupportArray,
        }
    } [ftype]

    return (
        <div className="flex flex-col">
            <label>{capitalize(ftype)}</label>
            <select className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow shadow-black" value={inputAttr.value} onChange={handleChange}>
                {
                    inputAttr.opts.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))
                }
            </select>
        </div>
    )
}