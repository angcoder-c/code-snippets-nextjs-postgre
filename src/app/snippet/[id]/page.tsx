export default async function SinippetPage ({ 
    params
 }: {
    params: Promise<{id: string}>
 }) {
    const id = (await params).id
    return <span className="text-white">Snippet {id}</span>
}