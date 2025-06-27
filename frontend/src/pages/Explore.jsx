import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/custom/useFetch.hook';

function Explore() {
    const [keyword,set_keyword]=useState('');
    const { data:posts, FetchData } = useFetch(`http://localhost:5000/api/posts?category=${keyword}`);
    useEffect(() => {
        FetchData()
    }, [keyword]);
    console.log(posts)
    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <input type='search' placeholder='search' onChange={((e)=>set_keyword(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            {/* Explore sections */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-4 rounded-md">
                {posts && posts?.map((post) => (
                    <div key={post.id} className="relative bg-gray-200">
                        <img
                            src={post.media_url || 'https://i.pinimg.com/736x/8f/c6/3e/8fc63ecde415fc7e8119ee2b46c07be9.jpg'}
                            alt={`Explore ${post.id}`}
                            className="w-full h-full object-cover aspect-square rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Explore;