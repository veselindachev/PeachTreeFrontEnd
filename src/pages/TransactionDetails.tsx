
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTx } from '../state/TxContext'

export default function TransactionDetails() {
  const { id } = useParams()
  const { getById, updateStatus } = useTx()
  const [tx, setTx] = useState<any | null>(null)

  useEffect(() => {
    let mounted = true
    if (id) getById(id).then(d => { if (mounted) setTx(d) })
    return () => { mounted = false }
  }, [id])

  if (!tx) return <p>Loading...</p>

  const onChange = async (val: string) => {
    const stateid = Number(val)
    await updateStatus(id!, stateid)
    setTx({ ...tx, stateid })
  }

  const formatCurrency = (n: string) => Number(n).toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

  return (
    <div>
      <h3 style={{margin:'0 0 12px'}}>Details for transaction #{id}</h3>
      <div className="detail-grid">
        <div>Amount</div><div>{formatCurrency(tx.amount)}</div>
        <div>Date</div><div>{new Date(tx.dateoftransfer).toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' })}</div>
        <div>Receiver</div><div>{tx.receivername}</div>
        <div>State</div><div><span className="status-pill">{tx.state ?? stateLabel(tx.stateid)}</span></div>
      </div>
      <div className="actions">
        <label>Change transaction state</label>
        <select value={tx.stateid} onChange={e=>onChange(e.target.value)}>
          <option value={1}>send transaction</option>
          <option value={2}>received</option>
          <option value={3}>payed</option>
        </select>
        <Link to="/dashboard">Back to list</Link>
      </div>
    </div>
  )
}

function stateLabel(id: number){
  if (id === 1) return 'send transaction'
  if (id === 2) return 'received'
  if (id === 3) return 'payed'
  return String(id)
}
