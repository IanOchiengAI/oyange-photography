-- Add indexes to optimize sorting by sort_order
CREATE INDEX IF NOT EXISTS idx_testimonials_sort_order ON public.testimonials(sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_sort_order ON public.portfolio_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_featured_projects_sort_order ON public.featured_projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON public.services(sort_order);
CREATE INDEX IF NOT EXISTS idx_packages_sort_order ON public.packages(sort_order);

-- Add indexes to optimize sorting by created_at
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
