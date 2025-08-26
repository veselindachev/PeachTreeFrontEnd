
import React, { createContext, useContext, useState } from 'react'
import { API_BASE } from '../config'

type AuthCtx = {
  isLoggedIn: boolean
  token: string | null
  login: (u: string, p: string) => Promise<boolean>
  logout: () => void
}
const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (data?.success && data?.token) {
      setToken(data.token)
      return true
    }
    return false
  }
  const logout = () => setToken(null)

  return <Ctx.Provider value={{ isLoggedIn: !!token, token, login, logout }}>{children}</Ctx.Provider>
}
export const useAuth = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error('AuthProvider missing')
  return v
}
