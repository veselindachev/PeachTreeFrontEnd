
import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useTx } from '../state/TxContext'
import { Card, CardContent, Grid2 as Grid, Typography, Stack, TextField, MenuItem, Button } from '@mui/material'
import toast from 'react-hot-toast'

export default function TransactionDetails() {
  const { id } = useParams()
  const { getById, updateStatus } = useTx()
  const [tx, setTx] = useState<any | null>(null)

  useEffect(() => {
    let mounted = true
    if (id) getById(id).then(d => { if (mounted) setTx(d) })
    return () => { mounted = false }
  }, [id])

  if (!tx) return <Typography>Loading...</Typography>

  const onChange = async (val: string) => {
    const stateid = Number(val)
    // optimistic local update
    setTx({ ...tx, stateid, state: stateLabel(stateid) })
    try {
      await updateStatus(id!, stateid)
      toast.success('Status updated')
    } catch {
      toast.error('Failed to update status')
    }
  }

  const formatCurrency = (n: string) => Number(n).toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Details for transaction #{id}</Typography>
        <Grid container spacing={1}>
          <Grid size={4}><Typography color="text.secondary">Amount</Typography></Grid>
          <Grid size={8}><Typography>{formatCurrency(tx.amount)}</Typography></Grid>
          <Grid size={4}><Typography color="text.secondary">Date</Typography></Grid>
          <Grid size={8}><Typography>{new Date(tx.dateoftransfer).toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' })}</Typography></Grid>
          <Grid size={4}><Typography color="text.secondary">Receiver</Typography></Grid>
          <Grid size={8}><Typography>{tx.receivername}</Typography></Grid>
          <Grid size={4}><Typography color="text.secondary">State</Typography></Grid>
          <Grid size={8}><Typography>{tx.state ? tx.state : stateLabel(tx.stateid)}</Typography></Grid>
        </Grid>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mt={2}>
          <TextField
            select
            label="Change transaction state"
            value={tx.stateid}
            onChange={(e)=>onChange(e.target.value)}
            sx={{ minWidth: 240 }}
          >
            <MenuItem value={1}>send transaction</MenuItem>
            <MenuItem value={2}>received</MenuItem>
            <MenuItem value={3}>payed</MenuItem>
          </TextField>
          <Button component={RouterLink} to="/dashboard">Back to list</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

function stateLabel(id: number){
  if (id === 1) return 'send transaction'
  if (id === 2) return 'received'
  if (id === 3) return 'payed'
  return String(id)
}
