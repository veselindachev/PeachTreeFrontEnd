
import React, { createContext, useMemo, useState, useEffect } from 'react'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { teal, orange } from '@mui/material/colors'

type Mode = 'light' | 'dark'
export const ColorModeContext = createContext<{mode: Mode, toggleColorMode: () => void}>({ mode: 'light', toggleColorMode: () => {} })

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('light')

  useEffect(() => {
    const saved = localStorage.getItem('color-mode') as Mode | null
    if (saved === 'light' || saved === 'dark') setMode(saved)
  }, [])

  const toggleColorMode = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('color-mode', next)
      return next
    })
  }

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#009688' }, // teal
      secondary: { main: '#ff9800' }, // orange
    },
    shape: { borderRadius: 12 },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            // color handled by palette mode
          }
        }
      }
    }
  }), [mode])

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
