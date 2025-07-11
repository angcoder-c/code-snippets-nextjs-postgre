import { useDefineSnippetStore } from "@/stores/useDefineSnippetStore";

export default function useDefineSnippetState () {
    const title = useDefineSnippetStore(state => state.title)
    const description = useDefineSnippetStore(state => state.description)
    const keywords = useDefineSnippetStore(state => state.keywords)
    const language = useDefineSnippetStore(state=>state.language)
    const language_version = useDefineSnippetStore(state=>state.language_version)
    const dependencies = useDefineSnippetStore(state=>state.dependencies)
    const code = useDefineSnippetStore(state => state.code)

    const addTitle = useDefineSnippetStore(state => state.addTitle)
    const addDependency = useDefineSnippetStore(state => state.addDependency)
    const updateKeywords = useDefineSnippetStore(state => state.updateKeywords)
    const updateDescription = useDefineSnippetStore(state => state.updateDescription)
    const updateLanguage = useDefineSnippetStore(state => state.updateLanguage)
    const updateLanguageVersion = useDefineSnippetStore(state => state.updateLanguageVersion)
    const updateCode = useDefineSnippetStore(state=>state.code)

    return {
        title, 
        description,
        keywords,
        language,
        language_version,
        code,
        dependencies,
        addDependency,
        addTitle,
        updateKeywords,
        updateDescription,
        updateLanguage,
        updateLanguageVersion,
        updateCode
    }
}