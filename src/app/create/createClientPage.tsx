'use client'

import SnippetEditor from "@/components/snippet-view/snippetEditor"
import useSearchState from "@/hooks/useSearchState"
import useSearchActions from "@/hooks/useSearchActions"
import SearchSelectFilter from "@/components/navbar/searchSelectFilter"

export default function SnippetCreateClientPage () {
    const { 
            language,
        } = useSearchState()
    
      const {
        handleChangeLanguage,
      } = useSearchActions()
    
    return (
        <div className="flex flex-col md:grid grid-cols-[1fr_1.5fr] gap-5 md:gap-0 fixed h-full w-full px-10 py-7 md:px-0 md:py-0 right-0 left-0 top-0 bottom-0 text-white bg-gray-800 max-h-screen md:overflow-auto overflow-y-scroll">
                 <section className="md:py-7 md:px-5 md:overflow-y-scroll">
                    <SearchSelectFilter 
                    ftype='language'
                    value="No select"
                    handleChange={e=>{
                        handleChangeLanguage(e.target.value)}}
                    />
                 </section>
                 <section className="rounded-md min-h-50 md:h-full md:rounded-none overflow-hidden">
                    <SnippetEditor 
                    code={''} 
                    language={
                        language==='No select'
                        ? undefined
                        : language
                    } 
                    editable={true}/>
                 </section>
              </div>
    )
}