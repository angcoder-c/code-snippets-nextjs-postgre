'use client'

import { Editor } from '@monaco-editor/react'

export default function SnippetEditor ({
    code,
    language,
    editable
}:{
    code:string | undefined,
    language: string | undefined,
    editable?: boolean
} = {
    code: undefined,
    language: 'python',
    editable: false
}){
    console.log(language)
    return (
        <Editor 
        theme='vs-dark' 
        language={language? language.split(' ')[0].toLowerCase(): undefined}
        defaultValue={code} 
        options={{
            readOnly: editable? false: true, 
            minimap: { 
                enabled: false
            },
            lineNumbers: 'off'
        }}
        className='h-full'
        />
    )
}