# Smart Fashion Backend (Spree Commerce)

This is the backend API for Smart Fashion e-commerce platform, built with Spree Commerce.

## Prerequisites

- Ruby 3.2+
- PostgreSQL 14+
- Redis (for Sidekiq)

## Setup

1. Install dependencies:

```bash
bundle install
```

2. Setup database:

```bash
rails db:create
rails db:migrate
rails db:seed
```

3. Create admin user:

```bash
rails runner "Spree::User.create!(email: 'admin@example.com', password: 'password123', password_confirmation: 'password123')"
```

4. Start the server:

```bash
rails s -p 3001
```

## API Endpoints

The Spree Storefront API v2 is available at:

- Base URL: `http://localhost:3001/api/v2/storefront`

### Key Endpoints:

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /cart` - Create cart
- `POST /cart/add_item` - Add item to cart
- `GET /taxons` - Get categories

## Admin Panel

Access the admin panel at: `http://localhost:3001/admin`

Default credentials:

- Email: admin@example.com
- Password: password123

## Environment Variables

Create a `.env` file:

```
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=
DATABASE_HOST=localhost
ALLOWED_ORIGINS=http://localhost:3000
USE_S3=false
```

## Deployment

### Render.com

1. Create new Web Service
2. Connect your repository
3. Set build command: `bundle install && rails db:migrate`
4. Set start command: `rails s -p $PORT`
5. Add PostgreSQL database
6. Set environment variables

### Fly.io

1. Install flyctl
2. Run `fly launch`
3. Deploy with `fly deploy`

## Testing

```bash
bundle exec rspec
```
