
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTx, Tx } from '../state/TxContext'
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TextField, Stack, Card, CardContent, Typography, useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

type SortKey = 'dateoftransfer' | 'receivername' | 'amount'

export default function TransactionsList() {
  const { list, reload } = useTx()
  const nav = useNavigate()
  const [term, setTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('dateoftransfer')
  const [sortDir, setSortDir] = useState<'ASC' | 'DESC'>('DESC')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    reload(sortKey, sortDir)
  }, [sortKey, sortDir])

  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase()
    if (!t) return list
    return list.filter(x =>
      x.receivername.toLowerCase().includes(t) ||
      String(x.amount).includes(t) ||
      new Date(x.dateoftransfer).toLocaleDateString().toLowerCase().includes(t)
    )
  }, [list, term])

  const open = (t: Tx) => nav(`/dashboard/details/${t.id}`)

  const formatCurrency = (n: string) => Number(n).toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between" mb={2}>
        <TextField placeholder="Search…" value={term} onChange={e=>setTerm(e.target.value)} sx={{ maxWidth: 360 }} fullWidth />
        <Box>
          <TextField
            select
            label="Sort by"
            SelectProps={{ native: true }}
            value={sortKey}
            onChange={e=>setSortKey(e.target.value as SortKey)}
            sx={{ mr: 1, minWidth: 160 }}
          >
            <option value="dateoftransfer">Date</option>
            <option value="receivername">Beneficiary</option>
            <option value="amount">Amount</option>
          </TextField>
          <TextField
            select
            label="Direction"
            SelectProps={{ native: true }}
            value={sortDir}
            onChange={e=>setSortDir(e.target.value as 'ASC' | 'DESC')}
            sx={{ minWidth: 140 }}
          >
            <option value="DESC">DESC</option>
            <option value="ASC">ASC</option>
          </TextField>
        </Box>
      </Stack>

      {isMobile ? (
        <Stack spacing={1.5}>
          {filtered.map(t => (
            <Card key={t.id} onClick={()=>open(t)} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>{t.receivername}</Typography>
                <Typography variant="body2" color="text.secondary">{new Date(t.dateoftransfer).toLocaleDateString()}</Typography>
                <Typography variant="subtitle2" mt={0.5}>{formatCurrency(t.amount)}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={sortKey==='dateoftransfer' ? (sortDir==='ASC'?'asc':'desc') : false}>
                  <TableSortLabel
                    active={sortKey==='dateoftransfer'}
                    direction={sortDir==='ASC'?'asc':'desc'}
                    onClick={()=>setSortKey('dateoftransfer')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={sortKey==='receivername' ? (sortDir==='ASC'?'asc':'desc') : false}>
                  <TableSortLabel
                    active={sortKey==='receivername'}
                    direction={sortDir==='ASC'?'asc':'desc'}
                    onClick={()=>setSortKey('receivername')}
                  >
                    Beneficiary
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sortDirection={sortKey==='amount' ? (sortDir==='ASC'?'asc':'desc') : false}>
                  <TableSortLabel
                    active={sortKey==='amount'}
                    direction={sortDir==='ASC'?'asc':'desc'}
                    onClick={()=>setSortKey('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(t => (
                <TableRow hover key={t.id} onClick={()=>open(t)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{new Date(t.dateoftransfer).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>{t.receivername}</Typography>
                    <Typography variant="caption" color="text.secondary">Payment type #{t.paymenttypeid}</Typography>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(t.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
