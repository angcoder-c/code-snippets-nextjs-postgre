import Navbar from "@/components/navbar/navbar";
import SnippetWrapper from "@/components/wrappers/snippetWrapper";
import { fetchSnippets } from "@/app/lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.comfig";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions)
  const snippets = await fetchSnippets(session?.user?.email)
  return (
    <>
      <Navbar />
      <SnippetWrapper
      snippets={snippets}/>
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