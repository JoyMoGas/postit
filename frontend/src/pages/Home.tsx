import { useEffect, useState } from 'react'
import api from '../api/axios'
import PostItem from '../components/PostItem'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts/')
      setPosts(res.data.filter((p: any) => !p.parent))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    try {
      await api.post('/posts/', { content })
      setContent('')
      fetchPosts()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="pb-12">
      <h1 className="text-3xl font-extrabold text-[#3A352F] mb-6 tracking-tight">Inicio</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-[#FDFBFA] p-5 shadow-sm border border-[#E2D7C1] rounded-2xl transition-shadow hover:shadow-md">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="block w-full rounded-xl border-[#E2D7C1] bg-white shadow-inner focus:border-[#D4A373] focus:ring-[#D4A373] focus:ring-2 outline-none transition-all sm:text-base p-4 border resize-none placeholder:text-[#A8A196] text-[#3A352F]"
          placeholder="¿Qué estás pensando?"
        />
        <div className="mt-4 flex justify-end">
          <button type="submit" className="bg-[#3A352F] px-6 py-2.5 text-sm font-bold text-[#F0E7D5] rounded-full shadow-sm hover:bg-[#2A251F] transition-all transform hover:scale-105 active:scale-95">
            Publicar
          </button>
        </div>
      </form>
      <div className="space-y-5">
        {posts.map((post: any) => (
          <PostItem key={post.id} post={post} onUpdate={fetchPosts} />
        ))}
        {posts.length === 0 && (
          <div className="text-center py-12 bg-[#FDFBFA] border border-[#E2D7C1] rounded-2xl">
            <p className="text-[#8A8172] text-lg font-medium">No hay posts aún. ¡Escribe algo interesante!</p>
          </div>
        )}
      </div>
    </div>
  )
}
