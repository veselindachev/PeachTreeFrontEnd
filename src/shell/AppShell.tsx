
import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Container } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import { ColorModeContext } from '../theme/ColorMode'
import logoUrl from '../assets/logo.svg'

export default function AppShell({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn, logout, username } = useAuth()
  const navigate = useNavigate()
  const { mode, toggleColorMode } = useContext(ColorModeContext)

  const onLogout = () => { logout(); navigate('/') }

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar position="sticky" color={mode === 'light' ? 'primary' : 'default'} enableColorOnDark>
        <Toolbar>
          <img src={logoUrl} alt="logo" height={28} style={{ marginRight: 8 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>PeachTree Bank</Typography>

          {isLoggedIn && (
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography variant="body2">{username}</Typography>
              <Button color="inherit" onClick={onLogout}>Logout</Button>
            </Box>
          )}

          <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle dark mode">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 2, flexGrow: 1 }}>
        {children ?? <Outlet />}
      </Container>
    </Box>
  )
}
