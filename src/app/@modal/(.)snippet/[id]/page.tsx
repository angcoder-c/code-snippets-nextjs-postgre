import Modal from "./Modal"
import { fetchSnippet } from "@/app/lib/actions"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.comfig";
import { Suspense } from "react";
import ModalSkeleton from "@/components/skeletons/modalSkeleton";

export default async function SinippetModal ({ 
    params
 }: {
    params: Promise<{id: string}>
 }) {
    const id = (await params).id
    return (
        <Suspense fallback={<ModalSkeleton/>}>
            <Modal>
                <SnippetContent id={id}/>
            </Modal>
        </Suspense>
    ) 
}

// Componente separado que hace la consulta
async function SnippetContent({ id }: { id: string }) {
    const session = await getServerSession(authOptions)
    const snippet = await fetchSnippet(id, session?.user?.email)
    console.log(snippet)
    
    return <p>{snippet?.code}</p>
}