
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import AppShell from './shell/AppShell'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TransactionsList from './pages/TransactionsList'
import TransactionDetails from './pages/TransactionDetails'
import { AuthProvider } from './state/AuthContext'
import { TxProvider } from './state/TxContext'
import ProtectedRoute from './routing/ProtectedRoute'
import AppThemeProvider from './theme/ColorMode'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <AppShell><Dashboard /></AppShell>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <TransactionsList /> },
      { path: 'details/:id', element: <TransactionDetails /> }
    ]
  },
  { path: '*', element: <LoginPage /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthProvider>
        <TxProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </TxProvider>
      </AuthProvider>
    </AppThemeProvider>
  </React.StrictMode>
)
