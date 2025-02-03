import React from 'react'
import blog from './blog.jpg'

function Blog({width='100px'}) {
  return (
    <div>
      <img 
      src={blog} 
      alt='blog' 
      style={{ width }}
      className={`rounded-lg shadow-lg border border-gray-300 transition-transform duration-300 hover:scale-105 ${width ? `w-[${width}]` : ''}`}/>
    </div>
  )
}

export default Blog