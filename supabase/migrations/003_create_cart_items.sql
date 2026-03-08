create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity integer not null default 1 check (quantity > 0),
  added_at timestamptz default now(),
  unique(user_id, product_id)
);

create index idx_cart_items_user_id on public.cart_items(user_id);
