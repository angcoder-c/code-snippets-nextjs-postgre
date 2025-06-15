export function capitalize (str : string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const LanguagesSupportArray = ["No select", "Python" , "JavaScript / TypeScript" , "C / C++", "C#", "Rust", "Go", "Lua", "Java", "Kotlin", "Swift", "Ruby", "PHP", "Shell / Bash", "SQL" ]

export const ComplexitySupportArray = ["No select", "O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n^2)", "O(n^3)", "O(2^n)", "O(n!)", "O(sqrt n)", "O(k^n)"]