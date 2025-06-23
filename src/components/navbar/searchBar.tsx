'use client'

import clsx from "clsx"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import SearchTextFilter from "@/components/navbar/searchTextFilter"
import SearchSelectFilter from "@/components/navbar/searchSelectFilter"
import useSearchState from "@/hooks/useSearchState"
import useSearchActions from "@/hooks/useSearchActions"

export default function SearchBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const { filters, date } = useSearchState()

  const {
    handleToggleFilters,
    handleChangeDate,
    handleChangeLanguage,
    handleChangeComplexity,
    update, // <- usar update global del store
  } = useSearchActions({ searchParams, pathname })

  // debounce
  const [filterState, setFilterState] = useState({
    body: searchParams.get('body') || '',
    dependency: searchParams.get('dependencies') || '',
    keyword: searchParams.get('keywords') || ''
  })

  // sync inputs
  useEffect(() => {
    setFilterState({
      body: searchParams.get('body') || '',
      dependency: searchParams.get('dependencies') || '',
      keyword: searchParams.get('keywords') || ''
    })
  }, [searchParams])

  const updateQueryParams = useDebouncedCallback((filters) => {
    const params = new URLSearchParams(searchParams.toString())
    filters.body ? params.set('body', filters.body) : params.delete('body')
    filters.dependency ? params.set('dependencies', filters.dependency) : params.delete('dependencies')
    filters.keyword ? params.set('keywords', filters.keyword) : params.delete('keywords')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, 500)

  const handleChange = (field: keyof typeof filterState) => (value: string) => {
    const newState = { ...filterState, [field]: value }
    setFilterState(newState)
    update({ [field]: value }) // actualiza Zustand
    updateQueryParams(newState) // actualiza query con debounce
  }

  return (
    <div className="text-white flex flex-col shadow-[inset_0px_-10px_20px_-10px_black] bg-gray-50 dark:bg-gray-900 rounded-xl">
      {/* Search bar */}
      <div className="flex gap-2 px-4 py-2 justify-between rounded-xl shadow shadow-black text-black dark:text-white">
        <input
          type="text"
          placeholder="Search"
          value={filterState.body}
          onChange={(e) => handleChange("body")(e.target.value)}
          className="w-full py-1 focus:outline-0"
        />
        <button onClick={handleToggleFilters}>
          <svg className="size-4 text-gray-600 dark:text-gray-400 ml-2 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg>
        </button>
        <button>
          <svg className="size-4 text-gray-600 dark:text-gray-400 ml-2 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </button>
      </div>

      {/* Filters */}
      <div className={clsx(
        'flex flex-col md:grid md:grid-cols-3',
        'transition-all duration-300 ease-in-out overflow-hidden',
        filters
          ? 'opacity-100 gap-2 py-5 px-2'
          : 'opacity-0 scale-0 h-0'
      )}>
        <SearchTextFilter
          ftype='date'
          value={date.toISOString().split("T")[0]}
          handleChange={handleChangeDate}
        />
        <SearchTextFilter
          ftype='dependency'
          value={filterState.dependency}
          handleChange={(e) => handleChange("dependency")(e.target.value)}
        />
        <SearchTextFilter
          ftype='keyword'
          value={filterState.keyword}
          handleChange={(e) => handleChange("keyword")(e.target.value)}
        />
        <SearchSelectFilter
          ftype="language"
          handleChange={handleChangeLanguage}
        />
        <SearchSelectFilter
          ftype="complexity"
          handleChange={handleChangeComplexity}
        />
      </div>
    </div>
  )
}
