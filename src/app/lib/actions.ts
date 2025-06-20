'use server'

import prisma from "./prisma";
import { SnippetType } from "@/types";

export async function fetchSnippets() {
    const snippets = await prisma.snippet.findMany()
    //const snippets = await prisma.
    return snippets
}