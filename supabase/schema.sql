-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products table with luxury cosmetics specific fields
create table products (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text not null,
    price decimal(10,2) not null,
    category text not null,
    subcategory text,
    image_url text not null,
    benefits text[],
    ingredients text[],
    how_to_use text,
    size text,
    featured boolean default false,
    stock_quantity integer not null default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories table for organizing products
create table categories (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    description text,
    image_url text not null,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Users table (extends Supabase Auth users)
create table profiles (
    id uuid references auth.users on delete cascade primary key,
    email text not null,
    full_name text,
    phone text,
    shipping_address jsonb,
    billing_address jsonb,
    preferences jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cart items table
create table cart_items (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references profiles(id) on delete cascade not null,
    product_id uuid references products(id) on delete cascade not null,
    quantity integer not null check (quantity > 0),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, product_id)
);

-- Orders table
create table orders (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references profiles(id) on delete set null,
    status text not null check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount decimal(10,2) not null,
    shipping_address jsonb not null,
    billing_address jsonb not null,
    shipping_method text not null,
    tracking_number text,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items table
create table order_items (
    id uuid default uuid_generate_v4() primary key,
    order_id uuid references orders(id) on delete cascade not null,
    product_id uuid references products(id) on delete set null not null,
    quantity integer not null check (quantity > 0),
    price_at_time decimal(10,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reviews table
create table reviews (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references profiles(id) on delete set null,
    product_id uuid references products(id) on delete cascade not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    title text,
    content text,
    verified_purchase boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Wishlists table
create table wishlists (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references profiles(id) on delete cascade not null,
    product_id uuid references products(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, product_id)
);

-- Insert some initial categories
insert into categories (name, description, image_url, display_order) values
('Skincare', 'Luxurious skincare products for radiant, healthy skin', '/images/categories/skincare.jpg', 1),
('Makeup', 'Premium makeup collection for a flawless look', '/images/categories/makeup.jpg', 2),
('Body Care', 'Indulgent body care products for total relaxation', '/images/categories/body-care.jpg', 3),
('Fragrance', 'Exclusive fragrances for a lasting impression', '/images/categories/fragrance.jpg', 4);

-- Create indexes for better query performance
create index idx_products_category on products(category);
create index idx_cart_items_user_id on cart_items(user_id);
create index idx_orders_user_id on orders(user_id);
create index idx_reviews_product_id on reviews(product_id);

-- Create a function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updating updated_at
create trigger update_products_updated_at
    before update on products
    for each row
    execute function update_updated_at_column();

create trigger update_profiles_updated_at
    before update on profiles
    for each row
    execute function update_updated_at_column();

create trigger update_orders_updated_at
    before update on orders
    for each row
    execute function update_updated_at_column();

create trigger update_reviews_updated_at
    before update on reviews
    for each row
    execute function update_updated_at_column();

-- Add RLS (Row Level Security) policies
alter table profiles enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table reviews enable row level security;
alter table wishlists enable row level security;

-- Profiles: users can only read and update their own profiles
create policy "Users can view own profile"
    on profiles for select
    using (auth.uid() = id);

create policy "Users can update own profile"
    on profiles for update
    using (auth.uid() = id);

-- Cart: users can only access their own cart items
create policy "Users can manage own cart"
    on cart_items for all
    using (auth.uid() = user_id);

-- Orders: users can only view their own orders
create policy "Users can view own orders"
    on orders for select
    using (auth.uid() = user_id);

-- Reviews: users can manage their own reviews, but read all
create policy "Users can read all reviews"
    on reviews for select
    to authenticated
    using (true);

create policy "Users can manage own reviews"
    on reviews for all
    using (auth.uid() = user_id);

-- Wishlists: users can only manage their own wishlist
create policy "Users can manage own wishlist"
    on wishlists for all
    using (auth.uid() = user_id);
