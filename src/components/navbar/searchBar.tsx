'use client'

import clsx from "clsx"
import useSearchActions from "@/hooks/useSearchActions"
import useSearchState from "@/hooks/useSearchState"
import SearchTextFilter from "@/components/navbar/searchTextFilter"
import SearchSelectFilter from "@/components/navbar/searchSelectFilter"

export default function SearchBar () {
    const { body, filters } = useSearchState()
    const { handleChangeBody, handleToggleFilters } = useSearchActions()

    return (
        <div className="flex flex-col">
            {/* body search bar */}
            <div className="flex gap-2 bg-gray-400 px-4 py-2 rounded-xl justify-between">    
                <input 
                type="text" 
                placeholder="Search" 
                value={body} 
                onChange={handleChangeBody}
                className="w-[100%]"
                />
                <button onClick={handleToggleFilters}>
                    <svg className="size-4 text-blue-950 ml-2 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg>
                </button>
                <button>
                    <svg className="size-4 text-blue-950 ml-2 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                </button>
            </div>

            {/* filters */}

            <div className={ clsx(
                'bg-amber-700',
                filters ? 'block' : 'hidden'
            )}>
                <SearchTextFilter ftype='date'/>
                <SearchTextFilter ftype='dependency'/>
                <SearchTextFilter ftype='keyword' />
                <SearchSelectFilter ftype="language" />
                <SearchSelectFilter ftype="complexity" />
            </div>
        </div>
    )
}