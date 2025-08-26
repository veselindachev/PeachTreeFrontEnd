
export const mockLoginSuccess = () => ({
  ok: true,
  json: async () => ({ success: true, token: 'mock-token' }),
})
export const mockLoginFailure = () => ({
  ok: true,
  json: async () => ({ success: false }),
})
export const mockTransactions = () => ({
  ok: true,
  json: async () => ({
    ok: true,
    transactions: [
      { id: '1', dateoftransfer: '2025-08-25T00:00:00.000Z', receivername: 'Amazon', receiverimage: null, paymenttypeid: 1, amount: '55.23', stateid: 1 },
      { id: '2', dateoftransfer: '2025-08-20T00:00:00.000Z', receivername: 'Texaco', receiverimage: null, paymenttypeid: 2, amount: '82.34', stateid: 3 }
    ]
  }),
})
export const mockDetails = () => ({
  ok: true,
  json: async () => ({
    ok: true,
    details: {
      amount: '82.34',
      dateoftransfer: '2024-11-09T22:00:00.000Z',
      receivername: 'Texaco',
      state: 'payed',
      stateid: 3
    }
  }),
})
export const mockUpdated = () => ({
  ok: true,
  json: async () => ({ ok: true, updated: { id: '1', stateid: 2 } }),
})
export const mockTransferOk = () => ({
  ok: true,
  json: async () => ({
    ok: true,
    transfer: {
      dateoftransfer: '2025-08-25T21:00:00.000Z',
      sendername: 'Veselin 1',
      receivername: 'Amazon Store',
      paymenttypeid: 1,
      amount: '55.23',
      stateid: 1
    }
  }),
})
