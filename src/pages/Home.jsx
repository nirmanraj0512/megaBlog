import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
    // Yaha par posts ko define nnhi kiye the
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap justify-center'>
                        <div className='p-2 w-full'>
                            <h1 className='text-4xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300'>
                                Login to Read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8 bg-cream-100'>
            <Container>
                <div className='flex flex-wrap justify-center'>
                    {/* Posts now have a subtle cream background with shadow */}
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4 w-1/4'>
                            {/* Post Cards with cream background and soft shadow */}
                            <PostCard {...post} className='bg-cream-200 shadow-md rounded-lg hover:shadow-lg transition-all duration-300' />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
