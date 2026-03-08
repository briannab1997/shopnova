-- Profiles table extends auth.users
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  zip text,
  country text default 'US',
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile row on new signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
