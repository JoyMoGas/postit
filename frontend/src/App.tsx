import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AuthPage } from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostDetail from './pages/PostDetail'
import Navbar from './components/Navbar'

const PrivateRoute = () => {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>
  return user ? (
    <div className="min-h-screen bg-[#F0E7D5] text-[#3A352F] font-sans selection:bg-[#3A352F] selection:text-[#F0E7D5]">
      <Navbar />
      <main className="max-w-3xl mx-auto p-4 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  ) : <Navigate to="/auth" />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
