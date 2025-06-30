import { getSession } from "@/app/lib/auth"
import { fetchSnippet } from "@/app/lib/actions"
import SnippetPageClient from "@/components/snippet-view/snippetPageClient"

export default async function SinippetPage ({ 
    params
 }: {
    params: Promise<{id: string}>
 }) {
    const id = (await params).id
    const session = await getSession()
    const snippet = await fetchSnippet(id, session?.user?.email)
    
    return (
      <SnippetPageClient snippet={snippet}/>
    )
}