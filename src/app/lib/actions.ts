'use server'

import { SnippetType, ComplexitySupportDB2App, LanguagesSupport, UserType } from "@/types";
import prisma from "@/app/lib/prisma";

// ============================== Snippets ===========================
// get snippet form db
export async function fetchSnippets(email: string | undefined | null = '') {
  const user = await prisma.user.findUnique({
    where : {
      email : email || ''
    }
  })

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
        netvotes: upvotes - downvotes,
        alreadyVotes: snippet.votes.filter(vote => vote.userId===user?.id)
    }
    return newSnippet
  })
  .sort((a, b) => b.netvotes - a.netvotes);

  return snippets;
}


//======================== Users =======================
// check use exists
export async function checkUserExists(email:string | undefined | null) {
  const user = await prisma.user.findUnique({
    where: {
      email : email || undefined
    }
  })

  return user ? true : false
}

// create user
export async function createUser(user : UserType) {
  await prisma.user.create({
    data : {
      name: user.name,
      email: user.email,
      image: user.image
    }
  })
  console.log("User register: ", user.email)
}

// ================= Vote ==================
export async function createVote(snippetId: string, email: string, vote: 1 | -1){
  const user = await prisma.user.findUnique({
    where: { 
      email : email 
    }
  });

  if (!user?.id) return;

  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_snippetId: {
        userId: user.id,
        snippetId: snippetId
      }
    }
  });
  if (existingVote) {
    if (existingVote.vote === vote) return;

    // down to up OR up to down
    await prisma.vote.update({
      where: {
        userId_snippetId: {
          userId: user.id,
          snippetId: snippetId
        }
      },
      data: {
        vote: vote
      }
    });
  } else {
    await prisma.vote.create({
      data: {
        vote: vote,
        snippetId,
        userId: user.id
      }
    });

    console.log("Vote registered for snippet", snippetId);
  }
}

export async function deleteVote(id: string) {
  await prisma.vote.delete({
    where: { 
      id : id 
    }
  });
  console.log("Vote deleted");
}