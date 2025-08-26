
import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import TransferForm from '../pages/TransferForm'
import { TxProvider } from '../state/TxContext'
import { AuthProvider } from '../state/AuthContext'

describe('TransferForm', () => {
  it('renders inputs and dropdown', () => {
    render(<AuthProvider><TxProvider><TransferForm /></TxProvider></AuthProvider>)
    expect(screen.getByLabelText(/sender/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/receiver/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/payment type/i)).toBeInTheDocument()
  })
})
