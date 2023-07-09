'use client'

import React, { useState } from 'react'

const Search = () => {

    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        alert(`Query: ${query}`);
        setQuery("");
    }

    return (
        <div className='flex items-center bg-gray-300 text-black w-[30rem] mx-auto my-8 p-2 gap-x-1.5'>
            <label htmlFor="new-title" className='shrink-0 font-semibold'>Search:</label>
            <input type="text" name='new-title' id='new-title' className='w-full ml-1 px-1'
                value={ query }
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className='rounded-full bg-slate-800 py-1 px-2 text-xs font-medium text-white hover:bg-slate-600' onClick={()=>{ handleSearch() }}>Search</button>
        </div>
    )
}

export default Search