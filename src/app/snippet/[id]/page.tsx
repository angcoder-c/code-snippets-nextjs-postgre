import { getSession } from "next-auth/react"
import { fetchSnippet } from "@/app/lib/actions"
import SnippetEditor from "@/components/snippet-view/snippetEditor"
import SnippetCardHeader from "@/components/snippet-card/header"
import { LanguageBadge, ComplexityBadge } from "@/components/snippet-card/badges"
import { LanguagesSupport, ComplexitySupport } from "@/types"
import SnippetTagWrapper from "@/components/snippet-card/tagWrapper"
import Link from "next/link"

export default async function SinippetPage ({ 
    params
 }: {
    params: Promise<{id: string}>
 }) {
    const id = (await params).id
    const session = await getSession()
    const snippet = await fetchSnippet(id, session?.user?.email)
    return (
      <div className="flex flex-col md:grid grid-cols-[1fr_1.5fr] gap-5 md:gap-0 fixed h-full w-full px-10 py-7 md:px-0 md:py-0 right-0 left-0 top-0 bottom-0 text-white bg-gray-800 max-h-screen md:overflow-auto overflow-y-scroll">
         <section className="md:py-7 md:px-5 md:overflow-y-scroll">
            <Link href={'/'}>Back</Link>
            <h1>{snippet?.title}</h1>
            <SnippetCardHeader 
            username={snippet?.by_user.name || ''}
            image={snippet?.by_user.image || ''}
            date={snippet?.created_at}
            />

            <div className="flex flex-wrap gap-2 mb-3">
               <LanguageBadge
               language={snippet?.language as LanguagesSupport}
               languageVersion={snippet?.language_version || ''}
               />
               <ComplexityBadge
               complexity={snippet?.complexity as ComplexitySupport}
               />
            </div>

            <SnippetTagWrapper
               tags={snippet?.keywords || []}
               formatChar="#"
            />

            <SnippetTagWrapper
               tags={snippet?.dependecies || []}
               formatChar=""
            />

            <p>{snippet?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum explicabo rem repellendus similique reiciendis, ipsam voluptate fugiat eaque placeat reprehenderit impedit eius odit! Fugiat numquam eligendi quaerat adipisci nemo laudantium. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores quo ullam, quod, eligendi enim deleniti rem corporis, ex ducimus alias veniam a sapiente magni similique quas quidem nulla illo velit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat laboriosam quae iste hic aperiam corrupti reprehenderit iure voluptas totam animi at, asperiores non, alias repudiandae. Pariatur molestias aperiam ipsum nisi? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt vero facilis ipsum voluptate alias magni, vitae explicabo tenetur perferendis, placeat dolore aperiam odio laudantium dolor inventore perspiciatis illum reprehenderit autem.</p>
         </section>
         <section className="rounded min-h-50 md:h-full md:rounded-none overflow-hidden">
            <SnippetEditor code={snippet?.code || ''}/>
         </section>
      </div>
    )
}