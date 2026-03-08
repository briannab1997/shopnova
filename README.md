# ShopNova

A full-stack Amazon-inspired ecommerce application built as a portfolio project. Demonstrates proficiency across the full stack — React 18, TypeScript, Supabase, React Native, and GitHub Pages deployment.

## Live Demo
**Web:** https://briannab1997.github.io/shopnova/

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Web Frontend | React 18 + TypeScript + Vite |
| Routing | React Router v6 (HashRouter for static hosting) |
| Mobile | React Native + Expo (iOS & Android) |
| Backend | Supabase (PostgreSQL + Auth + Row Level Security) |
| Styling | Plain CSS + CSS Custom Properties |
| Deployment | GitHub Pages + GitHub Actions |

## Features

### Web App
- **Homepage** — Hero image carousel with auto-advance, Today's Deals with countdown timers, product sections by category, scroll-triggered fade-in animations
- **Products Page** — Category filter tabs, price/rating sort, responsive grid layout
- **Product Detail** — Image gallery, star ratings, add-to-cart, Buy Now, deal countdown
- **Shopping Cart** — Quantity controls, subtotal, free shipping threshold indicator
- **Checkout** — 3-step flow (shipping → payment → review), mock payment, order confirmation
- **Account** — Order history with status badges, profile editing
- **Search** — Full-text product search via Postgres `ilike`
- **Auth** — Sign up / sign in with Supabase Auth (email + password)
- **Guest Cart** — Cart persists in localStorage without sign-in; merges to Supabase on login

### Mobile App (React Native + Expo)
- Bottom tab navigation: Home, Products, Cart, Account
- Full product browsing and search
- Add to cart with badge counter
- Checkout flow
- Supabase Auth with SecureStore

## Project Structure

```
shopnova/
├── web/                    # React + Vite web app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level page components
│   │   ├── context/        # AuthContext, CartContext
│   │   ├── hooks/          # useProducts, useCart, useIntersectionObserver
│   │   ├── lib/            # Supabase client, helper functions
│   │   ├── types/          # TypeScript interfaces
│   │   └── styles/         # CSS design system
│   └── .github/workflows/  # GitHub Actions CI/CD
├── mobile/                 # React Native + Expo app
├── supabase/
│   └── migrations/         # All SQL migration files (run in order)
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier works)
- Expo CLI (`npm install -g expo-cli`) for mobile

### 1. Clone the repo
```bash
git clone https://github.com/briannab1997/shopnova.git
cd shopnova
```

### 2. Set up Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Open the SQL Editor in the Supabase dashboard
3. Run each migration file from `supabase/migrations/` in order (001 → 007)
4. Migration 007 seeds 25 products — run it last

### 3. Run the web app
```bash
cd web
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from Supabase dashboard
npm install
npm run dev
# Open http://localhost:5173/shopnova/
```

### 4. Run the mobile app
```bash
cd mobile
cp .env.example .env
# Fill in EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
npm install
npx expo start
# Scan the QR code with Expo Go on your phone
```

## Deployment

### Web (GitHub Pages)
1. Push the repository to GitHub as `shopnova`
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to GitHub repo Secrets
3. The GitHub Actions workflow (`web/.github/workflows/deploy.yml`) auto-deploys on push to `main`

Or deploy manually:
```bash
cd web && npm run deploy
```

### Supabase Auth + GitHub Pages
In your Supabase project settings → Authentication → URL Configuration:
- Site URL: `https://briannab1997.github.io/shopnova/`
- Redirect URLs: `https://briannab1997.github.io/shopnova/#/`

## Database Schema

| Table | Description |
|-------|------------|
| `profiles` | User profile info, auto-created on signup via trigger |
| `products` | 25 seeded products across 6 categories |
| `cart_items` | Persistent cart for authenticated users |
| `orders` | Order records with shipping details |
| `order_items` | Snapshot of product name/price at time of purchase |

Row Level Security is enabled on all tables. Users can only access their own cart, orders, and profile data. Products are publicly readable.

## Key Technical Decisions

**HashRouter over BrowserRouter** — GitHub Pages serves static files with no server-side routing. HashRouter (`/#/path`) makes all routes work without server configuration.

**Dual-mode cart** — Guest users get a localStorage cart. Authenticated users get a Supabase-persisted cart. On sign-in, the guest cart merges into the database via upsert.

**Scroll animations without a library** — `IntersectionObserver` API handles all fade-in animations. Zero dependencies, performant, and works in all modern browsers.

**CSS Custom Properties** — All design tokens (colors, spacing, typography, shadows) live in `variables.css`. No CSS framework needed.

---

*Portfolio project by Brianna Brockington — built to demonstrate full-stack development skills across web and mobile platforms.*
