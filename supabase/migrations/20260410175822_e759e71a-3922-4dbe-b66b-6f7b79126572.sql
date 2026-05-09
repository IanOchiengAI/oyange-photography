
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_title TEXT,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials are publicly readable"
ON public.testimonials FOR SELECT USING (true);

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.testimonials (client_name, client_title, quote, sort_order) VALUES
('Sarah & James', 'Wedding Clients', 'Absolutely breathtaking work. Every photo tells the story of our special day perfectly.', 1),
('Elena Rodriguez', 'Fashion Designer', 'The editorial shots exceeded all expectations. True artistry behind the lens.', 2),
('Marcus Chen', 'CEO, Luxe Brands', 'Professional, creative, and incredibly easy to work with. Our brand imagery has never looked better.', 3),
('Amara Johnson', 'Portrait Client', 'They captured my personality in ways I never thought possible. Every frame feels authentic.', 4),
('David & Priya', 'Engagement Session', 'From start to finish, the experience was magical. We treasure every single photo.', 5);
