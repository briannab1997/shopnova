# ShopNova

A full-stack Amazon-inspired storefront built as a portfolio project. Demonstrates proficiency across the full stack — React 18, TypeScript, Vite, React Native, and GitHub Pages deployment.

## Live Demo
**Web:** https://briannab1997.github.io/shopnova/

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Web Frontend | React 18 + TypeScript + Vite |
| Routing | React Router v6 (HashRouter for static hosting) |
| Data / Auth | Mock data layer + localStorage (no backend required) |
| Mobile | React Native + Expo (iOS & Android) |
| Styling | Plain CSS + CSS Custom Properties |
| Deployment | GitHub Pages + GitHub Actions |

## Features

### Web App
- **Homepage** — Hero carousel with auto-advance, Today's Deals section, product rows by category, scroll-triggered fade-in animations
- **Products Page** — Category filter tabs, price/rating sort, responsive grid layout
- **Product Detail** — Image gallery, star ratings, add to cart, Buy Now, deal countdown timer
- **Shopping Cart** — Quantity controls, subtotal, free shipping threshold indicator
- **Checkout** — 3-step flow (shipping → payment → review), order confirmation with delivery estimate
- **Account** — Order history with status badges, editable profile
- **Search** — Client-side full-text product search
- **Auth** — Sign up / sign in via localStorage (no backend required); cart and orders persist per user

### Mobile App (React Native + Expo)
- Bottom tab navigation: Home, Products, Cart, Account
- Full product browsing with search and category filters
- Add to cart with badge counter
- 3-step checkout flow
- Account screen with order history

## Project Structure

```
shopnova/
├── web/                    # React + Vite web app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level page components
│   │   ├── context/        # AuthContext, CartContext
│   │   ├── hooks/          # useProducts, useScrollProgress
│   │   ├── lib/            # mockData, mockDb, helpers
│   │   ├── types/          # TypeScript interfaces
│   │   └── styles/         # CSS design system
├── mobile/                 # React Native + Expo app
├── supabase/
│   └── migrations/         # SQL migration files (schema reference)
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 20+
- Expo CLI (`npm install -g expo-cli`) for mobile only

### Run the web app
```bash
git clone https://github.com/briannab1997/shopnova.git
cd shopnova/web
npm install
npm run dev
# Open http://localhost:5173/shopnova/
```

No environment variables or backend setup needed — the app runs entirely on mock data and localStorage.

### Run the mobile app
```bash
cd mobile
npm install
npx expo start
# Scan the QR code with Expo Go on your phone
```

## Key Technical Decisions

**HashRouter over BrowserRouter** — GitHub Pages serves static files with no server-side routing. HashRouter (`/#/path`) makes all routes work without a server.

**Mock data layer** — Products are hardcoded in `lib/mockData.ts`. Auth, orders, and profiles are persisted to localStorage via `lib/mockDb.ts`. This makes the app fully functional with zero backend dependencies.

**Scroll animations without a library** — `IntersectionObserver` handles all fade-in animations. No dependencies, performant, works in all modern browsers.

**CSS Custom Properties** — All design tokens (colors, spacing, typography, shadows) live in `variables.css`. No CSS framework needed.

---

*Portfolio project by Brianna Brockington — built to demonstrate full-stack development skills across web and mobile platforms.*
