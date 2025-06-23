import Navbar from "@/components/navbar/navbar";
import { fetchSnippets } from "./lib/actions";
import SnippetCard from "@/components/snippet-card/card";

export default async function Home() {
  const snippets = await fetchSnippets()
  return (
    <>
      <Navbar />
      <div className="pt-10 pb-5">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
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

/*
  props
 : {
    searchParams? : Promise<{
        body? : string,
        dependencies? : string,
        keywords? : string,
        date? : string,
        complexity? : string,
        language? : string
    }>
}
*/