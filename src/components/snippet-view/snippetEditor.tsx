'use client'

import { Editor } from '@monaco-editor/react'

export default function SnippetEditor ({code}:{code:string}){
    return (
        <Editor 
        theme='vs-dark' 
        defaultLanguage="python"
        defaultValue={code} 
        options={{
            readOnly: true, 
            minimap: { 
                enabled: false
            },
            lineNumbers: 'off'
        }}
        className='h-full'
        />
    )
}