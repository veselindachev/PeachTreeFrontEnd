# 🍑 PeachTree Frontend v1.0.0

A React 19.1.1 + Vite + TypeScript frontend for PeachTree Bank.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment (create `.env`):

   ```
   VITE_API_BASE=/api
   VITE_PROXY_TARGET=http://localhost:4000
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## Dark Mode

- Light mode is **default** on first load.
- Toggle 🌞/🌙 from the header. Preference is saved in `localStorage`.

## Testing

Run unit tests (mocked API, no backend required):

```bash
npm run test
```

## Changelog

### v1.0.0 Release

- Integrated **MUI** (teal/orange theme) across the entire app
- Added **sticky AppBar** with 🍑 logo, "PeachTree Bank", username, **Logout**, and 🌞/🌙 toggle
- **AppBar** adapts colors to light/dark mode
- Created **flat minimal SVG peach logo** (`src/assets/logo.svg`)
- Polished **Login Page, Transfer Form, Transactions Table, Details Page** with MUI
- **Transfer Form** keeps values after submission
- Responsive UI: tables collapse into cards on mobile
- Desktop-only **hover effect** and **clickable rows/cards** navigate to details
- Added **toast notifications** for all API actions (logout = silent redirect)
- Implemented **Protected Routes** with spinner during auth check
- Added **TypeScript unit tests** with mocked API (`test/mocks/handlers.ts`)
- Cleaned up **old CSS/HTML** (only minimal `styles.css` remains)
- Updated **README** with banner, setup, dark mode, testing, and screenshot placeholders
