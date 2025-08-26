
import React, { createContext, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../config'
import toast from 'react-hot-toast'

type AuthCtx = {
  isLoggedIn: boolean
  token: string | null
  username: string | null
  isReady: boolean
  login: (u: string, p: string) => Promise<boolean>
  logout: () => void
}
const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem('auth-token')
    const u = localStorage.getItem('auth-username')
    if (t) setToken(t)
    if (u) setUsername(u)
    setIsReady(true)
  }, [])

  const login = async (u: string, p: string) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
      })
      const data = await res.json()
      if (data?.success && data?.token) {
        setToken(data.token)
        setUsername(u)
        localStorage.setItem('auth-token', data.token)
        localStorage.setItem('auth-username', u)
        toast.success('Login successful')
        return true
      } else {
        toast.error('Invalid credentials')
        return false
      }
    } catch (e) {
      toast.error('Login request failed')
      return false
    }
  }

  const logout = () => {
    setToken(null); setUsername(null)
    localStorage.removeItem('auth-token'); localStorage.removeItem('auth-username')
  }

  return <Ctx.Provider value={{ isLoggedIn: !!token, token, username, isReady, login, logout }}>{children}</Ctx.Provider>
}

export const useAuth = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error('AuthProvider missing')
  return v
}
