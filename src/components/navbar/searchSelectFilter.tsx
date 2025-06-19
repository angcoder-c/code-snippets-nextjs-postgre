'use client'

import useSearchActions from "@/hooks/useSearchActions"
import useSearchState from "@/hooks/useSearchState"
import { ComplexitySupport, LanguagesSupport } from "@/types"
import { LanguagesSupportArray, ComplexitySupportArray, capitalize } from "@/utils"

export default function SearchSelectFilter ({
    ftype,
    handleChange
}:{
    ftype : 'language' | 'complexity',
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) { 

    const { 
        language, 
        complexity
    } = useSearchState()

    const inputAttr = {
        language : {
            value : language,
            opts : LanguagesSupportArray,
        },
        complexity : {
            value : complexity,
            opts : ComplexitySupportArray,
        }
    } [ftype]

    return (
        <div className="flex flex-col">
            <label>{capitalize(ftype)}</label>
            <select className="bg-blue-500 p-2 rounded-xl shadow shadow-black" defaultValue={inputAttr.value} onChange={handleChange}>
                {
                    inputAttr.opts.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))
                }
            </select>
        </div>
    )
}