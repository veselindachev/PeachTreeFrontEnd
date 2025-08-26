
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import { Box, Paper, TextField, Typography, Button, Stack } from '@mui/material'

export default function LoginPage() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const ok = await login(username, password)
    setLoading(false)
    if (ok) nav('/dashboard')
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" p={2}>
      <Paper sx={{ p: 3, width: 380, maxWidth: '95%' }} elevation={3}>
        <Typography variant="h6" mb={2}>Sign in</Typography>
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="Username" value={username} onChange={e=>setUsername(e.target.value)} fullWidth />
            <TextField type="password" label="Password" value={password} onChange={e=>setPassword(e.target.value)} fullWidth />
            <Button type="submit" variant="contained" disabled={!username || !password || loading}>
              {loading ? 'Signing in...' : 'Login'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}
