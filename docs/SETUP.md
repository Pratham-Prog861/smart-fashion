# Smart Fashion - Complete Setup Guide

## Quick Start

### Backend Setup (Spree Commerce)

1. Navigate to backend directory:

```bash
cd backend
```

2. Install Ruby dependencies:

```bash
bundle install
```

3. Setup PostgreSQL database:

```bash
# Create database
rails db:create

# Run migrations
rails db:migrate

# Seed sample data
rails db:seed
```

4. Create admin user:

```bash
rails runner "Spree::User.create!(email: 'admin@example.com', password: 'password123', password_confirmation: 'password123')"
```

5. Start backend server:

```bash
rails s -p 3001
```

Backend will be available at: http://localhost:3001

### Frontend Setup (Next.js)

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Update `.env.local`:

```
NEXT_PUBLIC_SPREE_API_URL=http://localhost:3001
```

5. Start development server:

```bash
npm run dev
```

Frontend will be available at: http://localhost:3000

## Features Overview

### 1. AR Try-On

- Uses model-viewer library
- WebXR API support
- Place 3D models in your space
- Works on AR-capable devices

### 2. Voice Search

- Web Speech API integration
- Natural language search
- Click the microphone button (bottom-right)
- Speak your search query

### 3. Smart Recommendations

- Rule-based recommendation engine
- Based on category, price, and preferences
- Complementary product suggestions
- "You may also like" section

### 4. Dark/Light Mode

- Toggle in navbar
- Persists in localStorage
- Smooth transitions
- System preference detection

### 5. Shopping Cart

- Zustand state management
- Persistent cart (localStorage)
- Real-time updates
- Quantity management

## Project Structure

```
/
├── frontend/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── products/          # Products pages
│   │   └── cart/              # Cart page
│   ├── components/            # React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ARViewer.tsx
│   │   └── VoiceSearch.tsx
│   ├── store/                 # Zustand stores
│   │   └── cartStore.ts
│   ├── utils/                 # Utilities
│   │   ├── spreeApi.ts       # Spree API client
│   │   └── recommendations.ts # AI logic
│   ├── hooks/                 # Custom hooks
│   └── types/                 # TypeScript types
│
├── backend/
│   ├── config/                # Rails configuration
│   │   ├── initializers/
│   │   │   ├── spree.rb      # Spree config
│   │   │   └── cors.rb       # CORS config
│   │   └── database.yml      # Database config
│   ├── db/
│   │   └── seeds.rb          # Sample data
│   └── Gemfile               # Ruby dependencies
│
└── docs/
    └── SETUP.md              # This file
```

## API Integration

### Connecting Frontend to Backend

The frontend uses `@spree/storefront-api-v2-sdk` to communicate with Spree:

```typescript
// utils/spreeApi.ts
import { makeClient } from "@spree/storefront-api-v2-sdk";

const client = makeClient({
  host: process.env.NEXT_PUBLIC_SPREE_API_URL,
});
```

### Available API Methods

```typescript
// Get products
const products = await getProducts({ page: 1, perPage: 12 });

// Get single product
const product = await getProduct("product-id");

// Search products
const results = await searchProducts("shirt");

// Create order
const orderToken = await createOrder([{ variant_id: "1", quantity: 2 }]);
```

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_SPREE_API_URL=https://your-backend.com`
4. Deploy

### Backend (Render)

1. Create new Web Service
2. Connect repository
3. Set build command: `bundle install && rails db:migrate`
4. Set start command: `rails s -p $PORT`
5. Add PostgreSQL database
6. Set environment variables
7. Deploy

### Backend (Fly.io)

1. Install flyctl: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Launch: `fly launch`
4. Deploy: `fly deploy`

## Performance Optimization

### Frontend

- Image optimization with Next.js Image
- Lazy loading for 3D models
- Code splitting
- Route prefetching
- Tailwind CSS purging

### Backend

- Database indexing
- Query optimization
- Caching with Redis
- CDN for static assets

## Testing

### Frontend

```bash
cd frontend
npm run lint
npm run type-check
```

### Backend

```bash
cd backend
bundle exec rspec
```

## Troubleshooting

### CORS Issues

- Check `backend/config/initializers/cors.rb`
- Ensure `ALLOWED_ORIGINS` includes your frontend URL

### Database Connection

- Verify PostgreSQL is running
- Check credentials in `backend/config/database.yml`

### AR Not Working

- Ensure HTTPS in production (required for WebXR)
- Check device AR compatibility
- Verify 3D model format (.glb)

### Voice Search Not Working

- Only works in Chrome/Edge
- Requires microphone permissions
- Must be on HTTPS in production

## Next Steps

1. Add real 3D models (replace placeholder URLs)
2. Implement payment gateway (Stripe/PayPal)
3. Add user authentication
4. Implement order tracking
5. Add product reviews
6. Set up email notifications
7. Add analytics (Google Analytics)
8. Implement SEO optimization

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Spree Commerce Guides](https://guides.spreecommerce.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [model-viewer](https://modelviewer.dev/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
