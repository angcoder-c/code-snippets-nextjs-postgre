/* 
import { LanguagesSupport } from "@/types";
import { create } from "zustand";

type DefineSnippetDependencyType = {
    name: string,
    version?: string
}

type DefineSnippetType = {
    title: string
    description: string
    keywords_str: string
    keywords: string[]
    language: LanguagesSupport
    language_version: string
    dependencies: DefineSnippetDependencyType[]
    code: string
}

type DefineSnippetStateType = {
    title: string,
    description: string,
    keywords_str: string
    keywords: string[],
    language: LanguagesSupport,
    language_version: string
    dependencies: DefineSnippetDependencyType[]
    code: string,
    addDependency: (name:string, version:string | undefined)=>void,
    updateKeywords: (keywords_str: string) => void
}

*/