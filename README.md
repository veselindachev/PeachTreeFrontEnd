# Peachtree Bank — React 19.1.1 (API version)

A responsive React 19.1.1 + Vite + TypeScript app using API endpoints for auth and transactions.

## Configure
Create a `.env` at project root (or use `.env.example`):
```
# Frontend calls this base (avoids CORS during dev)
VITE_API_BASE=/api
# Vite proxies /api/* to your backend here:
VITE_PROXY_TARGET=http://localhost:4000
```

## Run
```
npm install
npm run dev
```
Open the printed URL.

## Notes on CORS
Using the Vite proxy means the browser only talks to the Vite dev server (same origin),
so you won't hit CORS during development.

If you call the backend directly (e.g., VITE_API_BASE=http://localhost:4000), then your backend
must enable CORS and handle OPTIONS preflight.

## API Endpoints (expected shapes)
- POST `${VITE_API_BASE}/login` → `{ success: boolean, token: string }`
- GET  `${VITE_API_BASE}/transactions?orderBy=dateoftransfer&orderDirection=DESC` (Bearer token) → `{ ok: true, transactions: Tx[] }`
- GET  `${VITE_API_BASE}/details/:id` (Bearer token) → `{ ok: true, details: {...} }`
- PATCH `${VITE_API_BASE}/updatedetails/:id` (Bearer token, JSON body) → `{ ok: true, updated: {...} }`
