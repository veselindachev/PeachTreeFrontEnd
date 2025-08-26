
import React from 'react'
import { Outlet } from 'react-router-dom'
import TransferForm from './TransferForm'

export default function Dashboard() {
  return (
    <div className="grid">
      <div className="card">
        <h3 className="side-title">Make a Transfer</h3>
        <TransferForm />
      </div>
      <div className="card">
        <Outlet />
      </div>
    </div>
  )
}
