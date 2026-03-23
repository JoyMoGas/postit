import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/auth')
  }

  return (
    <nav className="bg-[#FDFBFA] border-b border-[#E2D7C1] mb-6 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-bold text-[#3A352F] border-b-2 border-transparent hover:border-[#D4A373] transition-colors">
              Inicio
            </Link>
            <Link to="/profile" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#8A8172] border-b-2 border-transparent hover:text-[#3A352F] hover:border-[#D4A373] transition-colors">
              Mi Perfil
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-[#8A8172] bg-[#E2D7C1] bg-opacity-30 px-3 py-1 rounded-full">@{user?.username}</span>
            <button onClick={handleLogout} className="text-sm font-bold text-[#D9534F] hover:text-[#C9302C] transition-colors bg-red-50 hover:bg-red-100 px-4 py-1.5 rounded-full border border-red-100">
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
