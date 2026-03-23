import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import PostItem from '../components/PostItem'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<any>(null)
  const [replies, setReplies] = useState([])
  const [content, setContent] = useState('')

  const fetchPostAndReplies = async () => {
    try {
      const postRes = await api.get(`/posts/${id}/`)
      setPost(postRes.data)
      const repliesRes = await api.get(`/posts/${id}/replies/`)
      setReplies(repliesRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPostAndReplies()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    try {
      await api.post('/posts/', { content, parent: id })
      setContent('')
      fetchPostAndReplies()
    } catch (err) {
      console.error(err)
    }
  }

  if (!post) return <div className="text-center py-12">Cargando hilo...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#FDFBFA] shadow-sm rounded-t-2xl mb-0 relative z-10 border-t border-l border-r border-[#E2D7C1]">
        <PostItem post={post} onUpdate={fetchPostAndReplies} isDetail={true} />
      </div>

      <div className="bg-[#FAF8F5] p-5 border-l border-r border-b border-[#E2D7C1] rounded-b-2xl mb-8 shadow-sm flex space-x-4">
        <div className="shrink-0 mt-1">
          <div className="h-10 w-10 rounded-full bg-[#E2D7C1] flex items-center text-sm justify-center text-[#3A352F] font-bold uppercase shadow-inner">
            ?
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={2}
              className="block w-full outline-none bg-transparent resize-none border-0 py-2 text-[#3A352F] placeholder:text-[#A8A196] sm:text-base sm:leading-6 focus:ring-0"
              placeholder="Postea tu respuesta..."
            />
            <div className="mt-3 flex justify-end border-t border-[#E2D7C1] pt-3">
              <button type="submit" className="bg-[#3A352F] px-5 py-2 text-sm font-bold text-[#F0E7D5] rounded-full shadow-sm hover:bg-[#2A251F] disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95">
                Responder
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-[#FDFBFA] shadow-sm rounded-2xl overflow-hidden border border-[#E2D7C1] mb-12">
        {replies.length > 0 ? (
          <div className="divide-y divide-[#E2D7C1]">
            {replies.map((reply: any) => (
              <PostItem key={reply.id} post={reply} onUpdate={fetchPostAndReplies} isReply={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-[#8A8172] text-base italic font-medium">
            Nadie ha respondido a esto aún. ¡Aprovecha!
          </div>
        )}
      </div>
    </div>
  )
}
