# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites

- GitHub account
- Vercel account (free tier available)

### Steps

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/smart-fashion.git
git push -u origin main
```

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "New Project"

4. Import your GitHub repository

5. Configure project:

   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Add Environment Variables:

```
NEXT_PUBLIC_SPREE_API_URL=https://your-backend-url.com
```

7. Click "Deploy"

Your frontend will be live at: `https://your-project.vercel.app`

## Backend Deployment (Render)

### Prerequisites

- Render account (free tier available)
- GitHub repository

### Steps

1. Go to [Render](https://render.com) and sign in

2. Click "New +" → "Web Service"

3. Connect your GitHub repository

4. Configure service:

   - Name: `smart-fashion-backend`
   - Environment: `Ruby`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Build Command: `bundle install && rails db:migrate`
   - Start Command: `rails s -p $PORT -e production`

5. Add PostgreSQL Database:

   - Click "New +" → "PostgreSQL"
   - Name: `smart-fashion-db`
   - Plan: Free

6. Link database to web service

7. Add Environment Variables:

```
RAILS_ENV=production
SECRET_KEY_BASE=<generate with: rails secret>
DATABASE_URL=<auto-filled by Render>
ALLOWED_ORIGINS=https://your-frontend.vercel.app
RAILS_SERVE_STATIC_FILES=true
RAILS_LOG_TO_STDOUT=true
```

8. Click "Create Web Service"

9. After deployment, run seed command:
   - Go to Shell tab
   - Run: `rails db:seed`

Your backend will be live at: `https://smart-fashion-backend.onrender.com`

## Backend Deployment (Fly.io)

### Prerequisites

- Fly.io account
- flyctl CLI installed

### Steps

1. Install flyctl:

```bash
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

2. Login:

```bash
fly auth login
```

3. Navigate to backend:

```bash
cd backend
```

4. Create fly.toml:

```toml
app = "smart-fashion-backend"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"
  RAILS_ENV = "production"
  RAILS_SERVE_STATIC_FILES = "true"
  RAILS_LOG_TO_STDOUT = "true"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

5. Launch app:

```bash
fly launch
```

6. Create PostgreSQL database:

```bash
fly postgres create
fly postgres attach <postgres-app-name>
```

7. Set secrets:

```bash
fly secrets set SECRET_KEY_BASE=$(rails secret)
fly secrets set ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

8. Deploy:

```bash
fly deploy
```

9. Run migrations:

```bash
fly ssh console
rails db:migrate
rails db:seed
exit
```

Your backend will be live at: `https://smart-fashion-backend.fly.dev`

## Post-Deployment

### Update Frontend Environment

Update your Vercel environment variable:

```
NEXT_PUBLIC_SPREE_API_URL=https://your-backend-url.com
```

Redeploy frontend for changes to take effect.

### SSL/HTTPS

Both Vercel and Render/Fly.io provide automatic SSL certificates. Your sites will be served over HTTPS by default.

### Custom Domain (Optional)

#### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

#### Render

1. Go to Settings → Custom Domains
2. Add your custom domain
3. Update DNS records as instructed

## Monitoring

### Vercel Analytics

- Enable in Project Settings → Analytics
- Free tier includes basic metrics

### Render Metrics

- Available in dashboard
- Shows CPU, memory, and request metrics

### Error Tracking

Consider adding:

- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user analytics

## Performance Optimization

### Frontend

- Enable Vercel Analytics
- Use Vercel Image Optimization
- Enable Edge Functions if needed

### Backend

- Add Redis for caching
- Use CDN for static assets
- Enable database connection pooling

## Backup Strategy

### Database Backups

- Render: Automatic daily backups on paid plans
- Fly.io: Manual backups with `fly postgres backup`

### Code Backups

- GitHub serves as primary backup
- Tag releases: `git tag v1.0.0 && git push --tags`

## Scaling

### Horizontal Scaling

- Vercel: Automatic
- Render: Upgrade to paid plan
- Fly.io: `fly scale count 2`

### Vertical Scaling

- Render: Change instance type in settings
- Fly.io: `fly scale vm shared-cpu-2x`

## Troubleshooting

### Build Failures

- Check build logs in deployment platform
- Verify all dependencies are in package.json/Gemfile
- Ensure environment variables are set

### Runtime Errors

- Check application logs
- Verify database connection
- Check CORS configuration

### Performance Issues

- Enable caching
- Optimize database queries
- Use CDN for static assets
- Consider upgrading instance size
