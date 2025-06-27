import Modal from "./Modal"

export default async function SinippetModal ({ 
    params
 }: {
    params: Promise<{id: string}>
 }) {
    const id = (await params).id
    return (
        <Modal id={id}/>
    ) 
}