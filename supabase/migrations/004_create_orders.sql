create type public.order_status as enum (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status public.order_status default 'pending',
  total_amount numeric(10,2) not null,
  shipping_name text,
  shipping_address text,
  shipping_city text,
  shipping_state text,
  shipping_zip text,
  shipping_country text default 'US',
  payment_method text default 'mock_card',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_orders_user_id on public.orders(user_id);
