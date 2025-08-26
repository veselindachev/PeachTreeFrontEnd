
import React, { useState } from 'react'
import { useTx } from '../state/TxContext'
import { TextField, Stack, Button } from '@mui/material'
import toast from 'react-hot-toast'

export default function TransferForm() {
  const { add } = useTx()
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = Math.abs(parseFloat(amount || '0'))
    try {
      await add({
        sendername: sender || 'Unknown',
        receivername: receiver || 'Unknown',
        amount: amt,
        paymenttypeid: 1, // fixed default
        stateid: 1,
      })
      toast.success('Transfer created!')
      // Keep values after submission (do not reset)
    } catch {
      toast.error('Failed to create transfer')
    }
  }

  return (
    <form onSubmit={submit}>
      <Stack spacing={2}>
        <TextField label="FROM ACCOUNT" placeholder="Name" value={sender} onChange={e=>setSender(e.target.value)} />
        <TextField label="TO ACCOUNT" placeholder="Name" value={receiver} onChange={e=>setReceiver(e.target.value)} />
        <TextField label="AMOUNT" type="number" inputProps={{ step: '0.01' }} placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)} />
        <Button type="submit" variant="contained" disabled={!sender || !receiver || !amount}>Submit</Button>
      </Stack>
    </form>
  )
}
