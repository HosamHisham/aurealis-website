-- Check if tables exist and their structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
    AND table_name IN ('products', 'categories', 'profiles', 'cart_items', 'orders', 'order_items', 'reviews', 'wishlists')
ORDER BY 
    table_name,
    ordinal_position;
