# Smart Fashion E-Commerce Platform

A modern, fully-featured e-commerce platform with AR try-on, voice search, and smart recommendations.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Spree Commerce (Headless)
- **Database**: PostgreSQL
- **AR**: model-viewer + WebXR API
- **Voice**: Web Speech API
- **Hosting**: Vercel (frontend) + Render/Fly.io (backend)

## 📁 Project Structure

```
/
├── frontend/          # Next.js application
├── backend/           # Spree Commerce setup
├── docs/              # Documentation
└── README.md
```

## 🎯 Features

- ✅ Browse & filter products (shirts, jeans, goggles, etc.)
- ✅ AR Try-On using model-viewer
- ✅ Voice Search with Web Speech API
- ✅ Smart product recommendations
- ✅ Add to Cart & Checkout via Spree API
- ✅ Dark/Light mode toggle
- ✅ Fully responsive design
- ✅ Optimized performance (lazy loading, code splitting)

## 🛠️ Setup Instructions

### Backend (Spree Commerce)

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s -p 3001
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:3000

## 🌐 Environment Variables

Create `.env.local` in frontend:

```
NEXT_PUBLIC_SPREE_API_URL=http://localhost:3001
NEXT_PUBLIC_SPREE_STOREFRONT_TOKEN=your_token_here
```

## 📦 Deployment

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render or Fly.io

## 📄 License

MIT License - Free and Open Source
