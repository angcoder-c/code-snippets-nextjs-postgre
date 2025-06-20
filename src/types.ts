// Serach bar and filters

export type LanguagesSupport = 
    "No select"
    | "Python"
    | "JavaScript / TypeScript"
    | "C / C++"
    | "C#"
    | "Rust"
    | "Go"
    | "Lua"
    | "Java"
    | "Kotlin"
    | "Swift"
    | "Ruby"
    | "PHP"
    | "Shell / Bash"
    | "SQL"

export type ComplexitySupport =
    "No select"
    | "O(1)"
    | "O(log n)"
    | "O(n)"
    | "O(n log n)"
    | "O(n^2)"
    | "O(n^3)"
    | "O(2^n)"
    | "O(n!)"
    | "O(sqrt n)"
    | "O(k^n)"
    
export const ComplexitySupportDB = {
  "O(1)": "O_1",
  "O(log n)": 'O_LOG_N',
  "O(n)": 'O_N',
  "O(n log n)": 'O_N_LOG_N',
  "O(n^2)": 'O_N_SQUARED',
  "O(n^3)": 'O_N_CUBED',
  "O(2^n)": 'O_2_N',
  "O(n!)": 'O_N_FACTORIAL',
  "O(sqrt n)": 'O_SQRT_N',
  "O(k^n)": 'O_K_N'
}

export type SearchBarUpdate = {
  body: string
  language: LanguagesSupport
  dependency: string
  keyword: string
  date: Date
  complexity: ComplexitySupport
  filters : boolean
}

export type SearchBarType = {
  body: string
  language: LanguagesSupport
  dependency: string
  date: Date
  complexity: ComplexitySupport
  filters: boolean
  keyword: string
  update: (update: Partial<SearchBarUpdate>) => void
  toggleFilters : () => void
  reset: () => void
}

// database types

export type UserType = {
  id?: string
  name : string
  email : string
  image : string
}

export type SnippetType = {
  id?: string
  title: string
  description: string
  code: string
  created_at?: Date
  language: LanguagesSupport
  language_version: number
  complexity: ComplexitySupport
  dependecies: string[]
  keywords: string[]
  by_user: UserType
}