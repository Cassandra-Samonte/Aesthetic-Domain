import { useState } from "react"

export default function SearchPage() {
    // Store search term and API data here
    const [query, setQuery] = useState('')

    

    return (
        <div className="search-page p-10">
            <form className="mt-4 text-center">
                <label htmlFor="search" className="block font-medium mb-1">
                    <h1 className="text-3xl font-bold">Search for Art</h1>
                </label>
                <br />
                <input
                    className="p-2 w-[60vw] rounded border border-gray-300 focus:outline-none focus:border-gray-500"
                    name="search"
                    placeholder="beautiful landscape..."
                    value={query}
                    onChange={}
                />
                <button
                    type="submit"
                    className="mx-1 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 bg-gray-700 rounded transition-all duration-200"
                >
                    Search
                </button>
            </form>
        </div>
    )
}