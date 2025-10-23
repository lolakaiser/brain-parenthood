# Deployment Guide

This guide covers deploying both the Next.js frontend and FastAPI backend to various platforms.

## Quick Start - Recommended Setup

**Frontend**: Vercel (easiest for Next.js)
**Backend**: Railway or Render (easiest for FastAPI)
**Database**: Neon or Supabase (managed PostgreSQL)

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)

### Steps

1. **Push your code to Git**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Connect to Vercel**:
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your repository
- Vercel will auto-detect Next.js

3. **Configure Environment Variables**:
- Add `NEXT_PUBLIC_API_URL` with your backend URL
- Example: `https://your-backend.railway.app`

4. **Deploy**:
- Click "Deploy"
- Vercel will build and deploy automatically
- You'll get a URL like `https://your-app.vercel.app`

5. **Custom Domain** (Optional):
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

### Frontend - Alternative Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### AWS Amplify
- Connect your Git repository
- Build settings are auto-detected
- Add environment variables

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Create account** at [railway.app](https://railway.app)

2. **New Project**:
- Click "New Project"
- Choose "Deploy from GitHub repo"
- Select your repository

3. **Add PostgreSQL**:
- Click "New" → "Database" → "PostgreSQL"
- Railway will provide a `DATABASE_URL`

4. **Configure Environment Variables**:
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
SECRET_KEY=your-secret-key-here
ENVIRONMENT=production
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

5. **Create `Procfile`** in backend directory:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

6. **Create `railway.json`**:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

7. **Deploy**: Railway automatically deploys on push

### Option 2: Render

1. **Create account** at [render.com](https://render.com)

2. **New Web Service**:
- Connect your repository
- Choose the backend directory
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Add PostgreSQL**:
- Create new PostgreSQL database
- Copy the Internal Database URL

4. **Environment Variables**:
```
DATABASE_URL=your-postgres-url
SECRET_KEY=random-secret-key
PYTHON_VERSION=3.11
```

5. **Deploy**: Click "Create Web Service"

### Option 3: Heroku

1. **Install Heroku CLI**:
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login**:
```bash
heroku login
```

3. **Create app**:
```bash
cd backend
heroku create your-app-name
```

4. **Add PostgreSQL**:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

5. **Create `Procfile`**:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

6. **Create `runtime.txt`**:
```
python-3.11.0
```

7. **Deploy**:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

8. **Set environment variables**:
```bash
heroku config:set SECRET_KEY=your-secret-key
heroku config:set ENVIRONMENT=production
```

### Option 4: AWS (Advanced)

#### Using Elastic Beanstalk

1. **Install EB CLI**:
```bash
pip install awsebcli
```

2. **Initialize**:
```bash
cd backend
eb init -p python-3.11 brain-parenthood-api
```

3. **Create environment**:
```bash
eb create brain-parenthood-env
```

4. **Deploy**:
```bash
eb deploy
```

#### Using ECS (Docker)

1. **Create `Dockerfile`** in backend:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. **Build and push to ECR**:
```bash
docker build -t brain-parenthood-api .
docker tag brain-parenthood-api:latest YOUR_ECR_URI
docker push YOUR_ECR_URI
```

3. **Create ECS task and service** via AWS Console

### Option 5: Google Cloud Run

1. **Create `Dockerfile`**:
```dockerfile
FROM python:3.11-slim

ENV PORT 8080
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD exec uvicorn main:app --host 0.0.0.0 --port $PORT
```

2. **Deploy**:
```bash
gcloud run deploy brain-parenthood-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Database Setup

### Option 1: Neon (Serverless PostgreSQL)

1. **Create account** at [neon.tech](https://neon.tech)
2. **Create project**
3. **Copy connection string**
4. **Add to environment variables**:
```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

### Option 2: Supabase

1. **Create project** at [supabase.com](https://supabase.com)
2. **Get connection string** from Settings → Database
3. **Add to environment variables**

### Option 3: Managed PostgreSQL on Cloud Provider

- **AWS RDS**: Create PostgreSQL instance
- **Google Cloud SQL**: Create PostgreSQL instance
- **Azure Database**: Create PostgreSQL server

## Environment Variables Checklist

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host/db
SECRET_KEY=your-random-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-app.com
ENVIRONMENT=production
```

## Post-Deployment Steps

1. **Run database migrations**:
```bash
# SSH into your backend server or use cloud console
alembic upgrade head
```

2. **Test API**:
- Visit `https://your-backend-url.com/docs`
- Try creating a test user
- Verify database connection

3. **Test frontend**:
- Visit your Vercel URL
- Test Module 1 flow
- Check API integration

4. **Set up monitoring**:
- Vercel: Built-in analytics
- Railway/Render: Built-in monitoring
- Add Sentry for error tracking

5. **Configure custom domain** (if needed)

6. **Set up SSL** (usually automatic on modern platforms)

## Continuous Deployment

### Automatic Deployments

Most platforms support automatic deployment on git push:

- **Vercel**: Auto-deploys on push to main branch
- **Railway**: Auto-deploys on push
- **Render**: Auto-deploys on push
- **Heroku**: Configure in GitHub integration

### Manual Deployment

```bash
# Frontend
cd brain-parenthood
git push origin main
# Vercel auto-deploys

# Backend (Heroku example)
cd backend
git push heroku main
```

## Scaling Considerations

### Frontend
- Vercel automatically scales
- Use Edge Functions for better performance
- Enable ISR (Incremental Static Regeneration) for frequently accessed pages

### Backend
- **Vertical scaling**: Increase CPU/RAM on your hosting platform
- **Horizontal scaling**: Add more instances
- **Database optimization**: Add indexes, use connection pooling
- **Caching**: Add Redis for session/cache management

## Troubleshooting

### Common Issues

**Frontend can't connect to backend**:
- Check CORS settings in `backend/main.py`
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check network/firewall settings

**Database connection errors**:
- Verify `DATABASE_URL` format
- Check if database allows external connections
- Ensure SSL mode is set correctly

**Build failures**:
- Check build logs
- Verify all dependencies are in requirements.txt/package.json
- Ensure Python/Node versions match

**502 Bad Gateway**:
- Backend might not be running
- Check backend logs
- Verify port configuration

## Security Checklist

- [ ] Use environment variables for secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use strong SECRET_KEY
- [ ] Enable rate limiting
- [ ] Keep dependencies updated
- [ ] Use database SSL connections
- [ ] Implement authentication
- [ ] Add input validation
- [ ] Set up monitoring and alerts

## Monitoring and Maintenance

### Recommended Tools

- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Performance**: Vercel Analytics, New Relic
- **Logs**: Papertrail, Logtail
- **Database**: pganalyze, Datadog

### Regular Maintenance

- Update dependencies monthly
- Review error logs weekly
- Monitor database performance
- Check SSL certificate renewal
- Review user feedback
- Update documentation

## Cost Estimates

### Free Tier (Hobby Projects)
- Frontend (Vercel): Free
- Backend (Railway): $5/month
- Database (Neon): Free tier available
- **Total**: ~$5/month

### Production (Small Team)
- Frontend (Vercel Pro): $20/month
- Backend (Railway): $20-50/month
- Database (Managed): $15-50/month
- **Total**: ~$55-120/month

### Scale (Growing Startup)
- Frontend (Vercel Enterprise): $150+/month
- Backend (Multiple instances): $100-300/month
- Database (Managed): $50-200/month
- CDN, monitoring, etc.: $50-100/month
- **Total**: ~$350-750/month

---

Good luck with your deployment!
