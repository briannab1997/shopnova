# Supabase Setup

Run these migration files in order via the Supabase SQL Editor.

| File | What it creates |
|------|----------------|
| `001_create_profiles.sql` | User profiles table + auto-create trigger |
| `002_create_products.sql` | Products table with indexes |
| `003_create_cart_items.sql` | Cart items table (per-user) |
| `004_create_orders.sql` | Orders table with status enum |
| `005_create_order_items.sql` | Order line items with computed subtotal |
| `006_rls_policies.sql` | Row Level Security policies for all tables |
| `007_seed_products.sql` | 25 realistic products across 6 categories |

**Run 006 before 007.** Products need RLS enabled before seeding.

## After running migrations

In Supabase dashboard → Authentication → URL Configuration:
- **Site URL:** your GitHub Pages URL (e.g. `https://briannab1997.github.io/shopnova/`)
- **Redirect URLs:** `https://briannab1997.github.io/shopnova/#/`
