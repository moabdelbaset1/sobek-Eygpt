-- Fix RLS Policies for Admin Operations
-- Execute this SQL in your Supabase SQL Editor

-- ============================================
-- OPTION 1: Allow all operations (For Development/Testing)
-- ============================================
-- This is the simplest solution for now, allows anyone to perform all operations
-- You should replace this with proper authentication later

-- Drop existing restrictive policies (if any)
DROP POLICY IF EXISTS "Public read access for human products" ON human_products;
DROP POLICY IF EXISTS "Public read access for veterinary products" ON veterinary_products;
DROP POLICY IF EXISTS "Public read access for categories" ON categories;

-- Create permissive policies for human_products
CREATE POLICY "Allow all operations on human products" ON human_products
    FOR ALL USING (true) WITH CHECK (true);

-- Create permissive policies for veterinary_products
CREATE POLICY "Allow all operations on veterinary products" ON veterinary_products
    FOR ALL USING (true) WITH CHECK (true);

-- Create permissive policies for categories
CREATE POLICY "Allow all operations on categories" ON categories
    FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- IMPORTANT NOTES:
-- ============================================
-- 1. These policies allow anyone to perform any operation on the tables
-- 2. This is OK for development/testing but NOT secure for production
-- 3. For production, you should:
--    - Set up Supabase Authentication
--    - Create an admin role/table
--    - Create policies that check for authenticated admin users
-- 
-- Example of secure policy (for later):
-- CREATE POLICY "Admin can manage human products" ON human_products
--     FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));
-- ============================================
