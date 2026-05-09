-- Fix RLS Policy Overlap for blog_posts (BE-003)

-- Drop existing policies that might overlap
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can read all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;

-- 1. Public read policy
-- Allows anyone to view blog posts that are marked as published
CREATE POLICY "Public can view published blog posts" ON public.blog_posts
  FOR SELECT USING (published = true);

-- 2. Admin full CRUD policy
-- Allows users with the admin role to create, read, update, and delete any blog post
CREATE POLICY "Admins have full access to blog posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
