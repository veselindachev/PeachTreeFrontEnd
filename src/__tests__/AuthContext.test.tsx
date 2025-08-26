
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../state/AuthContext'
import { mockLoginSuccess, mockLoginFailure } from '../__mocks__/handlers'

function Consumer(){
  const { login, isLoggedIn } = useAuth()
  React.useEffect(()=>{ (async ()=>{ await login('user','pass') })() },[])
  return <div data-testid="status">{String(isLoggedIn)}</div>
}

describe('AuthContext', () => {
  afterEach(() => vi.restoreAllMocks())
  it('logs in successfully', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockLoginSuccess() as any)
    render(<AuthProvider><Consumer /></AuthProvider>)
    await waitFor(()=> expect(screen.getByTestId('status').textContent).toBe('true'))
  })
  it('fails login', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockLoginFailure() as any)
    render(<AuthProvider><Consumer /></AuthProvider>)
    await waitFor(()=> expect(screen.getByTestId('status').textContent).toBe('false'))
  })
})
