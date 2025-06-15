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