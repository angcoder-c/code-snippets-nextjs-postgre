import { getSession } from "@/app/lib/auth"
import SnippetCreateClientPage from "./createClientPage"

export default async function SnippetCreatePage () {
    const session = await getSession()
    console.log(session)
    
    return (
        <SnippetCreateClientPage/>
    )
}