# Premium Car Rental Service

High-performance web application for luxury car rental. Built with Next.js 15, Tailwind CSS, Prisma, and Shadcn/UI.

## Features

- 🚗 **Premium Design**: Apple-style aesthetics, glassmorphism, smooth animations.
- ⚡ **High Performance**: Server Components, optimized images, Lenis scroll.
- 🛠 **Full Stack**: Next.js App Router, Server Actions, Prisma ORM.
- 📱 **Responsive**: Mobile-first design.
- 🔒 **Admin Panel**: Manage bookings and fleet (Basic Auth).
- 🤖 **Telegram Integration**: Instant notifications for new bookings.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS, Shadcn/UI
- **Animations**: Framer Motion, Lenis
- **Database**: SQLite (Dev) / PostgreSQL (Prod) via Prisma
- **Forms**: React Hook Form + Zod

## Getting Started

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Database**
   ```bash
   # Create .env file if not exists
   # DATABASE_URL="file:./dev.db" is default for SQLite

   # Run migrations
   npx prisma migrate dev --name init

   # Seed database with test cars
   npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts
   ```

4. **Configure Environment Variables**
   Create `.env` file:
   ```env
   DATABASE_URL="file:./dev.db"
   TELEGRAM_BOT_TOKEN="your_bot_token"
   TELEGRAM_CHAT_ID="your_chat_id"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Admin Panel

Access the admin panel at `/admin`.
**Default Credentials**:
- User: `admin` (or set via `ADMIN_USER` env var)
- Password: `secure_password_123` (or set via `ADMIN_PASSWORD` env var)

(Configured in `src/middleware.ts` and `src/lib/auth.ts`)

## Screenshots

### Home Page
![Home Page](public/screenshots/home.png)

### Admin Dashboard
![Admin Dashboard](public/screenshots/admin.png)

## Deployment

1. Push to GitHub.
2. Import project to Vercel.
3. Add Environment Variables in Vercel Settings.
   - For Database, use Vercel Postgres or Supabase/Neon connection string.
   - Update `DATABASE_URL` in Vercel.
4. Redeploy.

## License

MIT
