import Navbar from "@/components/navbar/navbar";
import { fetchSnippets } from "./lib/actions";
import SnippetCard from "@/components/snippet-card/card";

export default async function Home() {
  const snippets = await fetchSnippets()
  return (
    <>
      <Navbar />
      <div className="pt-10 pb-5">
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] space-y-4">
          {snippets.map((snippet) => {
            return (
              <SnippetCard 
              key={snippet.id} 
              snippet={snippet}/>
            )
          })}
        </div>
      </div>
    </>
  );
}
