-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- PROFILES
create policy "profiles: read own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: update own"
  on public.profiles for update
  using (auth.uid() = id);

-- PRODUCTS: public read-only
create policy "products: public read"
  on public.products for select
  to anon, authenticated
  using (true);

-- CART_ITEMS
create policy "cart: read own"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "cart: insert own"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "cart: update own"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "cart: delete own"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- ORDERS
create policy "orders: read own"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "orders: insert own"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- ORDER_ITEMS
create policy "order_items: read own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "order_items: insert for own orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );
