import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ title, $id, featuredImage }) {
  
  // const = prop.post;

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg'>
        {/* Added hover effect: scale and shadow for better UI */}

        <div className='w-full justify-center mb-4'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title} 
            className='rounded-xl w-full h-48 object-cover'
          />
          {/* Set fixed height for consistency & object-cover for better image fit */}
        </div>

        <h2 className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300'>
          {title}
        </h2>
        {/* Added color transition on hover */}
      </div>
    </Link>
  )
}

export default PostCard
