create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text,
  unit_price numeric(10,2) not null,
  quantity integer not null check (quantity > 0),
  subtotal numeric(10,2) generated always as (unit_price * quantity) stored
);

create index idx_order_items_order_id on public.order_items(order_id);
