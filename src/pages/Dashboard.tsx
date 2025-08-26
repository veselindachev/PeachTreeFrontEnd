
import React from 'react'
import { Outlet } from 'react-router-dom'
import TransferForm from './TransferForm'
import { Grid2 as Grid, Card, CardContent, Typography } from '@mui/material'

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Make a Transfer</Typography>
            <TransferForm />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card>
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
