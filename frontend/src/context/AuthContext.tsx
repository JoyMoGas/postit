import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../api/axios'

interface User { id: number; username: string; }
interface AuthContextType {
    user: User | null
    login: (credentials: object) => Promise<void>
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    
    const checkAuth = async () => {
        try {
            const res = await api.get('/me/')
            setUser(res.data)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { checkAuth() }, [])

    const login = async (credentials: object) => {
        await api.post('/login/', credentials)
        await checkAuth()
    }

    const logout = async () => {
        await api.post('/logout/')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)