# CLAUDE.md — Oyange Photography (Aquila)

Technical overview and development guide for the Oyange Photography website.

## 🏗️ Architecture
- **Frontend**: React 18 + Vite (TypeScript)
- **Styling**: Tailwind CSS + CSS Modules
- **Backend/Auth**: Supabase
- **Animations**: Framer Motion + Lenis (Smooth Scroll)
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod

## 🛠️ Build & Development
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Test**: `npm run test`

## 🎨 Design System
- **Colors**: 
  - Primary (Gold/Bronze): `hsl(36, 47%, 56%)`
  - Background (Dark Emerald/Charcoal): `hsl(154, 60%, 3%)`
- **Typography**:
  - Headings: `Playfair Display` (Serif, elegant, cinematic)
  - Body: `Inter` (Sans-serif, clean, readable)
- **Vibe**: High-end, cinematic, premium editorial.

## 📁 Project Structure
- `src/components/`: UI components (Hero, Portfolio, WhatsAppButton, MobileBookCTA, etc.)
- `src/pages/`: Main views (Index, AdminDashboard, AdminLogin, NotFound)
- `src/hooks/`: Custom React hooks (Auth, Portfolio CRUD, useImageUpload, useSiteContent)
- `src/integrations/`: Supabase client and types
- `supabase/`: Database migrations and Edge Functions
- `.agent/findings/`: Technical audit logs

## 📜 Development Guidelines
- Use **Tailwind** for layouts and common styles.
- Use **Framer Motion** for all entry animations (`ease: [0.16, 1, 0.3, 1]`).
- Ensure all images are wrapped in `ProgressiveImage` for lazy loading and placeholders.
- Maintain **Custom Cursor** support (check `body:not(.admin-page)`).
- Admin routes must be **Lazy Loaded** in `App.tsx`.
- **Security**: Forms include honeypot fields; edge functions require `ADMIN_SETUP_SECRET`.
- **Conversion**: Primary CTAs are the floating `WhatsAppButton` and mobile-sticky `MobileBookCTA`.

## 🚀 Deployment & SEO
- **Hosting**: Vercel.
- **Analytics**: GA4 integrated in `index.html`.
- **SEO**: `sitemap.xml` in `public/`, JSON-LD structured data in `index.html`.
- **Build**: Manual chunk splitting configured in `vite.config.ts` for `vendor`, `ui`, and `supabase`.
