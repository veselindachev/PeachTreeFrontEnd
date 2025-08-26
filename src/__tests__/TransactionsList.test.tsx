
import { describe, it, expect, vi, afterEach } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import TransactionsList from '../pages/TransactionsList'
import { TxProvider } from '../state/TxContext'
import { AuthProvider } from '../state/AuthContext'
import { mockTransactions } from '../__mocks__/handlers'

describe('TransactionsList', () => {
  afterEach(() => vi.restoreAllMocks())
  it('renders headers', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockTransactions() as any)
    render(<AuthProvider><TxProvider><TransactionsList /></TxProvider></AuthProvider>)
    expect(await screen.findByText(/recent transactions/i)).toBeInTheDocument()
  })
})
