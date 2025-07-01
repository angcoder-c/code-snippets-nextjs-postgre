import Modal from "@/components/intercepting/modal";
import { fetchSnippet } from "@/app/lib/actions"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.comfig";
import SnippetEditor from "@/components/snippet-view/snippetEditor";
import SnippetContent from "@/components/snippet-view/snippetContent";

export default async function SnippetModal ({ 
    params
 }: {
    params: Promise<{id: string}>
 }) {
    const id = (await params).id
    const session = await getServerSession(authOptions)
    const snippet = await fetchSnippet(id, session?.user?.email)
    return (
        <Modal>
            <div className="min-w-[80dvw] h-[70dvh] flex flex-col-reverse md:flex-row rounded-lg overflow-hidden">
                <div className="md:w-[40%] w-full h-[40%] md:h-full overflow-y-auto p-4 space-y-4">
                    <SnippetContent snippet={snippet} mode="inside"/>
                </div>
                <div className="md:w-[60%] w-full h-[60%] md:h-full overflow-hidden">
                    <div className="h-full overflow-y-auto">
                    <SnippetEditor 
                    code={snippet?.code || ''} 
                    language={snippet?.language}
                    />
                    </div>
                </div>
            </div>
        </Modal>
    )
}