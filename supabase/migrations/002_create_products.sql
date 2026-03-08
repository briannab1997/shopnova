create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  category text not null,
  image_url text,
  images text[] default '{}',
  rating numeric(3,2) default 0,
  review_count integer default 0,
  stock integer default 100,
  is_bestseller boolean default false,
  is_prime boolean default false,
  is_deal boolean default false,
  deal_end_at timestamptz,
  brand text,
  tags text[] default '{}',
  created_at timestamptz default now()
);

create index idx_products_category on public.products(category);
create index idx_products_is_deal on public.products(is_deal);
create index idx_products_name_search on public.products using gin(to_tsvector('english', name));
