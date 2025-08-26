
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../shell/AppShell'
import { useAuth } from '../state/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const ok = await login(username, password)
      if (ok) nav('/dashboard')
      else setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'70vh'}}>
        <form onSubmit={submit} className="card" style={{width:380, maxWidth:'95%'}}>
          <h2 className="side-title">Sign in</h2>
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
          <div style={{height:10}} />
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div style={{height:10}} />
          {error && <div style={{color:'#b71c1c', fontSize:13}}>{error}</div>}
          <div style={{height:16}} />
          <button disabled={!username || !password || loading}>{loading ? 'Signing in...' : 'Login'}</button>
        </form>
      </div>
    </AppShell>
  )
}
