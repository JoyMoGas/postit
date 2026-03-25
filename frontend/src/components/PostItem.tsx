import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useState } from 'react'

export default function PostItem({ post, onUpdate, isReply = false, isDetail = false }: { post: any; onUpdate?: () => void; isReply?: boolean; isDetail?: boolean }) {
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)
  const navigate = useNavigate()

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const res = await api.post(`/posts/${post.id}/like/`)
      setLikesCount(res.data.count)
      if (onUpdate) onUpdate()
    } catch (err) {
      console.error(err)
    }
  }

  const navigateToDetail = () => {
    if (!isDetail) {
      navigate(`/post/${post.id}`)
    }
  }

  const containerStyle = isReply 
    ? "bg-[#FDFBFA] px-5 py-5 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
    : isDetail
      ? "bg-[#FDFBFA] px-5 py-6 sm:px-8 sm:rounded-t-2xl"
      : "bg-[#FDFBFA] px-5 py-5 sm:px-6 shadow-sm sm:rounded-2xl mb-5 hover:bg-[#FAF8F5] transition-colors cursor-pointer border border-[#E2D7C1]";

  return (
    <div className={containerStyle} onClick={navigateToDetail}>
      <div className="flex space-x-4">
        <div className="shrink-0">
          <div className="h-12 w-12 rounded-full bg-[#E2D7C1] flex items-center justify-center text-[#3A352F] font-bold text-lg uppercase shadow-inner border-2 border-[#FDFBFA]">
            {post.user ? post.user.charAt(0) : '?'}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <span className="font-bold text-[#3A352F] text-base">{post.user}</span>{' '}
              <span className="text-[#8A8172] font-normal">@{post.user}</span>
              <span className="text-[#E2D7C1] px-1.5">•</span>
              <span className="text-[#8A8172] hover:text-[#3A352F] hover:underline transition-colors">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </p>
          </div>
          
          <div className={`mt-2 text-[#3A352F] whitespace-pre-wrap [word-wrap:break-word] ${isDetail ? 'text-xl leading-relaxed font-medium' : 'text-base leading-snug font-normal'}`}>
            <p>{post.content}</p>
          </div>
          
          <div className="mt-4 flex items-center space-x-8">
            <button 
              onClick={(e) => { e.stopPropagation(); navigateToDetail(); }} 
              className="flex items-center text-sm text-[#8A8172] hover:text-[#D4A373] group transition-colors"
            >
              <div className="p-2 rounded-full group-hover:bg-[#F0E7D5] transition-colors -ml-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="font-medium group-hover:text-[#D4A373]">{post.replies_count || 0}</span>
            </button>
            
            <button 
              onClick={handleLike} 
              className="flex items-center text-sm text-[#8A8172] hover:text-[#D9534F] group transition-colors"
            >
              <div className="p-2 rounded-full group-hover:bg-[#F0E7D5] transition-colors -ml-2">
                <svg className={`h-5 w-5 ${likesCount > 0 ? 'text-[#D9534F]' : 'group-hover:text-[#D9534F]'}`} fill={likesCount > 0 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className={`font-medium ${likesCount > 0 ? 'text-[#D9534F]' : 'group-hover:text-[#D9534F]'}`}>{likesCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
