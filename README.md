# Oyange Photography

Premium photography portfolio website for Oyange Photography, a highly-rated photography studio based in Nairobi, Kenya. The site showcases weddings, portraits, commercial, and fashion photography, and allows clients to seamlessly review packages and book sessions.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)

## Setup and Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment variables**:
   Create a `.env` file in the root directory based on`.env.example` and add your Supabase credentials.

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Key Features

- **Dynamic Content**: Uses Supabase for portfolio items, services, testimonials, packages, and blog posts.
- **Premium Aesthetics**: Glassmorphism, smooth scroll (Lenis), custom cursors, and gold/dark theme accents.
- **Interactive Portfolio**: Filterable gallery with an integrated image lightbox.
- **Booking Flow**: Contact form integrated with Supabase edge functions.

## Building for Production

To create a production build:
```bash
npm run build
```

You can preview the built app with:
```bash
npm run preview
```
