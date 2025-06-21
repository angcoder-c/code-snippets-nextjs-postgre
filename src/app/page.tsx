import Navbar from "@/components/navbar/navbar";
import { fetchSnippets } from "./lib/actions";

export default async function Home() {
  const snippets = await fetchSnippets()
  console.log(snippets)
  return (
    <>
      <Navbar/>
      <div className="gird gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {
          snippets.map(snippet => {
            return (
              <div className="flex flex-col bg-gray-600 rounded-xl" key={snippet.id}>
                <div className="flex">
                  <a href={`github.com/${snippet.by_user.name}`}>github:{snippet.by_user.name}</a>
                  <span>{snippet.created_at?.toISOString().split('T')[0].replace('-', '/')}</span>
                </div>
                <h2>{snippet.title}</h2>
                <div>
                  <span>Language: {snippet.language}={snippet.language_version}</span>
                  <span>Complexity: {snippet.complexity}</span>
                </div>
                <div>
                  {
                    snippet.keywords.map(keyword => <a href="#" key={keyword.id}>{keyword.name}</a>)
                  }
                </div>
                <div>
                  <p>{snippet.description}</p>
                </div>
                
              </div>
            )
          })
        }
      </div>
    </>
  );
}
