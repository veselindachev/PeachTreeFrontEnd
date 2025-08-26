
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTx, Tx } from '../state/TxContext'

type SortKey = 'dateoftransfer' | 'receivername' | 'amount'

export default function TransactionsList() {
  const { list, reload } = useTx()
  const nav = useNavigate()
  const [term, setTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('dateoftransfer')
  const [sortDir, setSortDir] = useState<'ASC' | 'DESC'>('DESC')

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
    <div>
      <div className="header-row">
        <h3 style={{margin:0}}>Recent Transactions</h3>
        <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
          <input className="search" placeholder="Search by typing..." value={term} onChange={e=>setTerm(e.target.value)} />
          <span>Sort by</span>
          <select value={sortKey} onChange={e=>setSortKey(e.target.value as SortKey)}>
            <option value="dateoftransfer">Date</option>
            <option value="receivername">Beneficiary</option>
            <option value="amount">Amount</option>
          </select>
          <select value={sortDir} onChange={e=>setSortDir(e.target.value as 'ASC' | 'DESC')}>
            <option value="DESC">DESC</option>
            <option value="ASC">ASC</option>
          </select>
        </div>
      </div>
      <div className="transactions-table">
        {filtered.map(t => (
          <div key={t.id} className="row" onClick={()=>open(t)}>
            <div>{new Date(t.dateoftransfer).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            <div>
              <div style={{fontWeight:600}}>{t.receivername}</div>
              <div style={{fontSize:12,color:'#666'}}>Payment type #{t.paymenttypeid}</div>
            </div>
            <div style={{textAlign:'right'}}>{formatCurrency(t.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
