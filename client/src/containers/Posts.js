import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../components/Post'

export default function Posts() {
  const [ posts, setPosts ] = useState([])
  const fetchPosts = async () => {
    try {
      const postsResponse = await axios.get('http://localhost:5000/api/posts')
      console.log(postsResponse.data)
      return setPosts(postsResponse.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} title={post.title} contents={post.contents} />
      ))}
    </div>
  )
}
