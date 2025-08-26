
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import { Box, CircularProgress } from '@mui/material'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isReady } = useAuth()
  if (!isReady) {
    return (
      <Box minHeight="50vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }
  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />
}
