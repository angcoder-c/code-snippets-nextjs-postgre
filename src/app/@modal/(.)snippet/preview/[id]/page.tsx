import Modal from "@/components/intercepting/modal";
import { fetchSnippet } from "@/app/lib/actions"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.comfig";

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
            Snippet {snippet?.id}
        </Modal>
    )
}

