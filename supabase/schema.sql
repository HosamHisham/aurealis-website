-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.collections CASCADE;

-- Create collections table
CREATE TABLE collections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create products table
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create cart_items table
CREATE TABLE cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, product_id)
);

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Collections policies (anyone can read, only authenticated admins can modify)
CREATE POLICY "Collections are viewable by everyone" 
    ON collections FOR SELECT 
    USING (true);

CREATE POLICY "Collections are editable by authenticated users only" 
    ON collections FOR ALL 
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Products policies (anyone can read, only authenticated admins can modify)
CREATE POLICY "Products are viewable by everyone" 
    ON products FOR SELECT 
    USING (true);

CREATE POLICY "Products are editable by authenticated users only" 
    ON products FOR ALL 
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Cart items policies (users can only see and modify their own cart items)
CREATE POLICY "Users can view their own cart items" 
    ON cart_items FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" 
    ON cart_items FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" 
    ON cart_items FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" 
    ON cart_items FOR DELETE 
    USING (auth.uid() = user_id);

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Insert sample collections
INSERT INTO collections (name, description, image) VALUES
    ('Golden Essence', 'Our premium collection featuring gold-infused skincare products for ultimate luxury and radiance.', '/images/products/product-1.jpg'),
    ('Crystal Clear', 'Pure and gentle skincare solutions for sensitive skin types.', '/images/products/product-3.jpg');

-- Insert sample products
INSERT INTO products (name, description, price, image, collection_id) VALUES
    ('Golden Radiance Serum', 'Luxurious serum with 24K gold particles and vitamin C for a radiant, youthful complexion. This advanced formula combines the power of pure gold with potent antioxidants.', 220.00, '/images/products/product-1.jpg', (SELECT id FROM collections WHERE name = 'Golden Essence')),
    ('Royal Gold Cream', 'Rich cream with gold peptides and royal jelly for ultimate skin nourishment. This luxurious cream melts into your skin, delivering intense hydration and anti-aging benefits.', 280.00, '/images/products/product-2.jpg', (SELECT id FROM collections WHERE name = 'Golden Essence')),
    ('Crystal Calm Toner', 'Soothing toner with crystal extracts and aloe vera for balanced, refreshed skin. This gentle formula helps maintain skin''s natural pH while providing essential hydration.', 85.00, '/images/products/product-3.jpg', (SELECT id FROM collections WHERE name = 'Crystal Clear')),
    ('Pure Radiance Moisturizer', 'Lightweight moisturizer with crystal water and hyaluronic acid for deep hydration. Perfect for all skin types, this moisturizer provides lasting comfort without feeling heavy.', 120.00, '/images/products/product-4.jpg', (SELECT id FROM collections WHERE name = 'Crystal Clear'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS products_collection_id_idx ON products(collection_id);
CREATE INDEX IF NOT EXISTS cart_items_user_id_idx ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS cart_items_product_id_idx ON cart_items(product_id); 