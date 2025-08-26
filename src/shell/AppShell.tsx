
import React from 'react'
import { useAuth } from '../state/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AppShell({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const onLogout = () => { logout(); navigate('/') }

  return (
    <div className="app-shell">
      <header className="app-toolbar">
        <span className="brand">🍑 Peachtree Bank</span>
        <div style={{flex:1}} />
        {isLoggedIn && <button onClick={onLogout}>Logout</button>}
      </header>
      <main className="container">
        {children ?? <Outlet />}
      </main>
      {isLoggedIn && <div className="footer">Demo app — data is stored in memory.</div>}
    </div>
  )
}
