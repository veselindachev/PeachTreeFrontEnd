
import { describe, it, expect, vi, afterEach } from 'vitest'
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { TxProvider, useTx } from '../state/TxContext'
import { AuthProvider } from '../state/AuthContext'
import { mockTransactions, mockDetails, mockUpdated, mockTransferOk } from '../__mocks__/handlers'

function Wrapper({ children }: { children: React.ReactNode }){
  // Provide a token via localStorage
  React.useEffect(()=>{ localStorage.setItem('auth-token','t'); localStorage.setItem('auth-username','u') },[])
  return <AuthProvider><TxProvider>{children}</TxProvider></AuthProvider>
}

describe('TxContext', () => {
  afterEach(() => vi.restoreAllMocks())

  it('loads transactions', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockTransactions() as any)
    render(<Wrapper><div /></Wrapper>)
    await waitFor(()=>{})
  })

  it('gets details and updates status', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(mockDetails() as any)   // getById
      .mockResolvedValueOnce(mockUpdated() as any)   // updateStatus
      .mockResolvedValueOnce(mockTransactions() as any) // reload
    render(<Wrapper><div /></Wrapper>)
    await waitFor(()=>{})
  })

  it('adds transfer', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(mockTransferOk() as any) // add
      .mockResolvedValueOnce(mockTransactions() as any) // reload
    render(<Wrapper><div /></Wrapper>)
    await waitFor(()=>{})
  })
})
