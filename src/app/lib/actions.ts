'use server'

import { SnippetType, ComplexitySupportDB2App, LanguagesSupport } from "@/types";
import prisma from "@/app/lib/prisma";

export async function fetchSnippets() {
  const snippets = ( await prisma.snippet.findMany({
    include: {
      user: true,
      dependencies: true,
      keywords: true,
      votes: true,
    }
  }))
  .map(snippet => {
    const upvotes = snippet.votes.filter(vote => vote.vote > 0).length
    const downvotes = snippet.votes.filter(vote => vote.vote < 0).length
    const newSnippet: SnippetType = {
        id: snippet.id,
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        created_at: snippet.createdAt,
        language: snippet.language as LanguagesSupport,
        language_version: snippet.languageVersion,
        complexity: ComplexitySupportDB2App[snippet.complexity],
        dependecies: snippet.dependencies,
        keywords: snippet.keywords,
        by_user: snippet.user,
        votes: snippet.votes,
        upvotes: upvotes,
        downvotes: downvotes,
        netvotes: upvotes - downvotes
    }
    return newSnippet
  })
  .sort((a, b) => b.netvotes - a.netvotes);

  return snippets;
}