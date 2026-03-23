import { useEffect, useState } from 'react'
import api from '../api/axios'
import PostItem from '../components/PostItem'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const [posts, setPosts] = useState([])
  const { user } = useAuth()

  const fetchProfilePosts = async () => {
    try {
      const res = await api.get('/posts/')
      
      setPosts(res.data.filter((p: any) => p.user_id === user?.id && !p.parent))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (user) fetchProfilePosts()
  }, [user])

  return (
    <div className="pb-12">
      <h1 className="text-3xl font-extrabold text-[#3A352F] mb-6 tracking-tight">Mis Posts</h1>
      <div className="space-y-5">
        {posts.map((post: any) => (
          <PostItem key={post.id} post={post} onUpdate={fetchProfilePosts} />
        ))}
        {posts.length === 0 && (
          <div className="text-center py-12 bg-[#FDFBFA] border border-[#E2D7C1] rounded-2xl">
            <p className="text-[#8A8172] text-lg font-medium">No has publicado nada aún.</p>
          </div>
        )}
      </div>
    </div>
  )
}
