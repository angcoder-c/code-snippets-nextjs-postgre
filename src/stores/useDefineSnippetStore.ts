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

const initState: DefineSnippetType = {
    title: "",
    description: "",
    keywords_str: "",
    keywords: [],
    language: 'No select',
    language_version: "",
    dependencies:[],
    code: ""
}

type DefineSnippetStateType = {
    title: string,
    description: string,
    keywords_str: string
    keywords: string[],
    language: LanguagesSupport,
    language_version?: string
    dependencies: DefineSnippetDependencyType[]
    code: string,
    addDependency: (name:string, version:string | undefined)=>void,
    updateKeywords: (keywords_str: string) => void,
    addTitle: (title: string) => void,
    updateDescription: (description: string) => void,
    updateLanguageVersion: (version: string) => void,
    updateLanguage: (lang: LanguagesSupport) => void,
    updateCode: (code: string) => void
}

export const useDefineSnippetStore = create<DefineSnippetStateType>((set) => (
    {
        ...initState,
        addDependency: (name:string, version:string | undefined)=>set(
            (state) => ({ dependencies: [...state.dependencies, { name, version }]})
        ),
        updateKeywords: (keywords_str: string) => set(
            (state)=>({ 
                keywords_str: state.keywords_str+keywords_str,
                keywords: keywords_str.split(" ")
            })
        ),
        addTitle: (title: string) => set(
            (state) => ({ title: state.title + title })
        ),
        updateDescription: (description: string) => set(
            (state) => ({ description: state.description + description })
        ),
        updateLanguageVersion: (version: string) => set(
            (state)=>({ language_version: state.language_version+version })
        ),
        updateLanguage: (lang: LanguagesSupport) => set(
            () => ({ language: lang })
        ),
        updateCode: (code: string) => set(
            (state) => ({ code: state.code+code })
        )
    }
))