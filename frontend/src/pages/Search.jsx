import React, { useState } from 'react'

const exploreItems = [
  { id: 1, img: 'https://via.placeholder.com/300x300', isVideo: true },
  { id: 2, img: 'https://via.placeholder.com/300x300', isVideo: false },
  { id: 3, img: 'https://via.placeholder.com/300x300', isVideo: true },
  { id: 4, img: 'https://via.placeholder.com/300x300', isVideo: false },
  { id: 5, img: 'https://via.placeholder.com/300x300', isVideo: false },
  { id: 6, img: 'https://via.placeholder.com/300x300', isVideo: true },
  { id: 7, img: 'https://via.placeholder.com/300x300', isVideo: false },
  { id: 8, img: 'https://via.placeholder.com/300x300', isVideo: false },
  { id: 9, img: 'https://via.placeholder.com/300x300', isVideo: true },
  { id: 10, img: 'https://via.placeholder.com/300x300', isVideo: false },
  { id: 11, img: 'https://via.placeholder.com/300x300', isVideo: true },
  { id: 12, img: 'https://via.placeholder.com/300x300', isVideo: false },
];
function Search() {
    const [keyword,set_keyword]=useState('');
    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <input type='search' placeholder='search' onChange={((e)=>set_keyword(e.target.value))} class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            {/* Explore sections */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-4 rounded-md">
                {exploreItems.map((item) => (
                    <div key={item.id} className="relative bg-gray-200">
                        <img
                            src={item.img}
                            alt={`Explore ${item.id}`}
                            className="w-full h-full object-cover aspect-square rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Search;