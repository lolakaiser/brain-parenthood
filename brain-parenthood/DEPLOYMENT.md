# Brain Parenthood - Deployment Guide

This guide provides comprehensive instructions for deploying and running the Brain Parenthood application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Production Deployment](#production-deployment)
7. [Vercel Deployment](#vercel-deployment)
8. [Troubleshooting](#troubleshooting)
9. [Maintenance](#maintenance)

---

## Prerequisites

### Required Software

Before you begin, ensure you have the following installed:

#### Node.js and npm
- **Node.js**: Version 18.17.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- Download from: https://nodejs.org/

To verify installation:
```bash
node --version
npm --version
```

#### Python
- **Python**: Version 3.9 or higher
- **pip**: Latest version
- Download from: https://www.python.org/downloads/

To verify installation:
```bash
python --version
pip --version
```

#### Git
- **Git**: Latest stable version
- Download from: https://git-scm.com/downloads

To verify installation:
```bash
git --version
```

### Optional Tools

- **Code Editor**: VS Code, WebStorm, or any preferred editor
- **Database Viewer**: DB Browser for SQLite (for local development)
- **API Testing**: Postman or similar (for API endpoint testing)

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd brain-parenthood
```

### 2. Install Node.js Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16.0.0
- React 19
- TypeScript
- Tailwind CSS
- And all other dependencies listed in `package.json`

### 3. Install Python Dependencies

Create a virtual environment:

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

Install required packages:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Required Python packages:
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- Python-dotenv
- Bcrypt (for password hashing)

### 4. Verify Installation

Check that all dependencies are installed correctly:

```bash
npm list --depth=0
pip list
```

---

## Environment Configuration

### 1. Create Environment Files

Create a `.env.local` file in the root directory:

```bash
# .env.local

# Application Settings
NEXT_PUBLIC_APP_NAME="Brain Parenthood"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
API_BASE_URL=http://localhost:8000

# Database Configuration
DATABASE_URL=sqlite:///./brain_parenthood.db
# For PostgreSQL (production):
# DATABASE_URL=postgresql://user:password@localhost:5432/brain_parenthood

# Authentication
JWT_SECRET_KEY=your-secret-key-here-change-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Environment
NODE_ENV=development
```

### 2. Security Considerations

**IMPORTANT**:
- Never commit `.env.local` or `.env` files to version control
- Use strong, unique values for `JWT_SECRET_KEY` in production
- Keep all sensitive credentials secure
- The `.gitignore` file is configured to exclude these files

### 3. Generate Secure Keys

For production, generate a secure JWT secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using Python
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## Database Setup

### SQLite (Development)

The application uses SQLite by default for development:

1. **Automatic Setup**: The database will be created automatically on first run
2. **Location**: `brain_parenthood.db` in the project root
3. **Schema**: Tables are created automatically by SQLAlchemy

### PostgreSQL (Production)

For production deployment with PostgreSQL:

1. **Install PostgreSQL** (version 12 or higher)

2. **Create Database**:
```sql
CREATE DATABASE brain_parenthood;
CREATE USER bp_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE brain_parenthood TO bp_user;
```

3. **Update Environment Variables**:
```bash
DATABASE_URL=postgresql://bp_user:secure_password@localhost:5432/brain_parenthood
```

4. **Install PostgreSQL Driver**:
```bash
pip install psycopg2-binary
```

### Database Migrations

If you need to modify the database schema:

1. Make changes to your SQLAlchemy models
2. Restart the application - changes will be applied automatically
3. For production, consider using Alembic for migrations

---

## Running the Application

### Development Mode

You need to run both the Next.js frontend and the FastAPI backend:

#### Option 1: Using the Startup Script (Windows)

```bash
cmd /c startup.bat
```

This will:
- Start the FastAPI backend on port 8000
- Start the Next.js frontend on port 3000
- Run both in separate terminal windows

#### Option 2: Manual Start

**Terminal 1 - Start Backend:**
```bash
# Activate virtual environment first
venv\Scripts\activate

# Run FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

### Access the Application

Once both servers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Stopping the Application

#### Using startup.bat (Windows)
```bash
cmd /c shutdown.bat
```

#### Manual Stop
- Press `Ctrl+C` in each terminal window
- Or use the task manager to end the processes

---

## Production Deployment

### Build the Application

1. **Create production build**:
```bash
npm run build
```

2. **Test production build locally**:
```bash
npm start
```

3. **Verify build output**:
- Check `.next` folder for compiled assets
- Ensure no build errors
- Test critical user flows

### Environment Setup

1. Set `NODE_ENV=production` in your environment
2. Use production database (PostgreSQL recommended)
3. Configure secure JWT secrets
4. Set up proper CORS policies
5. Enable HTTPS

### Server Requirements

**Minimum Requirements:**
- CPU: 2 cores
- RAM: 2GB
- Storage: 10GB
- OS: Linux (Ubuntu 20.04+ recommended) or Windows Server

**Recommended for Production:**
- CPU: 4+ cores
- RAM: 4GB+
- Storage: 20GB+ SSD
- OS: Linux (Ubuntu 22.04 LTS)

---

## Vercel Deployment

Vercel is the recommended platform for deploying the Next.js frontend.

### Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **Git Repository**: Code must be in a Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

#### 1. Connect Repository

1. Log in to Vercel Dashboard
2. Click "Add New Project"
3. Import your Git repository
4. Select the `brain-parenthood` folder

#### 2. Configure Project

**Framework Preset**: Next.js

**Root Directory**: `./brain-parenthood` (if not at root)

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Node.js Version**: 18.x or higher

#### 3. Environment Variables

Add the following in Vercel's Environment Variables section:

```
NEXT_PUBLIC_APP_NAME=Brain Parenthood
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

**IMPORTANT**:
- Set environment variables for Production, Preview, and Development
- Use different API URLs for each environment
- Never expose sensitive keys in NEXT_PUBLIC_ variables

#### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Vercel will provide a deployment URL

#### 5. Custom Domain (Optional)

1. Go to Project Settings � Domains
2. Add your custom domain
3. Configure DNS settings as instructed
4. Wait for DNS propagation (up to 48 hours)

### Backend Deployment

The FastAPI backend needs to be deployed separately:

**Options:**
1. **Railway**: https://railway.app
2. **Render**: https://render.com
3. **Heroku**: https://heroku.com
4. **AWS EC2**: For more control
5. **DigitalOcean App Platform**

**Recommended: Railway or Render**

#### Railway Deployment:

1. Sign up at https://railway.app
2. Create new project
3. Add PostgreSQL database
4. Deploy from GitHub repository
5. Set environment variables
6. Railway will auto-detect FastAPI and deploy

### Post-Deployment

1. **Test all functionality**:
   - User registration
   - Login/logout
   - Module 1 completion
   - Dashboard display
   - Data persistence

2. **Update CORS settings** in FastAPI to allow your Vercel domain

3. **Monitor logs** for any errors

4. **Set up monitoring** (optional):
   - Vercel Analytics
   - Sentry for error tracking
   - LogRocket for session replay

---

## Troubleshooting

### Build Errors

#### Error: "Module not found"
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Type errors in build"
**Solution**:
```bash
npm run type-check
# Fix any TypeScript errors
npm run build
```

### Runtime Errors

#### Error: "Failed to connect to API"
**Problem**: Backend not running or wrong API URL

**Solution**:
1. Verify backend is running on correct port
2. Check `NEXT_PUBLIC_API_URL` environment variable
3. Check CORS configuration in FastAPI
4. Verify network connectivity

#### Error: "Database connection failed"
**Problem**: Database not configured correctly

**Solution**:
1. Check `DATABASE_URL` environment variable
2. Verify database is running
3. Check database credentials
4. Ensure database exists
5. Check firewall settings

### Vercel Deployment Issues

#### Error: "Build exceeded time limit"
**Solution**:
- Optimize build process
- Remove unnecessary dependencies
- Consider upgrading Vercel plan

#### Error: "Serverless Function timeout"
**Solution**:
- Optimize API routes
- Use Vercel's timeout configuration
- Consider moving heavy operations to background jobs

### Database Issues

#### Error: "Table does not exist"
**Solution**:
1. Delete database file (development)
2. Restart backend to recreate tables
3. For production, run migrations

#### Error: "Database locked"
**Solution**:
1. Close all connections to SQLite database
2. Restart application
3. Consider upgrading to PostgreSQL for production

---

## Maintenance

### Regular Updates

**Weekly:**
- Review application logs
- Monitor error rates
- Check performance metrics

**Monthly:**
- Update dependencies:
  ```bash
  npm update
  pip install --upgrade -r requirements.txt
  ```
- Review security advisories
- Backup database

**Quarterly:**
- Update Node.js and Python versions
- Review and update documentation
- Performance optimization review

### Database Backups

**SQLite (Development):**
```bash
cp brain_parenthood.db brain_parenthood_backup_$(date +%Y%m%d).db
```

**PostgreSQL (Production):**
```bash
pg_dump brain_parenthood > backup_$(date +%Y%m%d).sql
```

**Automated Backups:**
- Set up daily backups using cron jobs
- Store backups in separate location
- Test backup restoration regularly

### Security Updates

1. **Dependencies**: Keep all packages updated
2. **SSL/TLS**: Ensure HTTPS is enabled
3. **Authentication**: Monitor for suspicious login attempts
4. **Database**: Regular security audits
5. **Logs**: Review for security incidents

### Monitoring

**Application Health:**
- Response times
- Error rates
- Database query performance
- Memory usage
- CPU usage

**User Metrics:**
- Active users
- Module completion rates
- Session duration
- User feedback

---

## Support

### Documentation
- **User Guide**: See `USER_GUIDE.md`
- **API Documentation**: http://localhost:8000/docs (when running)

### Common Commands

```bash
# Install dependencies
npm install
pip install -r requirements.txt

# Development
npm run dev
uvicorn main:app --reload

# Build
npm run build

# Production
npm start

# Clean build artifacts
rm -rf .next
rm -rf node_modules

# Database reset (development only)
rm brain_parenthood.db
```

### Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **FastAPI Documentation**: https://fastapi.tiangolo.com
- **Vercel Documentation**: https://vercel.com/docs
- **React Documentation**: https://react.dev

---

## Security Best Practices

1. **Never commit sensitive data** to version control
2. **Use environment variables** for all configuration
3. **Keep dependencies updated** regularly
4. **Enable HTTPS** in production
5. **Implement rate limiting** on API endpoints
6. **Use strong passwords** and secure JWT secrets
7. **Regular security audits** of dependencies
8. **Monitor logs** for suspicious activity
9. **Backup data regularly** and test restores
10. **Use secure database connections** in production

---

## Conclusion

You now have everything needed to deploy and run Brain Parenthood. For questions or issues not covered in this guide, consult the official documentation for each technology or contact your system administrator.

**Key Takeaways:**
- Always use environment variables for configuration
- Test thoroughly before deploying to production
- Keep dependencies updated
- Monitor application health
- Backup data regularly

Good luck with your deployment!
