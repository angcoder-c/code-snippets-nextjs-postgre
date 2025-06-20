'use server'

import prisma from "./prisma";

export async function fetchSnippets() {
    const snippets = await prisma.snippet.findMany()
    return snippets
}