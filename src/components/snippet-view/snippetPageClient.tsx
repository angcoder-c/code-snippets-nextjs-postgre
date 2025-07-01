'use client'

import { SnippetType } from "@/types";
import SnippetEditor from "@/components/snippet-view/snippetEditor"
import SnippetContent from "@/components/snippet-view/snippetContent"

export default function SnippetPageClient ({ snippet }: {snippet : SnippetType | null}) {
   console.log(snippet?.language.split(' ')[0].toLowerCase()) 
   return (
      <div className="flex flex-col md:grid grid-cols-[1fr_1.5fr] gap-5 md:gap-0 fixed h-full w-full px-10 py-7 md:px-0 md:py-0 right-0 left-0 top-0 bottom-0 text-white bg-gray-800 max-h-screen md:overflow-auto overflow-y-scroll">
         <section className="md:py-7 md:px-5 md:overflow-y-scroll">
            <SnippetContent snippet={snippet} mode="outside"/>
         </section>
         <section className="rounded-md min-h-50 md:h-full md:rounded-none overflow-hidden">
            <SnippetEditor 
            code={snippet?.code || undefined} 
            language={snippet?.language}
            />
         </section>
      </div>
    )
}