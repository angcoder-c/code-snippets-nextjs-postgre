'use client'

import useSearchActions from "@/hooks/useSearchActions"
import useSearchState from "@/hooks/useSearchState"
import { LanguagesSupportArray, ComplexitySupportArray } from "@/utils"

export default function SearchSelectFilter ({
    ftype
}:{
    ftype : 'language' | 'complexity'
}) { 
    const { 
        handleChangeLanguage,
        handleChangeComplexity
    } = useSearchActions()

    const { 
        language, 
        complexity
    } = useSearchState()

    const inputAttr = {
        language : {
            value : language,
            opts : LanguagesSupportArray,
            handleChange : handleChangeLanguage
        },
        complexity : {
            value : complexity,
            opts : ComplexitySupportArray,
            handleChange : handleChangeComplexity
        }
    } [ftype]

    return (
        <select className="bg-blue-500 p-2 rounded-xl shadow shadow-black" defaultValue={inputAttr.value} onChange={inputAttr.handleChange}>
            {
                inputAttr.opts.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))
            }
        </select>
    )
}