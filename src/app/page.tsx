import Navbar from "@/components/navbar/navbar";
import { fetchSnippets } from "./lib/actions";
export default async function Home() {
  const snippets = await fetchSnippets()
  
  return (
    <>
      <Navbar/>
      {
        snippets.map(snippet => <div key={snippet.id}>{snippet.title}</div>)
      }
    </>
  );
}
