import React, { useState } from 'react'
import { useTx } from '../state/TxContext'

export default function TransferForm() {
  const { add } = useTx()
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = Math.abs(parseFloat(amount || '0'))
    await add({
      sendername: sender || 'Unknown',
      receivername: receiver || 'Unknown',
      amount: amt,
      paymenttypeid: 1,
      stateid: 1, // 1 = send transaction
    })
    setSender('')
    setReceiver('')
    setAmount('')
    alert('Transfer created!')
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Sender</label>
        <input placeholder="Your name" value={sender} onChange={e=>setSender(e.target.value)} />
      </div>
      <div style={{height:10}} />
      <div>
        <label>Receiver</label>
        <input placeholder="Amazon Store" value={receiver} onChange={e=>setReceiver(e.target.value)} />
      </div>
      <div style={{height:10}} />
      <div>
        <label>Amount</label>
        <input type="number" step="0.01" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)} />
      </div>
      <div style={{height:16}} />
      <button disabled={!sender || !receiver || !amount}>Submit</button>
    </form>
  )
}
